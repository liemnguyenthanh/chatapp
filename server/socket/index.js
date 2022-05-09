import socketio from 'socket.io'
import { createMessage } from '../controllers/messageControllers.js';
function SocketIO (server){
    const io = socketio(server);
    io.on('connect', (socket) => {
        // socket.on('JOIN_ROOM', ({ name, room }, callback) => {
        //     const { error, user } = addUser({ id: socket.id, name, room });

        //     if (error) return callback(error);
        //     let mess_admin = GenerateMessage('admin','Welcome to Chat!!',nanoid() ,2 , [])

        //     socket.join(user.room);
        //     socket.emit('NEW_MESSAGE', mess_admin);

        //     let mess = user.name + '  has joined!'
        //     let data = GenerateMessage(null,mess,nanoid() ,2 , [])

        //     socket.broadcast
        //           .to(user.room)
        //           .emit('NEW_MESSAGE',data);


        //     io.to(user.room).emit('ROOM_DATA', { room: user.room, users: getUsersInRoom(user.room) });

        //     callback();
        // });

        socket.on('SEND_MESSAGE', (message, callback) => {
            const { sender , room_id } = message
            if(sender){
                let new_message = createMessage(message)
                if(new_message) io.to(room_id).emit('NEW_MESSAGE', new_message);
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