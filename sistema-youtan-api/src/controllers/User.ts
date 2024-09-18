import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import { IUserController, IUserService } from "../interfaces/User";
import HttpStatus from 'http-status-codes';

class UserController implements IUserController {
    userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;

        this.add = this.add.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getByEmail = this.getByEmail.bind(this);
        this.getByLogin = this.getByLogin.bind(this);
        this.getById = this.getById.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    };

    async add(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user = req.body;
            if(!user.email || !user.role || !user.team) {
                return res.status(HttpStatus.BAD_REQUEST).json({message: "user body missing"});
            };

            const userIsCreated = await this.userService.getByEmail(user.email);
            if (userIsCreated) return res.status(HttpStatus.BAD_REQUEST).json({message: "email already in use"}); 

            await this.userService.add(user);

            return res.status(HttpStatus.OK).json({message: "user successfully created"});
        } catch (error) {
            next(error);  
        };
    };

    async getMany(_req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users = await this.userService.getMany();
            if (users.length === 0) return res.status(HttpStatus.OK).json({message: "no user was created"});

            return res.status(HttpStatus.OK).json(users);
        } catch (error) {
            next(error);
        };
    };

    async getByEmail(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try{
            const email = req.body.email;
            if (!email) return res.status(HttpStatus.BAD_REQUEST).json({message: "email missing"});

            const user = await this.userService.getByEmail(email);
            if(!user) return res.status(HttpStatus.NOT_FOUND).json({message: "user not found"});

            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            next(error);
        }
    };

    async getByLogin(login: User): Promise<User> {
        const user = await this.userService.getByLogin(login);
    
        return user;
    };

    async getById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "user id missing"});
    
            const user = await this.userService.getById(id);
            if(!user) return res.status(HttpStatus.NOT_FOUND).json({message: "user not found"});
    
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            next(error);
        };
        
    };

    async updateById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "user id missing"});
      
            const newUserData = req.body;
            if(!newUserData) return res.status(HttpStatus.BAD_REQUEST).json({message: "new user body missing"});
      
            const user = await this.userService.getById(id);
            if(!user) return res.status(HttpStatus.NOT_FOUND).json({message: "user not found"});
      
            await this.userService.updateById(user, newUserData);
      
            return res.status(HttpStatus.OK).json({message: "user successfully updated"}); 
        } catch (error) {
            next(error);
        };
    };

    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
        try {
            const id = parseInt(req.params.id);
            if(!id) return res.status(HttpStatus.BAD_REQUEST).json({message: "user id missing"});
    
            const deletedRow = await this.userService.deleteById(id);
            if(!deletedRow.affected) return res.status(HttpStatus.BAD_REQUEST).json({message: "user not found"});
    
            return res.status(HttpStatus.OK).json({message: `user id ${id} deleted`});
        } catch (error) {
            next(error);
        };
    };
};

export default UserController;