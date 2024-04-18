import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
    ){}

    async set(key: string, data: any){
        await this.redis.set(key, data);
    }
    async get(key: string){
        return await this.redis.get(key);
    }
}


