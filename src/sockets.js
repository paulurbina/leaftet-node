module.exports = io => {
    io.on('connection', (socket) => {
        console.log('new User Connected');
        
        socket.on('userCoordinates', coords => {
            console.log(coords);
            socket.broadcast.emit('newUserCoordinates', coords);
        });

    });
};