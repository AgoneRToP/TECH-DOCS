import { Injectable } from '@nestjs/common';
import { User } from './models';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'jojostar',
      
    },
    {
      id: 2,
      username: 'maria',
      password: 'bloodymary',
    },
  ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }
}
