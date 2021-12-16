import {Subjects,TicketUpdatedEvent,Publisher} from '@infiniteam/common';


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    

}