import { Category } from "src/category/entities/category.entity";
import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { 
    BeforeInsert, 
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    PrimaryColumn 
} from "typeorm";
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
    @ManyToOne(() => Category, (category) => category.tags)
    @JoinColumn({ name: 'categoryID' })
    categoryID: string;

    // relasi ke question 
    @OneToMany(() => Question, (question) => question.tagID)
    questions: Question[];

    @Column({ type: 'varchar' })
    tagName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @BeforeInsert()
	generateID(): void {
		this.tagID = uuidV4()
	}
}
