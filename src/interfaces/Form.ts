import Form from "../models/Form";
import { NextFunction, Request, Response } from "express";
import IRouter from "./Router";
import { DeleteResult } from "typeorm";

interface IFormRepository {
  add(form: Form): Promise<Form>;
  getMany(): Promise<Form[]>;
  getByCategory(category:string) : Promise<Form[]>  
  getById(id: number): Promise<Form>;
  updateById(newFormData: Form): Promise<Form>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IFormService {
  FormRepository: IFormRepository;

  add(Form: Form): Promise<Form>;
  getMany(): Promise<Form[]>;
  getByCategory(category:string) : Promise<Form[]>  
  getById(id: number): Promise<Form>;
  updateById(Form: Form, newFormData: Form): Promise<Form>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IFormController {
  FormService: IFormService;

  add(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getMany(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByCategory(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

interface IFormRouter extends IRouter {
  FormController: IFormController;
}

export {
  IFormRepository,
  IFormService,
  IFormController,
  IFormRouter
};