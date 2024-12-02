import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import User from "./User";
import Form from "./Form";
import Metadata from "./Metadata";

@Entity('answers')

class Answers extends Metadata{
    @Column('varchar', { nullable: true })
    userAnswers: string;

    @Column('boolean', {default: false})
    userHasAnswered?: boolean = false;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn()
    user: User;

    @ManyToOne(() => User, (user) => user, {nullable: true})
    @JoinColumn()
    userToEvaluate: User;

    @ManyToOne(() => Form, (form) => form)
    @JoinColumn()
    form: Form;

}

export default Answers;