const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const axios = require('axios');
const config = require('./config');
const temp = require('./template');
const id = config.USERNAME;

app.get('/', async(req, res) => {
    res.send(await temp.plate(id));
});

setInterval(async() => {
    var subs_count = await axios.get(`https://api.telegram.org/bot${config.BOT_API_KEY}/getChatMembersCount?chat_id=@${id}`);
    io.emit(id, { 'subs': subs_count.data.result });
}, 5000);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Listening at Port: ${port}`)
});