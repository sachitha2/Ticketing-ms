import request from 'supertest';
import {app} from '../../../src/app';
import mongoose from 'mongoose';


it('Returns a 404 if ticket is not found',async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404);
});

it('Returns the ticket if ticket is found',async() => {
    const title = 'hfeuhgu';
    const price = 10;
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title,
        price
    })
    .expect(201);

    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});