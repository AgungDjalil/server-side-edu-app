import { Expose } from "class-transformer";

export class CommentDTO {
    @Expose()
    commentText: string;

    @Expose()
    createdAt: Date;
}