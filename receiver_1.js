// docker run -it --rm --name rabbitmq-f -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

var amqp = require('amqplib/callback_api');
var constants = require('./constants');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(constants.exchange_1, 'direct', { // create "direct"-type exchange
            durable: false
        });

        channel.assertQueue(constants.queue_1, { // create queue
                exclusive: true,
            }, function(error2, q) {
            if (error2) {
                throw error2;
            }

            channel.bindQueue(q.queue, constants.exchange_1, constants.routing_key_1); // create binding between routing key and queue

            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            channel.consume(q.queue, function(msg) { // called when consuming an available message
                console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
                channel.ack(msg); // acknowledge message
            }, {
            });
        });
    });
});
