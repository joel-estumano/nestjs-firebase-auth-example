import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helpers/env.helper';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './common/configs/firebase.config';
import { HerosModule } from './modules/hero/heros.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { UsersModule } from './modules/users/users.module';
import { FirebaseAuthStrategy } from './modules/auth/strategies/firebase-auth.strategy';
import { PassportModule } from '@nestjs/passport';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs/`);

@Module({
  imports: [
    HerosModule,
    FirebaseModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [firebaseConfig],
    }),
    PassportModule.register({ defaultStrategy: 'firebase-jwt' })
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule { }
