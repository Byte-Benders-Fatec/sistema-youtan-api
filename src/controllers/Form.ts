import Form from "../models/Form";
import { NextFunction, Request, Response } from "express";
import { IFormController, IFormService } from "../interfaces/Form";
import HttpStatus from 'http-status-codes';

class FormController implements IFormController {
    FormService: IFormService;

    constructor(FormService: IFormService) {
        this.FormService = FormService;
        this.add = this.add.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getByCategory = this.getByCategory.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    };

    async add(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const Form = req.body;
            if(!Form.category) {
                return res.status(HttpStatus.BAD_REQUEST).json({message: "Form category missing"});
            };


            await this.FormService.add(Form);

            return res.status(HttpStatus.OK).json({message: "Form successfully created"});
        } catch (error) {
            next(error);  
        };
    };

    async getMany(_req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const Forms = await this.FormService.getMany();
            if (Forms.length === 0) return res.status(HttpStatus.OK).json({message: "no Form was created"});

            return res.status(HttpStatus.OK).json(Forms);
        } catch (error) {
            next(error);
        };
    };

    async getByCategory(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try{
            const category = req.body.category;
            if (!category) return res.status(HttpStatus.BAD_REQUEST).json({message: "category missing"});

            const Form = await this.FormService.getByCategory(category);
            if(!Form) return res.status(HttpStatus.NOT_FOUND).json({message: "category not found"});

            return res.status(HttpStatus.OK).json(Form);
        } catch (error) {
            next(error);
        }
    };


    async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "Form id missing"});
    
            const Form = await this.FormService.getById(id);
            if(!Form) return res.status(HttpStatus.NOT_FOUND).json({message: "Form not found"});
    
            return res.status(HttpStatus.OK).json(Form);
        } catch (error) {
            next(error);
        };
        
    };


    async updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "Form id missing"});
      
            const newFormData = req.body;
            if(!newFormData) return res.status(HttpStatus.BAD_REQUEST).json({message: "new Form body missing"});
      
            const Form = await this.FormService.getById(id);
            if(!Form) return res.status(HttpStatus.NOT_FOUND).json({message: "Form not found"});
      
            await this.FormService.updateById(Form, newFormData);
      
            return res.status(HttpStatus.OK).json({message: "Form successfully updated"}); 
        } catch (error) {
            next(error);
        };
    };

    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "Form id missing"});
    
            const deletedRow = await this.FormService.deleteById(id);
            if(!deletedRow.affected) return res.status(HttpStatus.BAD_REQUEST).json({message: "Form not found"});
    
            return res.status(HttpStatus.OK).json({message: `Form id ${id} deleted`});
        } catch (error) {
            next(error);
        };
    };
};

export default FormController;