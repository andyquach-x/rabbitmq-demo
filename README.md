# rabbitmq-demo

install dependencies with:
`npm install`

start rabbit with:
`docker run -it --rm --name rabbitmq-f -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management`

flow 1:

`node receiver_1.js`

`node sender.js`

flow 2:

`node receiver_2_1.js`

`node receiver_2_2.js`

`node sender.js`