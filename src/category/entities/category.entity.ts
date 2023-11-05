import { Question } from "src/questions/entities/question.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Category {
    @PrimaryColumn()
    categoryID: string;

    // relasi ke user
    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'userID' })
    userID: string;

    // relasi ke questions
    @ManyToMany(() => Question, (question) => question.categories)
    @JoinTable()
    questions: Question[]

    // relasi ke tag
    @ManyToMany(() => Tag, (tag) => tag.questions)
    @JoinTable()
    tags: Tag[]

    @Column({ type: 'varchar'})
    categoryName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @BeforeInsert()
	generateInsert() {
		this.categoryID = uuidV4()
	}
}
