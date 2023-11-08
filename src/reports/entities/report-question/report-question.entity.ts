import { Question } from "src/questions/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class ReportQuestion {
    @PrimaryColumn()
    reportID: string;

    // Relasi ke pengguna yang membuat laporan
    @ManyToOne(() => User, (user) => user.reports)
    @JoinColumn({ name: 'reportingUserID' }) // Ubah nama kolom ke 'reportingUserID'
    reportingUser: string;

    // relasi ke question
    @ManyToOne(() => Question, (question) => question.reports)
    @JoinColumn({ name: 'questionID' })
    reportedQuestionID: string;

    @Column({ type: 'varchar' })
    reportMessage: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createAt: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @BeforeInsert()
	generateInsert() {
		this.reportID = uuidV4()
	}
}
