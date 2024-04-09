import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async test(){
        return 'test';
    }
}
