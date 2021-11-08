import { Request,Response,NextFunction } from "express";

import {RequestValidationError} from '../errors/request-validation-error';
import {DatabaseConnectionError} from '../errors/database-connection-error';

export const errorHandler = (
    err: Error,
    req: Request ,
    res: Response,
    next: NextFunction
    ) => {
        if(err instanceof RequestValidationError){
            console.log('RequestValidationError');
            const formatedErrors = err.errors.map(error => {
                return { message: error.msg, field: error.param };
            });

            return res.status(400).json({
                errors: formatedErrors
            });
        }
        if(err instanceof DatabaseConnectionError){
            console.log('DatabaseConnectionError');
            return res.status(500).send({errors: [
                {message: err.reason}
            ]});
        }
        console.log(err);
        res.status(400).send({errors: [
            {message: "Something went wrong"}
        ]});

};