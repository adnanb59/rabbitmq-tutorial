# rabbitmq-tutorial
RabbitMQ [tutorials](https://www.rabbitmq.com/getstarted.html) using NodeJS library amqplib

### Tutorial 1
This tutorial is to display how to do a simple publisher-consumer example where the sender and receiver are bound to
a queue and the receiver gets the message published by the sender.
- Run sender: ```RABBIT_HOST=... node send.js```
- Run receiver: ```RABBIT_HOST=... node receive.js```

### Tutorial 2
This tutorial is to display how to use work (or task) queues that will distribute tasks among workers
(the competing consumers pattern). If a worker is busy, the queue will dispatch to the next available worker.
- Run producer: ```RABBIT_HOST=... node producer.js <message>```
- Run consumer: ```RABBIT_HOST=... node consumer.js```

### Tutorial 3
This tutorial is to display how to send messages to all the consumers subscribed to a queue (publish/subscribe).
- Run producer: ```RABBIT_HOST=... node producer.js <message>```
- Run consumer: ```RABBIT_HOST=... node consumer.js```

### Tutorial 4
This tutorial displays how to use routing keys to subscribe consumers to queues and having producers send messages
to RabbitMQ using routing keys.
- Run producer: ```RABBIT_HOST=... LOG_TYPE=... node producer.js <message>```
- Run consumer: ```RABBIT_HOST=... node consumer.js [<severity> ...]```

### Tutorial 5
This tutorial expands on the previous one where instead of using direct routing keys, the exchange uses topics to
distribute messages to queues.
- Run producer: ```RABBIT_HOST=... ROUTING_KEY=... node producer.js <message>```
- Run consumer: ```RABBIT_HOST=... node consumer.js [<facility>.<severity> ...]```

### Tutorial 6
This tutorial displays how to do a *Remote Procedure Call (or RPC)* between a client and a server. The example used
to imitate a heavy task is to calculate a fibonacci number. Each client creates a callback queue to communicate with the server.
- Run server: ```RABBIT_HOST=... node server.js```
- Run client: ```RABBIT_HOST=... node client.js <number>```

### Tutorial 7
This tutorial is to display how to use publisher confirms (to confirm that messages have reached the broker) on a channel.
It is not done because I don't think that *amqplib* has the full capabilities (from reading the API reference,
as well as there being no section for Javascript in the tutorials).
