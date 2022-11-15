// docker run -it --rm --name rabbitmq-f -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange_name = 'exchange_2';
        channel.assertExchange(exchange_name, 'direct', { // create "direct"-type exchange
            durable: false
        });

        channel.assertQueue('queue_2', { // create queue
                exclusive: true,
            }, function(error2, q) {
            if (error2) {
                throw error2;
            }

            channel.bindQueue(q.queue, exchange_name, 'routing_key_2'); // create binding between routing key and queue

            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            channel.consume(q.queue, function(msg) { // called when consuming an available message
                console.log(" [x] PICKING UP DEADLETTER MESSAGE %s:'%s'", msg.fields.routingKey, msg.content.toString());
                channel.ack(msg); // acknowledge message
            }, {
            });
        });
    });
});
