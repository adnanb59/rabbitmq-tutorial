const amqp = require("amqplib");

const receive = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
    } catch (err) {
        throw err;
    }
};

receive();