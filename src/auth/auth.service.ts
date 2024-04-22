import { HttpException, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/cache/cache.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly cacheService: CacheService
    ){}

    async login(authLoginDto: AuthLoginDto){
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
            refresh_token: await this.getRefreshToken(user.id),
        }
    }

    async logout(id: number) {
        await this.cacheService.del(`a_${id}`);
        return { message: '로그아웃 되었습니다.', status: 1 }
    }

    async getAccessToken(id: number){
        const uuid = uuidv4();
        const payload = { id, uuid };
        await this.cacheService.set(`a_${id}`, uuid);
        return await this.jwtService.signAsync( payload );
    }

    async getRefreshToken(id: number){
        const uuid = uuidv4();
        const payload = { id, uuid };
        await this.cacheService.set(`r_${id}`, uuid)
        return await this.jwtService.signAsync( payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
        });
    }

}
