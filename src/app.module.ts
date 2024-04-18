import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './util/config/valitationSchema';
import { load } from './util/config/load.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './util/config/database.config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`],
      isGlobal: true,
      validationSchema: validationSchema,
      load: [ load ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DatabaseConfig
    }),
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      }
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    DatabaseConfig,
  ]
})
export class AppModule {}
