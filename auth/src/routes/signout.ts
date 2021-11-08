import express from 'express';

const router = express.Router();

router.get('/api/users/signout',(req,res)=>{
    res.send("<h1>this is signout</h1>")
})

export {router as signoutRouter};