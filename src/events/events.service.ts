import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>, // Repository de Cat

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category) // Injectez le Repository de Category
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createEventDto: CreateEventDto, user: User) {
    // 1. Récupérer les catégories si des category_id sont fournis dans le DTO
    let categories: Category[] = [];
    if (createEventDto.category_id && createEventDto.category_id.length > 0) {
      categories = await this.categoryRepository.findBy({
        category_id: In(createEventDto.category_id),
      });

      // Vérification que toutes les catégories demandées existent
      if (categories.length !== createEventDto.category_id.length) {
        throw new NotFoundException(
          "Certaines catégories spécifiées n'existent pas.",
        );
      }
    }

    // 2. Créer l'événement en associant l'utilisateur et les catégories
    const eventData = {
      ...createEventDto,
      user_id: user.user_id,
      categories,
    };

    const event = this.eventRepository.create(eventData);
    const savedEvent = await this.eventRepository.save(event);

    // 3. Récupérer l'événement avec toutes ses relations
    return await this.eventRepository.findOne({
      where: { event_id: savedEvent.event_id },
      relations: ['user', 'categories'],
    });
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
