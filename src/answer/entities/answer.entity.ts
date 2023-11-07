import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Question } from '../../questions/entities/question.entity'
import { Comment } from 'src/comments/entities/comment.entity'
import { ReportAnswer } from 'src/reports/entities/report-answer.entity'

@Entity()
export class Answer {
	@PrimaryColumn()
	answerID: string
	
	// relasi ke user
	@ManyToOne(() => User, (user) => user.answers)
	@JoinColumn({ name: 'userID' })
	userID: string

	// relasi ke question
	@ManyToOne(() => Question, (question) => question.answers)
	@JoinColumn({ name: 'questionID' })
	questionID: string

	// relasi ke comment
	@OneToMany(() => Comment, (comment) => comment.commentID)
	comments: Comment[]

	// relasi ke report
	@OneToMany(() => ReportAnswer, (reportAnswer) => reportAnswer.reportedAnswerID)
	reports: ReportAnswer[] 

	@Column({ type: 'varchar' })
	answerText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean', default: false })
	isVerified: boolean

	@Column({ type: 'boolean', default: true })
	isActive: boolean

	@BeforeInsert()
	generateInsert() {
		this.answerID = uuidV4()
	}
}