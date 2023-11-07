import { Question } from "src/questions/entities/question.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
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
    @OneToMany(() => Question, (question) => question.categoryID)
    questions: Question[]

    // relasi ke tag
    @OneToMany(() => Tag, (tag) => tag.questions)
    tags: Tag[]

    @Column({ type: 'varchar'})
    categoryName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @BeforeInsert()
	generateInsert() {
		this.categoryID = uuidV4()
	}
}
