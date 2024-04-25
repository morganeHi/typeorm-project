import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Participation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ default: false })
    won: boolean;

    @Column({ nullable: true })
    prize: string;

    @ManyToOne(() => User, user => user.participations)
    user: User;
}