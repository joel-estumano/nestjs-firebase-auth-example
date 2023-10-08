import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [FirebaseModule],
  exports: [UsersService]
})
export class UsersModule { }
