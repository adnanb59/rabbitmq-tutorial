const amqp = require('amqplib');
const isValid = require("./lib");

const exchange = "topic_logs";

const send = async () => {

    let route_key = process.env.ROUTING_KEY || "user.info";
    if (route_key !== "user.info") {
        if (!isValid(route_key)) {
            console.log("Invalid routing key");
            process.exit(1);
        }
    }

    try {
        let conn = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
        let channel = await conn.createChannel();

        channel.assertExchange(exchange, "topic", {durable: true});

        let msg = process.argv.slice(2).join(' ') || "THAT'S BRO FROM KWAY, BEFORE SNAKES AND LADDERS";

        channel.publish(exchange, route_key, Buffer.from(msg));
        console.log("[S] Sent %s: %s", route_key, msg);

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        throw error;
    }
};

send();