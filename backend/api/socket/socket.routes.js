
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('chat exp', expId => {
            if (socket._id) {
                socket.leave(socket._id)
            }
            socket.join(expId)
            socket._id = expId;
        })
        socket.on('user typing', username => {
            io.to(socket._id).emit('user typing', username)
        })
        socket.on('chat newMsg', msg => {
            // console.log(socket._id)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket._id).emit('chat addMsg', msg)
        })

        socket.on('user notification', userId => {
            // console.log('userId', userId)
            
            if (socket.userId) {
                socket.leave(socket.userId)
            }
            socket.join(userId)
            socket.userId = userId;
        })
        socket.on('booking exp', booking => {
            // console.log('booked!')
             console.log('socket.userId', socket.userId)
             
            io.to(socket.userId).emit('new booking', booking)
        })

    })
}