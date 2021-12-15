import request from 'supertest';
import {app} from '../../../src/app';
import {Ticket} from '../../../src/models/ticket';



it('can fetch a list of tickets',async () => {
    await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: 'gkjrgn',
                price: 20
            })
            .expect(201);

    await request(app)
            .post('/api/tickets')
            .set('Cookie',global.signin())
            .send({
                title: 'gkjrgn',
                price: 20
            })
            .expect(201);



    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(2);

});