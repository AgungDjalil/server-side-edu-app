import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../../users/entities/user.entity'
import { Question } from '../../questions/entities/question.entity'
import { Answer } from 'src/answer/entities/answer.entity'

@Entity()
export class Comment {
	@PrimaryColumn()
	commentID: string

	// relasi ke user
	@ManyToOne(() => User, (user) => user.userID)
	userID: string

	// relasi ke question
	@ManyToOne(() => Question, (question) => question.commentID)
    questionID: string

	// relasi ke answer
    @ManyToOne(() => Answer, (answer) => answer.answerID)
    answerID: string

	@Column({ type: 'varchar' }) 
	commentText: string

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
	createdAt: Date

	@Column({ type: 'boolean', default: false})
	banned: boolean

	@BeforeInsert()
	generateInsert() {
		this.commentID = uuidV4()
	}
}