import { BeforeInsert, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid'

@Entity()
export class Category {
    @PrimaryColumn()
    categoryID: string;

    @BeforeInsert()
	generateInsert() {
		this.categoryID = uuidV4()
	}
}
