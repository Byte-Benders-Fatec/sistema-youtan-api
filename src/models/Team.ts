import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import Metadata from './Metadata';

@Entity('teams')
class Team extends Metadata {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    name: string;
};

export default Team;