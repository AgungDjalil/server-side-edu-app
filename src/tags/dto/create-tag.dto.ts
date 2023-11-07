import { IsString } from "class-validator";

export class CreateTagDto {
    @IsString()
    tagName: string;

    @IsString()
    categoryID: string;
}
