import { Inject, Injectable, Logger } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}
}
