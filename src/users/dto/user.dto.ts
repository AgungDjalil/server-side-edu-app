import { Expose } from "class-transformer";

export class UserDTO {
    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    point: number;

    @Expose()
    joinAt: Date;
}