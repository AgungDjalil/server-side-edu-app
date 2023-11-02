import { IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    questionText: string;

    @IsString()
    category: string;
}
