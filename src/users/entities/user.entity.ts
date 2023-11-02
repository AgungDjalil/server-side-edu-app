import { Entity, PrimaryColumn, Column, BeforeInsert, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { v4 as uuidV4 } from 'uuid'
import { Question } from '../../questions/entities/question.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { Answer } from "src/answer/entities/answer.entity"

@Entity()
export class User {
	@PrimaryColumn({ type: 'varchar' })
	userID: string

	@OneToMany(() => Question, (question) => question.userID)
	questions: Question[]

	@OneToMany(() => Answer, (answer) => answer.userID)
	answers: Answer[]

	// @ManyToOne(() => Comment, (comment) => comment.userID)
	// @JoinColumn({ name: 'userID' })
	// comments: Comment[]

	@Column({ type: 'varchar', unique: true })
	username: string

	@Column({ type: 'varchar', unique: true })
	email: string

	@Column({ type: 'varchar' })
	password: string

	@Column({ type: 'varchar' })
	role: string

	@Column({ type: 'int', default: 0})
	point: number

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    joinAt: Date;

	@Column({ type: 'date', nullable: true})
	suspend: Date

	@Column({ type: 'boolean', default: false})
	banned: boolean

	@BeforeInsert()
	generateInsert() {
		this.userID = uuidV4()
	}
}