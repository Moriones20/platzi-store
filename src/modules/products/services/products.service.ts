import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(limit = 100, offset = 0, brand = '') {
    return {
      statusCode: HttpStatus.OK,
      limit,
      offset,
      brand,
      data: await this.productRepo.find(),
    };
  }

  async findById(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product ID: ${id} not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);

    return {
      statusCode: HttpStatus.OK,
      data: await this.productRepo.save(newProduct),
    };
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id });

    this.productRepo.merge(product, payload);

    return {
      statusCode: HttpStatus.OK,
      data: await this.productRepo.save(product),
    };
  }

  async delete(id: number) {
    const product = await this.productRepo.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product ID: ${id} not found`);
    }

    await this.productRepo.delete(id);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: `Product has been deleted`,
    };
  }
}
