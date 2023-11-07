import { IsDate } from "class-validator";

export class SuspendUserDTO {
    @IsDate()
    suspensionEndDate: Date;
}