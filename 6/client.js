const amqp = require("amqplib");

const createRandomId = () => Math.random.toString() + Math.random.toString() + Math.random.toString();

const handle = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();

        let q = await channel.assertQueue('', {exclusive: true});
        
        let correlationId = createRandomId();
        let num = parseInt(process.argv.slice(2)[0]);
        console.log("[C] Requesting fib(%d)", num);

        channel.sendToQueue("rpc_queue", Buffer.from(num.toString()), {
            correlationId: correlationId,
            replyTo: q.queue
        });

        channel.consume(q.queue, (msg) => {
            if (msg.properties.correlationId == correlationId) {
                console.log("[C] Got", msg.content.toString());
                setTimeout(() => {
                    conn.close();
                    process.exit(0);
                }, 500);
            }
        }, {noAck: true});
    } catch (error) {
        throw error;
    }
}

handle();