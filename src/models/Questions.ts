import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Form from "./Forms";

@Entity('questions')

class Question {
	@PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar',{
        length: 100,
        nullable: false
    })
    title: string;

    @Column('varchar',{
        length: 100,
        nullable: true
    })
    alternatives: string;
    
    @Column('varchar',{
        length: 20,
        nullable: false
    })
    type: string;

    @ManyToOne(() => Form, (form) => form.questions)
    form: Form;
}

export default Question;