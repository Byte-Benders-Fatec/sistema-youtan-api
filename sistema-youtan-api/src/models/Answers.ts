import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import User from "./User";

@Entity('answers')

class Answers{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar',{
        length:50,
        nullable : false
    })
    user_Answers : string

    @Column('date',{
        nullable: false
    })
    date : Date

}

export default Answers;