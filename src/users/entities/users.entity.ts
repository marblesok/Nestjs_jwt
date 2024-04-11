import { WithTimestamp } from "src/util/entity/BaseEntity";
import { Column, Entity } from "typeorm";



export enum UserStatus {
    ACTIVE = 'ACTIVE',
    REMOVED = 'REMOVED',
}

@Entity('user')
export class User extends WithTimestamp{
    @Column({ type: 'varchar' })
    loginId: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'varchar' })
    name: string

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;
}