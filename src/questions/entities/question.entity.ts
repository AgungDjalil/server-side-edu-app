import { 
	Entity, 
	PrimaryColumn, 
	Column, 
	ManyToOne, 
	JoinColumn, 
	BeforeInsert, 
	OneToMany
} from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Answer } from 'src/answer/entities/answer.entity'
import { Comment } from 'src/comments/entities/comment.entity'
import { Category } from 'src/category/entities/category.entity'
import { Tag } from 'src/tags/entities/tag.entity'
import { ReportQuestion } from 'src/reports/entities/report-question.entity'

@Entity()
export class Question {
	@PrimaryColumn()
	questionID: string

	// relasi ke user
	@ManyToOne(() => User, user => user.questions)
	@JoinColumn({ name: 'userID' })
	userID: string;

	// relasi ke answer
	@OneToMany(() => Answer, answer => answer.questionID)
	answers: Answer[]

	// relasi ke comment
	@OneToMany(() => Comment, comment => comment.commentID)
	comments: Comment[]

	// relasi ke category
	@ManyToOne(() => Category, (category) => category.questions)
	@JoinColumn({ name: 'categoryID' })
	categoryID: string;

	// relasi ke tag
	@ManyToOne(() => Tag, (tag) => tag.questions)
	@JoinColumn({ name: 'tagID' })
	tagID: string;

	// relasi ke report
	@OneToMany(() => ReportQuestion, (report) => report.reportedQuestionID)
	reports: ReportQuestion[];
	
	@Column()
	questionText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean', default: true})
	isActive: boolean

	@BeforeInsert()
	generateID(): void {
		this.questionID = uuidV4()
	}
}