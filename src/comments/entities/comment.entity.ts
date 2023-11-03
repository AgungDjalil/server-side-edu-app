import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Question } from '../../questions/entities/question.entity'
import { Answer } from 'src/answer/entities/answer.entity'

@Entity()
export class Comment {
	@PrimaryColumn()
	commentID: string

	// relasi ke user
	@OneToMany(() => User, (user) => user.userID)
	userID: User

	// relasi ke question
	@OneToMany(() => Question, (question) => question.questionID)
    @JoinTable()
    questions: Question[]

	// relasi ke answer
    @OneToMany(() => Answer, (answer) => answer.answerID)
    @JoinTable()
    Answer: Answer[]

	@Column({ type: 'varchar' }) 
	commentText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean'})
	banned: boolean

	@BeforeInsert()
	generateInsert() {
		this.commentID = uuidV4()
	}
}