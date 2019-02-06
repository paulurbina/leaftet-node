const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

// Initializations
const app = express();
const server = http.createServer(app);
const io =  socketIO(server);


//Settings
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.use(require('./routes/'));

//Sockets
require('./sockets')(io);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server listerning
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});