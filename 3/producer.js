const amqp = require('amqplib');

const exchange = "logs";

const send = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        let msg = process.argv.slice(2).join(" ") || "HELLO WORLD! --ADNAN";

        channel.assertExchange(exchange, "fanout", {durable: false});
        channel.publish(exchange, "", Buffer.from(msg));
        console.log("[S] Sent", msg);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    } catch (err) {
        throw err;
    }
};

send();