import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Participation} from './Participation';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'date' })
    birthDate: Date;

    @Column({unique: true})
    mail: string;

    @Column()
    password: string;

    @Column({ type: 'date' })
    inscriptionDate: Date;

    @OneToMany(() => Participation, participation => participation.user)
    participations: Participation[];
}
