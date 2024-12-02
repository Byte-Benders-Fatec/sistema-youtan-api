import { NextFunction, Request, Response } from "express";
import { IQuestionController, IQuestionService } from "../interfaces/Question";
import HttpStatus from 'http-status-codes';

class QuestionController implements IQuestionController {
    questionService: IQuestionService;

    constructor(questionService: IQuestionService) {
        this.questionService = questionService;
        
        this.add = this.add.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getById = this.getById.bind(this);
        this.getByType = this.getByType.bind(this);
        this.getByTitle = this.getByTitle.bind(this);
        this.getByFormId = this.getByFormId.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    };

    async add(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const question = req.body;
            if(!question.category || !question.title || !question.type || !question.form) {
                return res.status(HttpStatus.BAD_REQUEST).json({message: "question body missing"});
            };


            const newQuestion = await this.questionService.add(question);

            return res.status(HttpStatus.OK).json(newQuestion);
        } catch (error) {
            next(error);  
        };
    };

    async getMany(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const take = Number(req.query.take) || 10;
            const page = Number(req.query.page) || 1;
            const skip = (page-1) * take;

            const [teams, total] = await this.questionService.getMany(skip, take, page);
            if (teams.length === 0) return res.status(HttpStatus.OK).json({message: "no question was created"});

            return res.status(HttpStatus.OK).json({teams, total});
        } catch (error) {
            next(error);
        };
    };

    async getByType(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try{
            const type = req.body.type;
            if (!type) return res.status(HttpStatus.BAD_REQUEST).json({message: "type missing"});

            const question = await this.questionService.getByType(type);
            if(!question) return res.status(HttpStatus.NOT_FOUND).json({message: "type not found"});

            return res.status(HttpStatus.OK).json(question);
        } catch (error) {
            next(error);
        }
    };


    async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "question id missing"});
    
            const question = await this.questionService.getById(id);
            if(!question) return res.status(HttpStatus.NOT_FOUND).json({message: "question not found"});
    
            return res.status(HttpStatus.OK).json(question);
        } catch (error) {
            next(error);
        };
        
    };

    async getByTitle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try{
            const title = req.body.title;
            if (!title) return res.status(HttpStatus.BAD_REQUEST).json({message: "title missing"});

            const question = await this.questionService.getByType(title);
            if(!question) return res.status(HttpStatus.NOT_FOUND).json({message: "title not found"});

            return res.status(HttpStatus.OK).json(question);
        } catch (error) {
            next(error);
        }
    };

    async getByFormId(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const formId = parseInt(req.params.formId);
            const take = Number(req.query.take) || 10;
            const page = Number(req.query.page) || 1;
            const skip = (page-1) * take;

            const [questions, total] = await this.questionService.getByFormId(formId, skip, take, page);
            if (questions.length === 0) return res.status(HttpStatus.OK).json({message: "no question was created"});
            
            return res.status(HttpStatus.OK).json({questions, total});
        } catch (error) {
            next(error);
        };
    };

    async getTypes(_req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const types = await this.questionService.getTypes();
            if(!types) return res.status(HttpStatus.NOT_FOUND).json({message: "types not found"});
    
            return res.status(HttpStatus.OK).json(types);
        } catch (error) {
            next(error);
        };
        
    };

    async getCategories(_req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const categories = await this.questionService.getCategories();
            if(!categories) return res.status(HttpStatus.NOT_FOUND).json({message: "categories not found"});
    
            return res.status(HttpStatus.OK).json(categories);
        } catch (error) {
            next(error);
        };
        
    };


    async updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "question id missing"});
      
            const newQuestionData = req.body;
            if(!newQuestionData) return res.status(HttpStatus.BAD_REQUEST).json({message: "new question body missing"});
      
            const question = await this.questionService.getById(id);
            if(!question) return res.status(HttpStatus.NOT_FOUND).json({message: "question not found"});
      
            const updatedQuestion = await this.questionService.updateById(question, newQuestionData);
      
            return res.status(HttpStatus.OK).json(updatedQuestion); 
        } catch (error) {
            next(error);
        };
    };

    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "question id missing"});
    
            const deletedRow = await this.questionService.deleteById(id);
            if(!deletedRow.affected) return res.status(HttpStatus.BAD_REQUEST).json({message: "question not found"});
    
            return res.status(HttpStatus.OK).json({message: `question id ${id} deleted`});
        } catch (error) {
            next(error);
        };
    };
};

export default QuestionController;
