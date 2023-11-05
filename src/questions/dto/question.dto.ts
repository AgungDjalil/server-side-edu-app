import { Expose } from "class-transformer";

export class QuestionDTO {
    @Expose()
    questionText: string;

    @Expose()
    createdAt: Date;
}