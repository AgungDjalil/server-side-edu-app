import { IsDate, IsString } from "class-validator";

export class SuspendUserDTO {
    @IsString()
    suspensionEndDate: string;
}