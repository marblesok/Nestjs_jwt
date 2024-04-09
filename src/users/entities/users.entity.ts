import { WithTimestamp } from "src/util/entity/BaseEntity";
import { Column, Entity } from "typeorm";



@Entity('user')
export class User extends WithTimestamp{
    @Column({ type: 'varchar' })
    loginId: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'varchar' })
    name: string
}