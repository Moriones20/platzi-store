import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { products } from '@/data/products/products.data';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = products;
  private counterId: number;

  findAll(limit: number, offset: number, brand: string) {
    return {
      statusCode: HttpStatus.OK,
      limit,
      offset,
      brand,
      data: this.products,
    };
  }

  findById(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  create(payload: CreateProductDto) {
    const maxId = Math.max(...products.map((product) => product.id), 0);
    this.counterId = maxId + 1;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);

    return {
      statusCode: HttpStatus.OK,
      data: newProduct,
    };
  }

  update(id: number, payload: UpdateProductDto) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product not found`);
    }

    this.products[index] = {
      ...this.products[index],
      ...payload,
    };

    return {
      statusCode: HttpStatus.OK,
      data: this.products[index],
    };
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `Product not found or has already been removed`,
      );
    }

    this.products.splice(index, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: `Product has been deleted`,
    };
  }
}
