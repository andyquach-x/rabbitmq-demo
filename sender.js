var amqp = require('amqplib/callback_api');
var constants = require('./constants');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    console.log('error: ' + error0);
    throw error0;
  }
  
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var msg = 'hello world!';

    // publish message with exchange name, routing key, and payload
    channel.publish(constants.exchange_1, constants.routing_key_1, Buffer.from(msg), {});
    console.log(" [x] Sent %s", msg);
  });
});

