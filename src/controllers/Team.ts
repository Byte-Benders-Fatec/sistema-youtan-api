import { NextFunction, Request, Response } from "express";
import { ITeamController, ITeamService } from "../interfaces/Team";
import HttpStatus from 'http-status-codes';

class TeamController implements ITeamController {
    teamService: ITeamService;

    constructor(teamService: ITeamService) {
        this.teamService = teamService;

        this.add = this.add.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    };

    async add(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const team = req.body;
            if(!team.name) {
                return res.status(HttpStatus.BAD_REQUEST).json({message: "team body missing"});
            };
    
            const teamIsCreated = await this.teamService.getByName(team.name);
            if (teamIsCreated) return res.status(HttpStatus.BAD_REQUEST).json({message: "team name already in use"}); 
    
            const teamAdd = await this.teamService.add(team);
            if(!teamAdd) return res.status(HttpStatus.BAD_GATEWAY).json({message: "internal server error"}); 
    
            return res.status(HttpStatus.OK).json(teamAdd);
        } catch (error) {
            next(error);
        };
    };

    async getMany(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const take = Number(req.query.take) || 10;
            const page = Number(req.query.page) || 1;
            const skip = (page-1) * take;

            const [teams, total] = await this.teamService.getMany(skip, take, page);
            if (teams.length === 0) return res.status(HttpStatus.OK).json({message: "no team was created"});

            return res.status(HttpStatus.OK).json({teams, total});
        } catch (error) {
            next(error);
        };
    };

    async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "team id missing"});
    
            const team = await this.teamService.getById(id);
            if(!team) return res.status(HttpStatus.NOT_FOUND).json({message: "team not found"});
    
            return res.status(HttpStatus.OK).json(team);
        } catch (error) {
            next(error);
        };
    };

    async updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "team id missing"});
      
            const newTeamData = req.body;
            if(!newTeamData) return res.status(HttpStatus.BAD_REQUEST).json({message: "new team body missing"});
      
            const team = await this.teamService.getById(id);
            if(!team) return res.status(HttpStatus.NOT_FOUND).json({message: "team not found"});
      
            const updatedTeam = await this.teamService.updateById(team, newTeamData);
      
            return res.status(HttpStatus.OK).json(updatedTeam);
        } catch (error) {
            next(error);
        };
    };

    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "team id missing"});
    
            const deletedRow = await this.teamService.deleteById(id);
            if(!deletedRow.affected) return res.status(HttpStatus.BAD_REQUEST).json({message: "team not found"});
    
            return res.status(HttpStatus.OK).json({message: `team id ${id} deleted`});
        } catch (error) {
            next(error);
        };
    };
};

export default TeamController;