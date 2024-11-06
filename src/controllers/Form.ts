import { NextFunction, Request, Response } from "express";
import { IFormController, IFormService } from "../interfaces/Form";
import HttpStatus from 'http-status-codes';

class FormController implements IFormController {
    formService: IFormService;

    constructor(formService: IFormService) {
        this.formService = formService;
        
        this.add = this.add.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getByCategory = this.getByCategory.bind(this);
        this.getById = this.getById.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    };

    async add(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const form = req.body;
            if(!form.category) {
                return res.status(HttpStatus.BAD_REQUEST).json({message: "form category missing"});
            };


            const newForm = await this.formService.add(form);

            return res.status(HttpStatus.OK).json(newForm);
        } catch (error) {
            next(error);  
        };
    };

    async getMany(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const take = Number(req.query.take) || 10;
            const page = Number(req.query.page) || 1;
            const skip = (page-1) * take;

            const [forms, total] = await this.formService.getMany(skip, take, page);
            if (forms.length === 0) return res.status(HttpStatus.OK).json({message: "no form was created"});

            return res.status(HttpStatus.OK).json({forms, total});
        } catch (error) {
            next(error);
        };
    };

    async getByCategory(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try{
            const category = req.body.category;
            if (!category) return res.status(HttpStatus.BAD_REQUEST).json({message: "category missing"});

            const form = await this.formService.getByCategory(category);
            if(!form) return res.status(HttpStatus.NOT_FOUND).json({message: "category not found"});

            return res.status(HttpStatus.OK).json(form);
        } catch (error) {
            next(error);
        }
    };


    async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "form id missing"});
    
            const form = await this.formService.getById(id);
            if(!form) return res.status(HttpStatus.NOT_FOUND).json({message: "form not found"});
    
            return res.status(HttpStatus.OK).json(form);
        } catch (error) {
            next(error);
        };
        
    };

    async getCategories(_req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const categories = await this.formService.getCategories();
            if(!categories) return res.status(HttpStatus.NOT_FOUND).json({message: "categories not found"});
    
            return res.status(HttpStatus.OK).json(categories);
        } catch (error) {
            next(error);
        };
        
    };


    async updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "form id missing"});
      
            const newFormData = req.body;
            if(!newFormData) return res.status(HttpStatus.BAD_REQUEST).json({message: "new form body missing"});
      
            const form = await this.formService.getById(id);
            if(!form) return res.status(HttpStatus.NOT_FOUND).json({message: "form not found"});
      
            const updatedForm = await this.formService.updateById(form, newFormData);
      
            return res.status(HttpStatus.OK).json(updatedForm); 
        } catch (error) {
            next(error);
        };
    };

    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "form id missing"});
    
            const deletedRow = await this.formService.deleteById(id);
            if(!deletedRow.affected) return res.status(HttpStatus.BAD_REQUEST).json({message: "form not found"});
    
            return res.status(HttpStatus.OK).json({message: `form id ${id} deleted`});
        } catch (error) {
            next(error);
        };
    };
};

export default FormController;