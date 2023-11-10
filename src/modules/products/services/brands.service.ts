import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { brands } from '@/data/products/brands.data';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = brands;
  private counterId: number;

  findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: this.brands,
    };
  }

  findById(id: number) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return {
      statusCode: HttpStatus.OK,
      data: brand,
    };
  }

  create(payload: CreateBrandDto) {
    const maxId = Math.max(...brands.map((brand) => brand.id), 0);
    this.counterId = maxId + 1;

    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);

    return {
      statusCode: HttpStatus.OK,
      data: newBrand,
    };
  }

  update(id: number, payload: UpdateBrandDto) {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Brand not found');
    }

    this.brands[index] = {
      ...this.brands[index],
      ...payload,
    };

    return {
      statusCode: HttpStatus.OK,
      data: this.brands[index],
    };
  }

  delete(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(
        'Brand not found or has already been deleted',
      );
    }

    this.brands.splice(index, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Brand has been deleted',
    };
  }
}
