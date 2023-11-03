import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Question } from '../../questions/entities/question.entity'

@Entity()
export class Answer {
	@PrimaryColumn()
	answerID: string
 
	@ManyToOne(() => User, (user) => user.answers)
	@JoinColumn({ name: 'userID' })
	userID: string

	@ManyToOne(() => Question, (question) => question.answers)
	@JoinColumn({ name: 'questionID' })
	questionID: string

	@Column({ type: 'varchar' })
	answerText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean', default: false })
	verified: boolean

	@Column({ type: 'boolean', default: false })
	banned: boolean

	@BeforeInsert()
	generateInsert() {
		this.answerID = uuidV4()
	}
}