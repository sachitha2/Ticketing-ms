import nats from 'node-nats-streaming';

console.clear();
const client = nats.connect('ticketing','abc',{
    url:'http://localhost:4222'
});

client.on('connect',()=>{
    console.log('Publisher connected to NATS');
    const data = JSON.stringify({
        id:1,
        title:'concert',
        price:20
    });

    client.publish('ticket:created',data,()=>{
        // this is call back function
        console.log('Event published');
    });


});
