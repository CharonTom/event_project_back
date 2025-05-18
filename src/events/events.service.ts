import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createEventDto: CreateEventDto,
    user: any,
    file?: Express.Multer.File,
  ) {
    const fullUser = await this.userRepository.findOne({
      where: { user_id: user.id },
    });

    if (!fullUser) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    // Récupérer les catégories si des category_id sont fournis dans le DTO
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
    const event = this.eventRepository.create({
      ...createEventDto,
      user: fullUser,
      categories: categories,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (file) {
      event.image = `/assets/${file.filename}`;
    }

    // 3. Sauvegarder l'événement
    const savedEvent = await this.eventRepository.save(event);

    // 4. Récupérer l'événement avec toutes ses relations
    return await this.eventRepository.findOne({
      where: { event_id: savedEvent.event_id },
      relations: [
        // 'user',
        'categories',
      ],
    });
  }

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  // Nouvelle méthode pour récupérer l'événement avec son utilisateur associé
  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { event_id: id },
      relations: [
        //  'user',
        'categories',
      ],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);

    const updatedEvent = {
      ...event,
      ...updateEventDto,
      updated_at: new Date(),
    };

    return this.eventRepository.save(updatedEvent);
  }

  async remove(id: number): Promise<{ message: string }> {
    const event = await this.findOne(id);

    await this.eventRepository.remove(event);
    return { message: 'Event has been deleted succesfully' };
  }
}
