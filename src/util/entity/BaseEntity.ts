import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class WithTimestamp extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'timestamp'
    })
    createAt: Date

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updateAt: Date
}