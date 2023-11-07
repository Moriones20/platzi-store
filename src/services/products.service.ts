import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bal bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll(limit: number, offset: number, brand: string) {
    return {
      limit,
      offset,
      brand,
      data: this.products,
    };
  }

  findById(id: number) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findById(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const product = this.findById(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      delete this.products[index];
    }
    return null;
  }
}
