import socketio from 'socket.io'
import { createMessage } from '../controllers/messageControllers.js';
import Message from '../models/messagesModel.js';
import { addUser, getUser } from '../users.js';
function SocketIO (server){
    const io = socketio(server);
    io.on('connect', (socket) => {
        socket.on('JOIN_CHAT', ({user_id }, callback) => {

           // io.to(user.room).emit('ROOM_DATA', { room: user.room, users: getUsersInRoom(user.room) });
            callback();
        });
        
        socket.on('JOIN_ROOM', ({room_id}, callback) => {
            socket.join(room_id);
        });

        socket.on('SEND_MESSAGE', (message, callback) => {
            const { sender , room_id } = message
            if(sender){
                let new_message =  new Message(message);
                io.to(room_id).emit('NEW_MESSAGE', new_message);
            }

            callback();
        });

        // socket.on('disconnect', () => {
        //     const user = removeUser(socket.id);

        //     if (user) {
        //         io.to(user.room).emit('NEW_MESSAGE', { user: 'Admin', text: `${user.name} has left.` });
        //         io.to(user.room).emit('ROOM_DATA', { room: user.room, users: getUsersInRoom(user.room) });
        //     }
        // })
    });
}
export default SocketIO; 