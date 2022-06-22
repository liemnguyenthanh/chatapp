import { AppBar, Box } from "@mui/material";
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import fetchApi, { api } from "../../api";
import { convertMessagesList, last } from "../../utils";
import Input from '../Input/Input';
import ListUserBar from "../ListUserBar";
import Messages from '../Messages/Messages';
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar";
import './Chat.css';
import { createMessage } from '../../utils/index';
import { nanoid } from 'nanoid';
import { STATUS_MESSAGE } from '../../constant';



let socket;
let room = [
    {
        room_id: 1,
        room_name: 'Room Test'
    }
]
const Chat = ({ location }) => {
    const { user_id, room_id } = queryString.parse(location.search);

    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState(null);
    const [messagesGroup, setMessagesGroup] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [userList, setUserList] = useState([])

    const [store, setStore] = useState({
        chatList: room,
        info: null,
        messages_room: {},
        isTyping: {
            user_id: null,
            type: false,
        },
        update_status: null
    })
    useEffect(() => {
        socket = io(api);
    }, [api]);

    useEffect(() => {
        if (user_id) {
            socket.emit('JOIN_CHAT', { user_id })
        }
    }, [user_id]);

    useEffect(() => {
        if (room_id) {
            getListMessages(room_id)
        }
    }, [room_id]);

    useEffect(() => {
        socket.on('NEW_MESSAGE', message => {
            setNewMessage(message);
            updateStatusMessage(message)
        });

        socket.on("USERS_ROOM", ({ users }) => {
            let info = users.find(a => a.user_id == user_id)
            if (info) setStore({ ...store, info: info })
            setUserList(users.filter(a => a.user_id !== user_id))
        });

        socket.on("TYPING_SERVER", ({ userId, roomId, is_typing }) => {
            if (roomId === user_id) {
                setStore(pre => {
                    return {
                        ...pre,
                        isTyping: {
                            user_id: userId,
                            type: is_typing
                        }
                    }
                })
            }

        });

        socket.on("UPDATE_STATUS_MESSAGE_SEVER", ({ message_update }) => {
            setStore(pre => { return { ...pre, update_status: message_update } })
        });

    }, []);

    useEffect(() => {
        if (store.update_status) {
            console.log({ messagesGroup });
            let new_list_group = [...messagesGroup].map(a => {
                return {
                    ...a,
                    messages: a.messages.map(
                        b => {
                            return {
                                ...b,
                                status: b._id == store.update_status._id ? store.update_status.status : b.status
                            }
                        }
                    )
                }
            })
            setStore({ ...store, update_status: null })
            setMessagesGroup(new_list_group)
        }
    }, [store.update_status])

    useEffect(() => {
        if (store.isTyping.user_id && store.isTyping.type) {
            let new_users_sidebar =
                userList.map(d => {
                    let isTyping = false
                    if (d.user_id === store.isTyping.user_id) isTyping = true
                    return {
                        ...d,
                        isTyping
                    }
                })
            setUserList(new_users_sidebar)
        } else {
            let new_users_sidebar =
                userList.map(d => {
                    let isTyping = false
                    return {
                        ...d,
                        isTyping
                    }
                })
            setUserList(new_users_sidebar)
        }
    }, [store.isTyping])

    useEffect(() => {
        if(message.length == 0) socket.emit('IS_TYPING_CLIENT',{ user_id , room_id , is_typing : false});
        if(message.length > 0 && !store.isTyping.type ) socket.emit('IS_TYPING_CLIENT',{ user_id ,room_id ,  is_typing : true});
    }, [message]);

    useEffect(() => {
        if (newMessage) {
            let new_list_group = null
            if (messagesGroup.length > 0) {
                new_list_group = updateListMessageGroup(messagesGroup, newMessage)
            } else {
                new_list_group = convertMessagesList([newMessage])
            }
            setMessagesGroup(new_list_group)
            setNewMessage(null)
        }
    }, [newMessage])

    const updateListMessageGroup = (old_list, new_message) => {
        new_message =  createMessage(new_message)
        let last_sender = last(old_list).info
        if (last_sender === newMessage.sender) {
            return old_list.map((users, i) => {
                if (i === (old_list.length - 1)) {
                    return {
                        ...users,
                        messages: [...users.messages,new_message]
                    }
                } else return users
            })
        }else{
            let user_group = { key: nanoid(), info: new_message.sender, messages: [new_message] }
            old_list.push(user_group)
            console.log({old_list});
            return old_list
        }
    }
    const sendMessage = async (event) => {
        event.preventDefault();
        if (message) {
            let new_message = {
                sender: user_id,
                room_id: room_id,
                message: message,
                isGroup: false
            }
            socket.emit('SEND_MESSAGE', new_message);
            setMessage('')
        }
    }
    const updateStatusMessage = (message) =>{
        if (message.sender !== user_id) {
            let status = STATUS_MESSAGE.receive;
            if (room_id === message.sender) status = STATUS_MESSAGE.seen;
            let data = {
                _id: message._id,
                room_id: message.room_id,
                sender: message.sender,
                status
            }
            socket.emit('UPDATE_STATUS_MESSAGE', { data })
        }
    }

    const getListMessages = async (id) => {
        let new_list = await fetchApi('messages/list/' + id)
        if (new_list && new_list.detail) {
            setMessagesGroup(convertMessagesList(new_list.detail))
        }

    }
    return (
        <Box className="outerContainer" sx={{ bgcolor: 'background.default' }}>
            <TopBar open={open} setOpen={setOpen} store={store} />
            <Sidebar chatList={store.chatList} user_id={user_id} open={open} setOpen={setOpen} />
            <Box sx={{ bgcolor: 'background.paper', boxShadow: 1, mx: 3, mt: '64px' }} className="container-chat">
                <Messages messagesGroup={messagesGroup} mySelfId={user_id} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </Box>
            <ListUserBar userList={userList} user_id={user_id} setStore={setStore} store={store} />
        </Box>
    );
}
export default Chat;
