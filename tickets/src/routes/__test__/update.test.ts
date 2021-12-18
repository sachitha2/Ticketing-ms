import request from 'supertest';
import {app} from '../../../src/app';
import mongoose from 'mongoose';
import {natsWrapper} from '../../nats-wrapper';

it('returns a 404 if the provided id does not exist', async () => {
    const id =new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'sdg',
            price: 20
        })
        .expect(404);

})

it('returns a 401 if the user is not authenticated', async () => {
    const id =new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'sdg',
            price: 20
        })
        .expect(401);

})


it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({
                title: 'sdg',
                price: 20
            })

    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', global.signin())
            .send({
                title: 'chata',
                price: 200
            })
            .expect(401);
})


it('returns a 400 if the user provided invalid title or price', async () => {
    const cookie = global.signin();
    const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', cookie)
            .send({
                title: 'sdg',
                price: 20
            })
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: '',
                price: 20
            })
            .expect(400);
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: 'sdg',
                price: -10
            })
            .expect(400);
})

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();
    const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', cookie)
            .send({
                title: 'sdg',
                price: 20
            })
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: 'sdg',
                price: 1000
            })
            .expect(200);
    const ticketResponse = await request(app)
            .get(`/api/tickets/${response.body.id}`)
            .send()
            .expect(200);
    expect(ticketResponse.body.title).toEqual('sdg');
    expect(ticketResponse.body.price).toEqual(1000);
})

it('publishes an event', async ()=>{
    const cookie = global.signin();
    const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', cookie)
            .send({
                title: 'sdg',
                price: 20
            })
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie',cookie)
            .send({
                title: 'hfeuhgu',
                price: 10
            })
            .expect(200);
    // console.log('natsWrapper.client.publish',natsWrapper.client.publish);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    
});