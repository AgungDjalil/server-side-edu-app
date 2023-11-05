import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginAuhDTO extends PartialType(CreateAuthDto) {
    @IsString()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
