const amqp = require("amqplib");
const queue = "rpc_queue";

const fibonacci = n => {
    if (n == 0 || n == 1) return n;
    else return fibonacci(n-1) + fibonacci(n-2);
};

const handle = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();

        channel.assertQueue(queue, {durable: false});
        channel.prefetch(1);

        console.log("[S] Awaiting RPC requests");

        channel.consume(queue, (msg) => {
            let n = parseInt(msg.content.toString());
            let res = fibonacci(n);
            console.log("[S] fib(%d)=%d", n, res);
            
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(res.toString()), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        }, {noAck: false});
    } catch (error) {
        throw error;
    }
}

handle();