const amqp = require('amqplib');

const sender = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
        let queue = "hello";
        let msg = "Hello World";
        channel.assertQueue(queue, {durable: false});
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("[S] Sent ", msg);
        
        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    } catch (err) {
        throw err;
    }
};

sender().catch(err => {throw err});