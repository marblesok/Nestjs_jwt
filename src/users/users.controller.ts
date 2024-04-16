import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from './users.dto';
import { GetUser } from 'src/util/decorator/user.decorator';
import { User } from './entities/users.entity';
import { JwtRefreshGuard } from 'src/auth/jwt/guard/jwt-refresh.guard';
import { JwtAccessGuard } from 'src/auth/jwt/guard/jwt-access.guard';

@ApiTags('user')
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

    @Get()
    @UseGuards(JwtAccessGuard)
    async test(@GetUser() user: User){
        return user;
    }
    @Get('refresh')
    @UseGuards(JwtRefreshGuard)
    async refreshTest(@GetUser() user: User){
        return user;
    }
}
