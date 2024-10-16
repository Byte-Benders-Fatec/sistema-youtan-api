import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('teams')
class Team {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        length: 100,
        nullable: false
    })
    name: string;
};

export default Team;