import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Question from "./Questions";

@Entity('forms')

class Form{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    category: string;

    @OneToMany(() => Question, (question) => question.form, { cascade: true })
    @JoinColumn()
    questions: Question[];
}

export default Form;