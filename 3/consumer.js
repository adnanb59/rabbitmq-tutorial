const amqp = require('amqplib');

const exchange = "logs";

const receive = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        let reply = await channel.assertQueue("", {exclusive: true});
        console.log("[R] Waiting for messages in %s. To exit press CTRL+C", reply.queue);
        
        channel.bindQueue(reply.queue, exchange, "");
        channel.consume(reply.queue, (msg) => {
            if (msg.content) console.log("[R]", msg.content.toString());
        }, {noAck: true});
    } catch (err) {
        throw err;
    }
};

receive();