import Form from "../models/Form";
import { NextFunction, Request, Response } from "express";
import IRouter from "./Router";
import { DeleteResult } from "typeorm";

interface IFormRepository {
  add(form: Form): Promise<Form>;
  getMany(skip: number, take: number, page: number): Promise<[Form[], Number]>;
  getByCategory(category:string) : Promise<Form[]>  
  getById(id: number): Promise<Form>;
  getCategories() : Promise<string[]>
  updateById(newFormData: Form): Promise<Form>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IFormService {
  formRepository: IFormRepository;

  add(form: Form): Promise<Form>;
  getMany(skip: number, take: number, page: number): Promise<[Form[], Number]>;
  getByCategory(category:string) : Promise<Form[]>  
  getById(id: number): Promise<Form>;
  getCategories() : Promise<string[]>
  updateById(form: Form, newFormData: Form): Promise<Form>;
  deleteById(id: number): Promise<DeleteResult>;
};

interface IFormController {
  formService: IFormService;

  add(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getMany(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getByCategory(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  getCategories(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
};

interface IFormRouter extends IRouter {
  formController: IFormController;
}

export {
  IFormRepository,
  IFormService,
  IFormController,
  IFormRouter
};