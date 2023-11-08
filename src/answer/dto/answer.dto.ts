import { Expose } from "class-transformer";

export class AnswerDTO {
    @Expose()
    answerText: string;

    @Expose()
    createdAt: Date;

    @Expose()
    isVerified: boolean;
}