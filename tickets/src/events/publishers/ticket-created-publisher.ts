import {Subjects,TicketCreatedEvent,Publisher} from '@infiniteam/common';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    

}