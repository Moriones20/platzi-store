import { customers } from '@/data/users/customers.data';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customers.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomersService {
  private customers: Customer[] = customers;
  private counterId: number;

  findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: this.customers,
    };
  }

  findById(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException('customer not found');
    }

    return {
      statusCode: HttpStatus.OK,
      data: customer,
    };
  }

  create(payload: CreateCustomerDto) {
    const maxId = Math.max(...customers.map((customer) => customer.id), 0);
    this.counterId = maxId + 1;

    const newcustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newcustomer);

    return {
      statusCode: HttpStatus.OK,
      data: newcustomer,
    };
  }

  update(id: number, payload: UpdateCustomerDto) {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('Customer not found');
    }

    this.customers[index] = {
      ...this.customers[index],
      ...payload,
    };

    return {
      statusCode: HttpStatus.OK,
      data: this.customers[index],
    };
  }

  delete(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(
        'Customer not found or has already been deleted',
      );
    }

    this.customers.splice(index, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Customer has been deleted',
    };
  }
}
