import { IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    questionText: string;

    @IsString()
    categoryID: string;

    @IsString()
    @IsOptional()
    tagID: string;
}
