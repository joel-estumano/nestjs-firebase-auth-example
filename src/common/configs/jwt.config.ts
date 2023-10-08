import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
    jwt_secret: `${process.env.JWT_SECRET}`,
}));
