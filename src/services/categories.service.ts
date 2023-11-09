import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { categories } from 'src/data/categories.data';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = categories;
  private counterId: number;

  findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: this.categories,
    };
  }

  findById(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return {
      statusCode: HttpStatus.OK,
      data: category,
    };
  }

  create(payload: CreateCategoryDto) {
    const MaxId = Math.max(...categories.map((category) => category.id), 0);
    this.counterId = MaxId + 1;

    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);

    return {
      statusCode: HttpStatus.OK,
      data: newCategory,
    };
  }

  update(id: number, payload: UpdateCategoryDto) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Category not found');
    }

    this.categories[index] = {
      ...this.categories[index],
      ...payload,
    };

    return {
      statusCode: HttpStatus.OK,
      data: this.categories[index],
    };
  }

  delete(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(
        'Category not found or has already been deleted',
      );
    }

    this.categories.splice(index, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: `Category has been deleted`,
    };
  }
}
