
import { ITeamRepository } from "../interfaces/Team";
import Team from "../models/Team";
import { DeleteResult, Repository } from "typeorm";

class TeamRepository implements ITeamRepository {
    teamRepository: Repository<Team>;

    constructor(teamRepository: Repository<Team>) {
        this.teamRepository = teamRepository;
    };

    async add(team: Team): Promise<Team> {
        team = await this.teamRepository.save(team);
    
        return team;
    };
    
    async getMany(skip: number, take: number, _page: number): Promise<[Team[], number]> {
        const [users, total] = await this.teamRepository.findAndCount({
            skip,
            take
        });
        
        return [users, total];
    };

    async getById(id: number): Promise<Team> {
        const team = await this.teamRepository.findOneBy({
            id
        });
    
        return team;
    };

    async getByName(name: string): Promise<Team> {
        const team = await this.teamRepository.findOneBy({
            name
        });
    
        return team;
    };

    async updateById(newTeamData: Team): Promise<Team> {
        const updatedTeam = await this.teamRepository.save(newTeamData);

        return updatedTeam;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.teamRepository.delete({
            id
        });

        return deletedRow;
    };
};

export default TeamRepository;