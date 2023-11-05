import { 
	Entity, 
	PrimaryColumn, 
	Column, 
	ManyToOne, 
	JoinColumn, 
	BeforeInsert, 
	OneToMany, 
	ManyToMany,
	JoinTable
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Answer } from 'src/answer/entities/answer.entity'
import { Comment } from 'src/comments/entities/comment.entity'
import { Category } from 'src/category/entities/category.entity'
import { Tag } from 'src/tags/entities/tag.entity'

@Entity()
export class Question {
	@PrimaryColumn()
	questionID: string

	// relasi ke user
	@ManyToOne(() => User, user => user.questions)
	@JoinColumn({ name: 'userID'})
	userID: string;

	// relasi ke answer
	@OneToMany(() => Answer, answer => answer.questionID)
	answers: Answer[]

	// relasi ke comment
	@OneToMany(() => Comment, comment => comment.commentID)
	commentID: Comment[]

	// relasi ke category
	@ManyToMany(() => Category, (category) => category.questions)
	@JoinTable()
	categories: Category[]

	// relasi ke tag
	@ManyToMany(() => Tag, (tag) => tag.categories)
	@JoinTable()
	tags: Tag[]
	
	@Column()
	questionText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean', default: false})
	banned: boolean

	@BeforeInsert()
	generateID(): void {
		this.questionID = uuidV4()
	}
}