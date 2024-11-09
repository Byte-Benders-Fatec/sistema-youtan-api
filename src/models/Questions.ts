import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Form from "./Form";
import Metadata from "./Metadata";

@Entity('questions')

class Question extends Metadata {
	@PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 100,
        nullable: false
    })
    title: string;

    @Column('simple-array', { nullable: true })
    alternatives: string[];
    
    @Column('varchar',{
        length: 20,
        nullable: false
    })
    type: string;

    @ManyToOne(() => Form, (form) => form.questions, { onDelete: "CASCADE" })
    @JoinColumn()
    form: Form;
}

export default Question;
