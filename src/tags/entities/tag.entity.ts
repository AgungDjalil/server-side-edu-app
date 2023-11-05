import { Category } from "src/category/entities/category.entity";
import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Tag {
    @PrimaryColumn()
    tagID: string;

    // relasi ke user
    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn({ name: 'userID'})
    userID: string;

    // relasi ke category
    @ManyToMany(() => Category, (category) => category.tags)
    @JoinTable()
    categories: Category[];

    // relasi ke question 
    @ManyToMany(() => Question, (question) => question.tags)
    @JoinTable()
    questions: Category[];

    @Column({ type: 'varchar' })
    tagName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;

    @BeforeInsert()
	generateID(): void {
		this.tagID = uuidV4()
	}
}
