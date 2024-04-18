import { HttpException, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async login(authLoginDto: AuthLoginDto){
        // await this.redisService.set('dsd','ds');
        // const test = this.redisService.get('dsd')
        // console.log(test);
        const { loginId, password } = authLoginDto;
        const user = await this.userService.findByLoginId(loginId);
        if(!user) {
            throw new HttpException(
                '존재하지 않는 아이디입니다.',
                 400
            );
        }
        const isMatch = await this.userService.compareToPassword(password, user.password);
        if(!isMatch) {
            throw new HttpException(
                '아이디와 비밀번호가 올바르지 않습니다.',
                 400
            );
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                loginId: user.loginId,
            },
            access_token: await this.getAccessToken(user.id),
            refresh_token: await this.getRefreshToken(user.id, user.name),
        }
    }

    async getAccessToken(id: number){
        const payload = { id };
        return await this.jwtService.signAsync( payload );
    }

    async getRefreshToken(id: number, name: string){
        const payload = { id, name }
        return await this.jwtService.signAsync( payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
        });
    }

}
