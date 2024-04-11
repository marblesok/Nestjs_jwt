import { HttpException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from './entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async create(userCreateDto: UserCreateDto){
        const { loginId, password, name } = userCreateDto;
        const user = await this.findById(loginId);
        if(user) {
            throw new HttpException(
                '이미 존재하는 아이디입니다.',
                 400
            );
        }
        const hashPassword = await this.hashPassword(password);
        const createUser = this.userRepository.create({
            loginId,
            password: hashPassword,
            name
        })
        await this.userRepository.save(createUser);
        return { message: '회원가입 되었습니다.', status: 1 }
    }

    async findById(loginId: string) {
        return await this.userRepository.findOne({
            where: {
                loginId,
            }
        })
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    
    async compareToPassword(password: string, hashPassword: string) {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    }

}
