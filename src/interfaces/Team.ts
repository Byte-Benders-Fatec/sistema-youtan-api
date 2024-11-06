/* eslint-disable no-unused-vars */
import Team from './../models/Team';
import { NextFunction, Request, Response } from "express";
import IRouter from "./Router";
import { DeleteResult } from "typeorm";


interface ITeamRepository {
  add(team: Team): Promise<Team>;
  getMany(skip: number, take: number, page: number): Promise<[Team[], Number]>;
  getById(id: number): Promise<Team>;
  getByName(name: string): Promise<Team>;
  updateById(newTeamData: Team): Promise<Team>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface ITeamService {
  teamRepository: ITeamRepository;

  add(team: Team): Promise<Team>;
  getMany(skip?: number, take?: number, page?: number): Promise<[Team[], Number]>;
  getById(id: number): Promise<Team>;
  getByName(name: string): Promise<Team>;
  updateById(team: Team, newTeamData: Team): Promise<Team>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface ITeamController {
  teamService: ITeamService;

  add(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getMany(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

interface ITeamRouter extends IRouter {
  teamController: ITeamController;
}

export {
  ITeamRepository,
  ITeamService,
  ITeamController,
  ITeamRouter
};