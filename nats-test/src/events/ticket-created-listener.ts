import {Message} from 'node-nats-streaming';
import {Listener} from './base-listener';
import {TicketCreatedEvent} from './ticket-created-event';
import {Subjects} from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';


    onMessage(data: TicketCreatedEvent['data'],msg: Message){
        console.log(data);
        console.log(`Processing the order...`);
        console.log(data.id);
        msg.ack();
       
    }
}