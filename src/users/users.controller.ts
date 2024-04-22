import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './users.dto';
import { GetUser } from 'src/util/decorator/user.decorator';
import { User } from './entities/users.entity';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access-token') 
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
