import { HttpException, Injectable } from '@nestjs/common';
import { AuthLoginDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
    ){}

    async login(authLoginDto: AuthLoginDto){
        const { loginId, password } = authLoginDto;
        const user = await this.userService.findById(loginId);
        if(!user) {
            throw new HttpException(
                '존재하지 않는 아이디입니다.',
                 400
            );
        }
        const isMatch = await this.userService.compareToPassword(password, user.password);
        if(isMatch) {
            console.log(isMatch);
        }
    }
}
