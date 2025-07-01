// src/users/users.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Calendar } from '../calendar/entities/calendar.entity';
import { Event } from '../events/entities/event.entity';
import { CalendarEvent } from '../calendar-event/entities/calendar-event.entity';
import { AddEventToCalendarRequestDto } from './dto/add-event-to-calendar.dto'; // Importez le DTO
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(CalendarEvent)
    private readonly calendarEventRepository: Repository<CalendarEvent>,
  ) {}

  //----------------------- CRUD basique pour les utilisateurs-----------------------

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    const calendar = new Calendar();
    user.calendar = calendar;

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
      relations: [
        'calendar.events.event', // chargez les événements liés au calendrier de l'utilisateur
      ],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const updatedUser = { ...user, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: 'User has been succesfully removed' };
  }

  //------------------ action sur le calendrier de l'utilisateur ---------------------
  async addEventToCalendar(
    userId: number,
    addEventToCalendarRequestDto: AddEventToCalendarRequestDto, // Accepte le DTO complet
  ): Promise<CalendarEvent> {
    // 1. Récupérer l'utilisateur et son calendrier
    const user = await this.findOne(userId);
    const calendar = user.calendar;

    // 2. Récupérer l'événement à ajouter
    const event = await this.eventRepository.findOne({
      where: { event_id: addEventToCalendarRequestDto.event_id }, // Utilisez event_id depuis le DTO
    });
    if (!event) {
      throw new NotFoundException(
        `Event with ID ${addEventToCalendarRequestDto.event_id} not found`,
      );
    }

    // 3. Vérifier si l'événement n'est pas déjà dans le calendrier
    const existingCalendarEvent = await this.calendarEventRepository.findOne({
      where: {
        calendar: { calendar_id: calendar.calendar_id },
        event: { event_id: addEventToCalendarRequestDto.event_id },
      },
    });
    if (existingCalendarEvent) {
      throw new BadRequestException(
        `Event with ID ${addEventToCalendarRequestDto.event_id} is already in the user's calendar.`,
      );
    }

    // 4. Créer une nouvelle instance de CalendarEvent
    const calendarEvent = new CalendarEvent();
    calendarEvent.calendar = calendar;
    calendarEvent.event = event;
    calendarEvent.wants_reminder =
      addEventToCalendarRequestDto.wants_reminder ?? false; // Utilisez wants_reminder depuis le DTO

    // 5. Enregistrer le CalendarEvent
    return await this.calendarEventRepository.save(calendarEvent);
  }

  async removeEventFromCalendar(
    userId: number,
    eventId: number,
  ): Promise<{ message: string }> {
    // 1. Récupérer l'utilisateur avec son calendrier (assurez-vous que la relation 'calendar' est chargée)
    const user = await this.findOne(userId);
    const calendar = user.calendar;

    if (!calendar) {
      throw new NotFoundException(
        `Calendar for user with ID ${userId} not found`,
      );
    }

    // 2. Chercher l'association CalendarEvent pour cet événement dans le calendrier de l'utilisateur
    const calendarEvent = await this.calendarEventRepository.findOne({
      where: {
        calendar: { calendar_id: calendar.calendar_id },
        event: { event_id: eventId },
      },
    });

    if (!calendarEvent) {
      throw new NotFoundException(
        `Event with ID ${eventId} is not found in the user's calendar`,
      );
    }

    // 3. Supprimer l'association (ce qui retire l'événement du calendrier)
    await this.calendarEventRepository.remove(calendarEvent);
    return { message: 'Event has been succesfully removed from the calendar' };
  }
}
