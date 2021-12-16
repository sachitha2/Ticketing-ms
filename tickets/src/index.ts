import mongoose from 'mongoose';

import {app} from './app';
import {natsWrapper} from './nats-wrapper';
const start = async ()=>{

    // check jwt key is exists
    if (!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await natsWrapper.connect('ticketing','grhhgr','http://nats-srv:4222');
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err);
    }

    
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}



start();