import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { IsEmail, IsIn } from 'class-validator'
import Team from './Team';
import UserRoles from "../domain/User";
import Metadata from './Metadata';

@Entity('users')
class User extends Metadata {
    @Column('varchar', {
        length: 100,
        nullable: false
    })
    name: string;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    @IsEmail()  
    email: string;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    password: string;

    @Column('varchar', {
        length: 20,
        nullable: false
    })
    @IsIn(UserRoles)
    role: string;

    @ManyToOne(() => Team, {eager: true})
    @JoinColumn({"name": "id_team"})
    team: Team;
};

export default User;