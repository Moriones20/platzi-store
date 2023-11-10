import { users } from '@/data/users/users.data';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  private users: User[] = users;
  private counterId: number;

  findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: this.users,
    };
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  create(payload: CreateUserDto) {
    const maxId = Math.max(...users.map((user) => user.id), 0);
    this.counterId = maxId + 1;

    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);

    return {
      statusCode: HttpStatus.OK,
      data: newUser,
    };
  }

  update(id: number, payload: UpdateUserDto) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[index] = {
      ...this.users[index],
      ...payload,
    };

    return {
      statusCode: HttpStatus.OK,
      data: this.users[index],
    };
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found or has already been deleted');
    }

    this.users.splice(index, 1);

    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'User has been deleted',
    };
  }
}
