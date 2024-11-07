import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import User from "./User";
import Form from "./Form";

@Entity('answers')

class Answers{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('simple-array', { nullable: true })
    userAnswers: string[];

    @ManyToOne(() => User, (user) => user)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Form, (form) => form)
    @JoinColumn()
    form: Form;

}

export default Answers;