import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    let parentCategory = null;
    if (createCategoryDto.parent_category_id) {
      parentCategory = await this.categoryRepository.findOne({
        where: { category_id: createCategoryDto.parent_category_id },
      });
      if (!parentCategory) {
        throw new NotFoundException(
          `Parent category with ID ${createCategoryDto.parent_category_id} not found`,
        );
      }
    }

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      parent: parentCategory,
    });
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['parent', 'children'], // Charger les relations pour afficher les infos parent/enfant
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: ['parent', 'children', 'events'], // Charger les relations complètes
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id); // Réutiliser findOne pour la vérification et récupération
    let parentCategory = category.parent; // Garder le parent actuel par défaut

    if (updateCategoryDto.parent_category_id !== undefined) {
      // Vérifier si parent_category_id est fourni dans l'update
      if (updateCategoryDto.parent_category_id === null) {
        parentCategory = null; // Définir le parent à null explicitement si c'est la valeur fournie
      } else {
        parentCategory = await this.categoryRepository.findOne({
          where: { category_id: updateCategoryDto.parent_category_id },
        });
        if (
          !parentCategory &&
          updateCategoryDto.parent_category_id !== undefined
        ) {
          // Vérifier seulement si un nouvel ID est fourni et non null
          throw new NotFoundException(
            `Parent category with ID ${updateCategoryDto.parent_category_id} not found`,
          );
        }
      }
    }

    const updatedCategory = {
      ...category,
      ...updateCategoryDto,
      parent: parentCategory, // Mettre à jour le parent (peut être null ou une nouvelle catégorie)
    };

    return this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
