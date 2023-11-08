import { 
	Entity, 
	PrimaryColumn, 
	Column, 
	BeforeInsert, 
	OneToMany
} from "typeorm"
import { v4 as uuidV4 } from 'uuid'
import { Question } from '../../questions/entities/question.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { Answer } from "src/answer/entities/answer.entity"
import { Tag } from "src/tags/entities/tag.entity"
import { Category } from "src/category/entities/category.entity"
import { Role } from "src/enum/role.enum"
import { ReportUser } from "src/reports/entities/report-user/report-user.entity"

@Entity()
export class User {
	@PrimaryColumn({ type: 'varchar' })
	userID: string

	// relasi ke question
	@OneToMany(() => Question, (question) => question.userID)
	questions: Question[]

	// relasi ke answer
	@OneToMany(() => Answer, (answer) => answer.userID)
	answers: Answer[]

	// relasi ke comment
	@OneToMany(() => Comment, (comment) => comment.userID)
	comments: Comment[]

	// relasi ke tag
	@OneToMany(() => Tag, (tag) => tag.userID)
	tags: Tag[]

	// relasi ke category
	@OneToMany(() => Category, (category) => category.userID)
	categories: Category[]

	// relasi ke report yang di report
	@OneToMany(() => ReportUser, (report) => report.reportedUser)
	reportedUsers: ReportUser[]

	// relasi ke report (yang membuat report)
	@OneToMany(() => ReportUser, (report) => report.reportingUser)
	reports: ReportUser[]

	@Column({ type: 'varchar', unique: true })
	username: string

	@Column({ type: 'varchar', unique: true })
	email: string

	@Column({ type: 'varchar' })
	password: string

	@Column({ type: 'enum', enum: Role, default: Role.User })
	role: Role

	@Column({ type: 'int', default: 0})
	point: number

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    joinAt: Date;

	@Column({ type: 'boolean', default: false })
	isSuspend: boolean

	@Column({ type: 'date', nullable: true})
	suspensionEndDate: Date

	@Column({ type: 'boolean', default: true})
	isActive: boolean

	@BeforeInsert()
	generateInsert() {
		this.userID = uuidV4()
	}
}