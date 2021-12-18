import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';
import jwt from 'jsonwebtoken';
declare global {
    var signin: () => string[];
  }

  jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async()=>{
    process.env.JWT_KEY = 'asdf';
    //nev define karanna puluwan methana
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();


    await mongoose.connect(uri);
});

beforeEach(async()=>{
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async()=>{
    // await mongo.disconnect();
    await mongoose.connection.close();
});


global.signin = ()=>{
    // Build a JWT payload. {id, email}
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email:'test@test.com',
    }
    // create the JWT!
    const token = jwt.sign(payload,process.env.JWT_KEY!);


    //build a session object with jwt {jwt: MY_JWT}
    const session = {jwt:token};

    //Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    //Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    //returns a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];

}