import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('forms')

class Forms{
    @PrimaryGeneratedColumn('increment')
    id: number;

}

export default Forms;