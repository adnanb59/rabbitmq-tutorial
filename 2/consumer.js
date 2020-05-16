const amqp = require("amqplib");
const q = "task_queue";

const receive = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        channel.assertQueue(q, {durable: true});
        channel.prefetch(1);
        console.log("[R] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, msg => {
            let secs = msg.content.toString().split(".").length - 1;
            console.log("[R] Received ", msg.content.toString());
            setTimeout(() => {
                console.log("[R] Done.");
                channel.ack(msg);
            }, secs*1000);
        }, {noAck: false});
    } catch (err) {
        throw err;
    }
};

receive();