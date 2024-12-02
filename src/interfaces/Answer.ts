/* eslint-disable no-unused-vars */
import Answer from "../models/Answer";
import { NextFunction, Request, Response } from "express";
import IRouter from "./Router";
import { DeleteResult, FindOptionsWhere } from "typeorm";
import User from "../models/User";

interface IAnswerRepository {
  add(answer: Answer): Promise<Answer>;
  getMany(where: FindOptionsWhere<Answer>, skip: number, take: number, page: number): Promise<[Answer[], Number]>;
  getById(id: number): Promise<Answer>;
  getByUserId(id: number): Promise<Answer[]>;
  getByTeamId(id: number, skip: number, take: number, _page: number, user: User): Promise<[Answer[], Number]>;
  updateById(newAnswerData: Answer): Promise<Answer>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IAnswerService {
  answerRepository: IAnswerRepository;

  add(answer: Answer): Promise<Answer>;
  getMany(where: FindOptionsWhere<Answer>, skip?: number, take?: number, page?: number): Promise<[Answer[], Number]>;
  getById(id: number): Promise<Answer>;
  getByUserId(id: number): Promise<Answer[]>;
  getByTeamId(id: number, skip: number, take: number, _page: number, user: User): Promise<[Answer[], Number]>;
  updateById(answer: Answer, newAnswerData: Answer): Promise<Answer>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IAnswerController {
  answerService: IAnswerService;

  add(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getMany(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByUserId(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getFormById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByTeamId(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

interface IAnswerRouter extends IRouter {
  answerController: IAnswerController;
}

export {
  IAnswerRepository,
  IAnswerService,
  IAnswerController,
  IAnswerRouter
};