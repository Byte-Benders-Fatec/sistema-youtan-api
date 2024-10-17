import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => Question, {eager: true})
    @JoinColumn({"name": "id_question"})
    Question: Question[];
}

export default Form;