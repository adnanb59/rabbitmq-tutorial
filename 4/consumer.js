const amqp = require("amqplib");

const exchange = "direct_logs";
const severity = new Set(['info', 'warning', 'error']);

// RABBIT_HOST=... node consumer.js [info] [warning] [error]
const receive = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        channel.assertExchange(exchange, 'direct', {durable: false});
        let q = await channel.assertQueue('', {exclusive: true});
        
        // Process arguments and bind queue to exchange with arguments as routing keys
        let args = process.argv.slice(2);
        if (args.length == 0) {
            channel.bindQueue(q.queue, exchange, "info");
        } else {
            args.forEach(arg => {
                if (severity.has(arg)) channel.bindQueue(q.queue, exchange, arg);
            });
        }

        console.log("[R] Waiting for logs. To exit press CTRL+C");
        channel.consume(q.queue, (msg) => {
            console.log("[R] %s: \"%s\"", msg.fields.routingKey, msg.content.toString());
            channel.ack(msg);
        }, {noAck: false});
    } catch (err) {
        throw err;
    }
};

receive();