import { User } from '@/modules/users/entities/user.entity';

export const users: User[] = [
  {
    id: 1,
    email: 'correo1@mail.com',
    password: '12345',
    role: 'admin',
  },
  {
    id: 2,
    email: 'correo2@mail.com',
    password: '12345',
    role: 'user',
  },
];
