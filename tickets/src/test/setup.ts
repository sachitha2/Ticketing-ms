import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';

declare global {
    var signin: () => Promise<string[]>;
  }

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


global.signin = async()=>{
    // Build a JWT payload. {id, email}

    // create the JWT!


    //build a session object with jwt {jwt: MY_JWT}

    //Turn that session into JSON

    //Take JSON and encode it as base64

    //returns a string thats the cookie with the encoded data

    



}