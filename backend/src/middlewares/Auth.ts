import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { cookieUtils } from "../utils/Cookie";

const middlewareAuth = (req: Request, _res: Response, next: NextFunction): void => {
    try {
        if(process.env.SKIP_AUTH === "true") {
            return next();
        };
        
        const token = cookieUtils.getCookie(req, process.env.COOKIE_NAME);
        jwt.verify(token, process.env.SECRET_KEY);
        return next();
    } catch (error) {
        return next(error);
    }
    
};

export default middlewareAuth;