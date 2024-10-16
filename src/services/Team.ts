import { DeleteResult } from "typeorm";
import { ITeamRepository, ITeamService } from "../interfaces/Team";
import Team from "../models/Team";

class TeamService implements ITeamService{
    teamRepository: ITeamRepository

    constructor(teamRepository: ITeamRepository) {
        this.teamRepository = teamRepository;
    };

    async add(team: Team): Promise<Team> {
        team = await this.teamRepository.add(team);

        return team;
    };

    async getMany(): Promise<Team[]> {
        const teams = await this.teamRepository.getMany();

        return teams;
    };

    async getById(id: number): Promise<Team> {
        const team = await this.teamRepository.getById(id);

        return team;
    };

    async getByName(name: string): Promise<Team> {
        const team = await this.teamRepository.getByName(name);

        return team;
    };

    async updateById(team: Team, newTeamData: Team): Promise<Team> {
        team.name = newTeamData.name ? newTeamData.name : team.name;

        const updatedTeam = await this.teamRepository.updateById(team);

        return updatedTeam;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.teamRepository.deleteById(id);

        return deletedRow;
    }
};

export default TeamService;
