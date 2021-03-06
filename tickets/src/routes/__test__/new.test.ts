import request from 'supertest';
import {app} from '../../../src/app';
import {Ticket} from '../../../src/models/ticket';
import {natsWrapper} from '../../nats-wrapper';


it('has a route handle listenning to /api/tickets for post requests',async () => {
    const response = await request(app)
                    .post('/api/tickets')
                    .send({});

    expect(response.status).not.toEqual(404);
})

it('can only be accesses if the user is signed in',async () => {
    const response = await request(app)
                    .post('/api/tickets')
                    .send({})
    
    expect(response.status).toEqual(401);
})

it('returns a status other than 401 if the user is  signed in',async () => {
    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie',global.signin())
                    .send({})
    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided',async () => {
            await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: '',
                price: 10
            })
            .expect(400);

            await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                price: 10
            })
            .expect(400);


})

it('returns an error if invalid price is provided',async () => {
    await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: 'hfeuhgu',
                price: -10
            })
            .expect(400);

            await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: 'gkjrgn',
            })
            .expect(400);
})

it('creates a ticket with valid inputs',async () => {
    let tickets = await Ticket.find({});

    expect(tickets.length).toEqual(0);

    // add in a check to make sure a ticket was saved
    await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: 'gkjrgn',
                price: 20
            })
            .expect(201);


    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
})

it('publishes an event', async ()=>{
    await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: 'hfeuhgu',
                price: 10
            })
            .expect(201);
    // console.log('natsWrapper.client.publish',natsWrapper.client.publish);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
    
});