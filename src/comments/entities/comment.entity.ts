import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Question } from '../../questions/entities/question.entity'
import { Answer } from 'src/answer/entities/answer.entity'
import { ReportComment } from 'src/reports/entities/report-comment/report-comment.entity'

@Entity()
export class Comment {
	@PrimaryColumn()
	commentID: string

	// relasi ke user
	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({ name: 'userID' })
	userID: string

	// relasi ke question
	@ManyToOne(() => Question, (question) => question.comments)
	@JoinColumn({ name: 'questionID' })
    questionID: string

	// relasi ke answer
    @ManyToOne(() => Answer, (answer) => answer.comments)
	@JoinColumn({ name: 'answerID' })
    answerID: string

	// relasi ke report
	@OneToMany(() => ReportComment, (report) => report.reportedCommentID)
	reports: ReportComment[];

	@Column({ type: 'varchar' }) 
	commentText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean', default: true})
	isActive: boolean

	@BeforeInsert()
	generateInsert() {
		this.commentID = uuidV4()
	}
}