import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Question } from '../../questions/entities/question.entity'

@Entity()
export class Answer {
	@PrimaryColumn()
	AnswerID: string
 
	@ManyToOne(() => User, (user) => user.answers)
	@JoinColumn({ name: 'userID' })
	userID: User

	@ManyToOne(() => Question, (question) => question.answers)
	@JoinColumn({ name: 'questionID' })
	questionID: Question

	@Column({ type: 'varchar' })
	answerText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean' })
	verified: boolean

	@Column({ type: 'boolean'})
	banned: boolean

	@BeforeInsert()
	generateInsert() {
		this.AnswerID = uuidV4()
	}
}