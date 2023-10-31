import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Answer } from 'src/answer/entities/answer.entity'

@Entity()
export class Question {
	@PrimaryColumn()
	questionID: string

	@ManyToOne(() => User, user => user.questions)
	@JoinColumn({ name: 'userID'})
	userID: User

	@OneToMany(() => Answer, answer => answer.questionID)
	answers: Answer[]
	
	@Column()
	questionText: string

	@Column()
	category: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean'})
	banned: boolean

	@BeforeInsert()
	generateInsert() {
		this.questionID = uuidV4()
	}
}