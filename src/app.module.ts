import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helpers/env.helper';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './common/configs/firebase.config';
import jwtConfig from './common/configs/jwt.config';
import { HerosModule } from './modules/hero/heros.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { UsersModule } from './modules/users/users.module';
import { FirebaseAuthStrategy } from './modules/auth/strategies/firebase-auth.strategy';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs/`);

@Module({
  imports: [
    HerosModule,
    FirebaseModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [firebaseConfig, jwtConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule { }
