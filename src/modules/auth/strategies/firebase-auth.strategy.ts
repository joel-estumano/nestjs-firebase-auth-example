import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { app } from 'firebase-admin';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
    Strategy,
    'firebase-auth',
) {
    constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App,
    private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwtConfig.jwt_secret')
        });
    }
    async validate(token: string) {
        const firebaseUser: any = await this.firebaseApp
            .auth()
            .verifyIdToken(token, true)
            .catch((error) => {
                throw new UnauthorizedException(error);
            });
        if (!firebaseUser) {
            throw new UnauthorizedException();
        }
        return firebaseUser;
    }
}
