import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        private readonly redis: Redis,
    ){}

    async set(key: string, data: any){
        await this.redis.set(key, data);
    }
    async get(key: string){
        await this.redis.get(key);
    }
}


