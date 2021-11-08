import express,{Request,Response } from 'express';
import {body, validationResult} from 'express-validator';

import {RequestValidationError} from '../errors/request-validation-error';
import {DatabaseConnectionError} from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
    body('password')
    .trim()
    .isLength({min:4, max:20})
    .withMessage('password must be between 4 and 20 characters long')

],
(req: Request,res: Response)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // throw new Error("Invalid email address or password");
        throw new RequestValidationError(errors.array());
    }


    console.log("Creating user.....");
    // throw new Error("Error connecting to database.");
    throw new DatabaseConnectionError();
    res.send("<h1>this is signup</h1>")
})

export {router as signupRouter};