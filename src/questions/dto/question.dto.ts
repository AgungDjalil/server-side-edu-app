import { Expose } from "class-transformer";
import { CategoryDTO } from "src/category/dto/category.dto";
import { Category } from "src/category/entities/category.entity";
import { Tag } from "src/tags/entities/tag.entity";

export class QuestionDTO {
    @Expose()
    questionText: string;

    @Expose()
    createdAt: Date;

    @Expose()
    questionID: string
}