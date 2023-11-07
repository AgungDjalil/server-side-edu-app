import { IsEmail, IsOptional, IsString } from "class-validator";

export class LoginAuthDTO {
    @IsString()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    password: string;
}