import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import { IsEmail } from 'class-validator'
import Team from './Team';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

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
    role: string;

    @ManyToOne(() => Team, {eager: true})
    @JoinColumn({"name": "id_team"})
    team: Team;
};

export default User;