import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly userService: UsersService,
    private readonly cacheService: CacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET
    });
  }

  async validate(payload: any) {
    const { id, uuid } = payload;
    const user = await this.userService.findById(id);
    if(!user) {
      throw new UnauthorizedException();
    }
    const cacheUUID = await this.cacheService.get(`r_${id}`)
    if(!cacheUUID || uuid != cacheUUID) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
