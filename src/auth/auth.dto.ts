import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
    @ApiProperty({
        description: '로그인 아이디',
        example: 'string'
    })
    @IsString()
    @IsNotEmpty()
    loginId: string;

    @ApiProperty({
        description: '패스워드',
        example: 'string'
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'fcm 토큰',
        example: 'string'
    })
    fcmToken: string;
}