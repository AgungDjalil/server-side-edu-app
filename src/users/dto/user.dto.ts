import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    userID: string

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    point: number;

    @Expose()
    joinAt: Date;
}