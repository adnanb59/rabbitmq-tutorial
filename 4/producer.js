const amqp = require("amqplib");

const exchange = "direct_logs";

// RABBIT_HOST=... LOG_TYPE=... node producer.js [message]
const send = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        channel.assertExchange(exchange, 'direct', {durable: false});

        let msg = process.argv.slice(2).join(' ') || "THIS ALINA BARAZ ALBUM HITTIN HITTIN";
        let severity = process.env.LOG_TYPE || "info";
        
        channel.publish(exchange, severity, Buffer.from(msg));
        console.log("[S] Sent %s: \"%s\"", severity, msg);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    } catch (err) {
        throw err;
    }
};

send();