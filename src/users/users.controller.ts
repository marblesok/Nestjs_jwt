import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './users.dto';

@ApiTags('user')
@Controller('users')
export class UsersController {
    constructor(
        private readonly userSerivce: UsersService,
    ){}


    @Post()
    @ApiOperation({
        summary: '회원가입'
    })
    async create(@Body() userCreateDto: UserCreateDto){
        return await this.userSerivce.create(userCreateDto);
    }
}
