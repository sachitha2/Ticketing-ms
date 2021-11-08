import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser',(req,res)=>{
    res.send("<h1>Hi there</h1>")
})

export {router as currentUserRouter};