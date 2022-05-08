const http = require('http');
const SocketIO = require('./socket/index');
const express = require('express');
const cors = require('cors');


const router = require('./router');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(router);
SocketIO(server)

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));