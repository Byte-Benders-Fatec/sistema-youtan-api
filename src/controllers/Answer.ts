import { NextFunction, Request, Response } from "express";
import { IAnswerController, IAnswerService } from "../interfaces/Answer";
import HttpStatus from 'http-status-codes';
import { IFormService } from "../interfaces/Form";
import { Between } from "typeorm";

class AnswerController implements IAnswerController {
    answerService: IAnswerService;
    formService: IFormService;

    constructor(answerService: IAnswerService, formService: IFormService) {
        this.answerService = answerService;
        this.formService = formService;

        this.add = this.add.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUserId = this.getByUserId.bind(this);
        this.getFormById = this.getFormById.bind(this);
        this.getByTeamId = this.getByTeamId.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    };

    async add(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const answer = req.body;
            if(!answer.userAnswers || !answer.user || !answer.form) {
                return res.status(HttpStatus.BAD_REQUEST).json({message: "answer body missing"});
            };

            const newAnswer = await this.answerService.add(answer);

            return res.status(HttpStatus.OK).json(newAnswer);
        } catch (error) {
            next(error);  
        };
    };

    async getMany(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user = res.locals.user.user;
            const take = Number(req.query.take) || 10;
            const page = Number(req.query.page) || 1;
            const from = req.query.from? new Date(`${req.query.from.toString()} 00:00:00`) : new Date("1999-01-01 00:00:00");
            const to = req.query.to? new Date(`${req.query.to.toString()} 23:59:59`) : new Date("2100-01-01 23:59:59");

            const skip = (page-1) * take;

            const where = (user.role === "Admin")? {updatedAt: Between(from, to)} : {updatedAt: Between(from, to), user: {id: user.id}};

            const [answers, total] = await this.answerService.getMany(where, skip, take, page);
            if (answers.length === 0) return res.status(HttpStatus.OK).json({message: "no answer was created"});

            return res.status(HttpStatus.OK).json({answers, total});
        } catch (error) {
            next(error);
        };
    };


    async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "answer id missing"});
    
            const answer = await this.answerService.getById(id);
            if(!answer) return res.status(HttpStatus.NOT_FOUND).json({message: "answer not found"});
    
            return res.status(HttpStatus.OK).json(answer);
        } catch (error) {
            next(error);
        };
        
    };

    async getByUserId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id? parseInt(req.params.id) : res.locals.user.id;
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "user id missing"});
    
            const answers = await this.answerService.getByUserId(id);
            if(answers.length === 0) return res.status(HttpStatus.OK).json({message: "user dont have forms to answer"});
    
            return res.status(HttpStatus.OK).json(answers);
        } catch (error) {
            next(error);
        };
        
    };

    async getFormById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "form id missing"});
    
            const form = await this.formService.getById(id);
            if(!form) return res.status(HttpStatus.OK).json({message: "form not found"});
    
            return res.status(HttpStatus.OK).json(form);
        } catch (error) {
            next(error);
        };
        
    };

    async getByTeamId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user = res.locals.user.user;
            const id = user.team.id;
            const take = Number(req.query.take) || 10;
            const page = Number(req.query.page) || 1;
            const skip = (page-1) * take;

            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "team id missing"});
    
            const [answers, total] = await this.answerService.getByTeamId(id, skip, take, page, user);
            if(!answers) return res.status(HttpStatus.OK).json({message: "answers not found"});
    
            return res.status(HttpStatus.OK).json({answers, total});
        } catch (error) {
            next(error);
        };
        
    };

    async updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "answer id missing"});
      
            const newAnswerData = req.body;
            if(!newAnswerData) return res.status(HttpStatus.BAD_REQUEST).json({message: "new answer body missing"});
      
            const answer = await this.answerService.getById(id);
            if(!answer) return res.status(HttpStatus.NOT_FOUND).json({message: "answer not found"});
      
            const updatedAnswer = await this.answerService.updateById(answer, newAnswerData);
      
            return res.status(HttpStatus.OK).json(updatedAnswer); 
        } catch (error) {
            next(error);
        };
    };

    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "answer id missing"});
    
            const deletedRow = await this.answerService.deleteById(id);
            if(!deletedRow.affected) return res.status(HttpStatus.BAD_REQUEST).json({message: "answer not found"});
    
            return res.status(HttpStatus.OK).json({message: `answer id ${id} deleted`});
        } catch (error) {
            next(error);
        };
    };
};

export default AnswerController;