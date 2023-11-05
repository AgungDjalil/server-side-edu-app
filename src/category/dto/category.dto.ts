import { Expose } from "class-transformer";

export class CategoryDTO {
    @Expose()
    categoryName: string;

    @Expose()
    createdAt: Date;
}