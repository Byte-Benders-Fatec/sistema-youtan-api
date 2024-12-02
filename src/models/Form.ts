import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Question from "./Questions";
import Metadata from "./Metadata";
import Team from "./Team";

@Entity('forms')

class Form extends Metadata {
    @Column('varchar', {
        length: 100,
        nullable: false
    })
    name: string;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    description: string;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    category: string;

    @OneToMany(() => Question, (question) => question.form, { cascade: true })
    @JoinColumn()
    questions: Question[];

    @ManyToOne(() => Team, (team) => team)
    @JoinColumn()
    team: Team;
}

export default Form;