import {Message} from 'node-nats-streaming';
import {Listener} from './base-listener';

export class TicketCreatedListener extends Listener{
    subject = 'ticket:created';
    queueGroupName = 'payments-service';


    onMessage(data: any,msg: Message){
        console.log(data);
        console.log(`Processing the order...`);
        
        msg.ack();
       
    }
}