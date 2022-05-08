const { addUser, removeUser, getUser, getUsersInRoom } = require('./../users');
const { MessageJoinRoom ,MessageUserSend ,GenerateMessage} = require('./helpers');
const { nanoid } = require('nanoid');

function SocketIO (server){
    const socketio = require('socket.io');
    const io = socketio(server);

    io.on('connect', (socket) => {
        socket.on('join', ({ name, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, name, room });

            if (error) return callback(error);
            let mess_admin = GenerateMessage('admin','Welcome to Chat!!',nanoid() ,2 , [])

            socket.join(user.room);
            socket.emit('message', mess_admin);

            let mess = user.name + '  has joined!'
            let data = GenerateMessage(null,mess,nanoid() ,2 , [])

            socket.broadcast
                  .to(user.room)
                  .emit('message',data);


            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);
            if(user){
                let data = GenerateMessage(user.name,message,nanoid() ,1, [])
                io.to(user.room).emit('message',data);
            }

            callback();
        });

        socket.on('disconnect', () => {
            const user = removeUser(socket.id);

            if (user) {
                io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
            }
        })
    });
}
module.exports = SocketIO; 