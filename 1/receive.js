const amqp = require('amqplib');

const receiver = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        channel.assertQueue("hello", {durable: false});
        console.log("[R] Waiting for messages in %s. To exit press CTRL+C", "hello");
        channel.consume("hello", msg => {
            console.log("[R] Received %s", msg.content.toString());
        }, {noAck: true});
    } catch (err) {
        throw err;
    }
};

receiver();