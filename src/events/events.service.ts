import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>, // Repository de Cat

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const user = await this.userRepository.findOne({
      where: { user_id: createEventDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    const event = this.eventRepository.create({
      ...createEventDto,
      user, // Association de l'utilisateur trouvé
    });
    await this.eventRepository.save(event);
    return event;
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { event_id: id },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    const updatedEvent = { ...event, ...updateEventDto };
    return this.eventRepository.save(updatedEvent);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    await this.eventRepository.remove(event);
  }
}
