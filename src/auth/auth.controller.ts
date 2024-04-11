import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
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
}
