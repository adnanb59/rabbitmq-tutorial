const amqp = require('amqplib');
const isValid = require("./lib");

const exchange = "topic_logs";

const receive = async () => {
    let args = process.argv.slice(2);
    if (args.length == 0) {
        args.push("user.info");
    } else {
        args.forEach(a => {
            if (!isValid(a)) {
                console.log("Invalid routing key: ", a);
                process.exit(1);
            }
        })
    }

    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();

        channel.assertExchange(exchange, "topic", {durable: true});
        let q = await channel.assertQueue('', {exclusive: true});
        args.forEach(tk => channel.bindQueue(q.queue, exchange, tk));

        console.log('[R] Waiting for logs. To exit press CTRL+C');
        channel.consume(q.queue, (msg) => {
            console.log("[R] %s:\"%s\"", msg.fields.routingKey, msg.content.toString());
            channel.ack(msg);
        }, {noAck: false});
    } catch (error) {
        throw error;
    }
};

receive();