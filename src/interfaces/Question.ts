import Question from "../models/Questions";
import { NextFunction, Request, Response } from "express";
import IRouter from "./Router";
import { DeleteResult } from "typeorm";

interface IQuestionRepository {
  add(question: Question): Promise<Question>;
  getMany(skip: number, take: number, page: number): Promise<[Question[], Number]>;
  getByTitle(title:string): Promise<Question[]>
  getByType(type:string): Promise<Question[]>
  getById(id: number): Promise<Question>;
  getByFormId(formId: number, skip: number, take: number, page: number): Promise<[Question[], Number]>;
  getTypes() : Promise<string[]>
  updateById(newQuestionData: Question): Promise<Question>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IQuestionService {
  questionRepository: IQuestionRepository;

  add(question: Question): Promise<Question>;
  getMany(skip: number, take: number, page: number): Promise<[Question[], Number]>;
  getById(id: number): Promise<Question>;
  getByTitle(title:string): Promise<Question[]>
  getByType(type:string): Promise<Question[]>
  getByFormId(formId: number, skip: number, take: number, page: number): Promise<[Question[], Number]>
  getTypes() : Promise<string[]>
  updateById(question: Question, newQuestionData: Question): Promise<Question>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IQuestionController {
  questionService: IQuestionService;

  add(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getMany(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByTitle(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByType(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByFormId(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getTypes(req: Request, res: Response, next: NextFunction): Promise<void | Response>; 
  updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

interface IQuestionRouter extends IRouter {
  questionController: IQuestionController;
}

export {
  IQuestionRepository,
  IQuestionService,
  IQuestionController,
  IQuestionRouter
};