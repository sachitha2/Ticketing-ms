import express,{Request,Response} from 'express';
import { body,validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
        body('password')
        .trim()
        .notEmpty()
        .withMessage('Please enter a valid password')
    ]
    ,(req: Request,res: Response)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }else{
            res.send({
                message:'fail',
                errors:errors.array()
            })
        }
    }
)


export {router as signinRouter};