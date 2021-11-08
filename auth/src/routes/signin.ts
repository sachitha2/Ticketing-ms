import express from 'express';

const router = express.Router();

router.get('/api/users/signin',(req,res)=>{
    res.send("<h1>this is sign in</h1>")
})

export {router as signinRouter};