import { Inject, Injectable, Logger } from '@nestjs/common';
import { app } from 'firebase-admin';
import { User } from './entities/user.entity';
import { UserCreateDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) { }

  async create(dto: UserCreateDto): Promise<User> {
    const auth = this.firebaseApp.auth();
    return auth
      .createUser(dto)
      .then((user: any) => {
        return user;
      })
      .catch((error) => {
        this.logger.error(error);
        return error;
      });
  }
}
