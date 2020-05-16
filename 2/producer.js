const amqp = require("amqplib");

const q = "task_queue";

const send = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        let msg = process.argv.slice(2).join(" ") || "Hello World!";
        channel.assertQueue(q, {durable: true});
        channel.sendToQueue(q, Buffer.from(msg), {persistent: true});
        console.log("[S] Sent ", msg);
        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    } catch (err) {
        throw err;
    }
};

send();