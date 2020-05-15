const amqp = require("amqplib");

const send = async () => {
    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();
    } catch (err) {
        throw err;
    }
};

send();