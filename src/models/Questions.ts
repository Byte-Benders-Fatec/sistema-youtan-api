import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        nullable: false
    })
    answer_Options: string;
    
    @Column('varchar',{
        length: 20,
        nullable: false
    })
    type: string;

}

export default Question;