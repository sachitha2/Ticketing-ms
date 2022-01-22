import mongoose from 'mongoose';

interface TicketAttrs {
    title: string;
    price: number;
}


export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = doc._id;
            delete ret._id;
        }
    }
});

Schema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
}   // static method


const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', Schema);

export { Ticket };