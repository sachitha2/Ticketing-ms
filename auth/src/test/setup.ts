import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {app} from '../app';

let mongo: any;
beforeAll(async()=>{

    //nev define karanna puluwan methana
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();


    await mongoose.connect(uri);
});

beforeEach(async()=>{
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async()=>{
    // await mongo.disconnect();
    await mongoose.connection.close();
});