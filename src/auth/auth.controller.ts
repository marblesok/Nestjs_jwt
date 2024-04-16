import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './auth.dto';
import { JwtRefreshGuard } from './jwt/guard/jwt-refresh.guard';
import { GetUser } from 'src/util/decorator/user.decorator';
import { User } from 'src/users/entities/users.entity';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}
    
    @Post('login')
    @ApiOperation({
        summary: '로그인'
    })
    async login(@Body() authLoginDto: AuthLoginDto){
        return await this.authService.login(authLoginDto);
    }

    @Post('refresh-token')
    @UseGuards(JwtRefreshGuard)
    async getRefreshToken(@GetUser() user: User){
        return await this.authService.getAccessToken(user.id);
    }
}
