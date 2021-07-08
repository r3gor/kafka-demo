import Express from 'express'
import { Server as ioServer } from 'socket.io'
import { Server as httpServer } from 'http'
import { consume, consumer } from "./consumer.js";
import { TOPIC_NAME } from './config.js';

const { GROUP_JOIN } = consumer.events;
let joined = false;

const app = Express();
const http = httpServer(app);
const io = new ioServer(http);
const port = 5000;

app.use(Express.static('./'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    io.emit('consumer joined', joined);
});

consumer.on(GROUP_JOIN, e => {
    console.log(`Consumer join!`)
    joined = true;
    io.emit('consumer joined', joined);
})

consume(TOPIC_NAME, (data) => {
    io.emit('key log', data);
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});