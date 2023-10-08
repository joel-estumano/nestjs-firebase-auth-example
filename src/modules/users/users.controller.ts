import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() dto: UserCreateDto) {
        return await this.userService.create(dto);
    }
}