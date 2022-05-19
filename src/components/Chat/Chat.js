import { AppBar, Box } from "@mui/material";
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import fetchApi, { api } from "../../api";
import { convertMessagesList } from "../../utils";
import Input from '../Input/Input';
import ListUserBar from "../ListUserBar";
import Messages from '../Messages/Messages';
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar";
import './Chat.css';



let socket;

const Chat = ({ location }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);
    const { user_id ,room_id} = queryString.parse(location.search);
    const [open, setOpen] = React.useState(true);
    const [userList, setUserList] = useState([])
    const [store, setStore] = useState({
        chatList : [] ,
        info  : null,
        messages_room  : {} ,
        isTyping : {
            user_id : null , 
            type : false,
        },
    })
    useEffect(() => {
        socket = io(api);
    }, [api]);
    
    useEffect(() => {
        if (user_id) {
           socket.emit('JOIN_CHAT',{ user_id })
        }
    }, [user_id]);

    useEffect(() => {
        if (room_id ) {
            getListMessages(room_id)
        }
    }, [room_id]);

    useEffect(() => {
        socket.on('NEW_MESSAGE', message => {
            console.log({message});
            setMessages(pre => [...pre, message]);
            if(message.sender !== user_id){
                let status = 3
                if(room_id === message.room_id)status =4
                let data = {
                    _id : message._id ,
                    room_id : message.room_id,
                    sender : message.sender,
                    status
                }
                socket.emit('UPDATE_STATUS_MESSAGE',{data})
            }
        });

        socket.on("USERS_ROOM", ({ users }) => {
            let info = users.find(a => a.user_id == user_id)
            if(info) setStore({...store , info : info })
            setUserList(users.filter(a => a.user_id !== user_id))
        });

        socket.on("TYPING_SERVER", ({  userId, roomId , is_typing }) => {
            if(roomId === user_id){
                setStore(pre => {
                    return {
                        ...pre , 
                        isTyping : {
                            user_id : userId,
                            type : is_typing
                        }
                    }
                })
            }
            
        });

        socket.on("UPDATE_STATUS_MESSAGE_SEVER", ({ data }) => {
            //const {_id, sender , room_id ,status} = data
            // setMessages(pre =>{

            // })
        });

    }, []);

    console.log({messagesGroup});
    useEffect(() => {
        if(store.isTyping.user_id && store.isTyping.type ){
            let new_users_sidebar =  
                userList.map( d =>{
                        let isTyping = false
                        if(d.user_id === store.isTyping.user_id) isTyping = true
                        return {
                            ...d,
                            isTyping
                        }
                    })
            setUserList(new_users_sidebar)        
        }else{
            let new_users_sidebar =  
                userList.map( d =>{
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
        if (messages && userList ) {
            let new_list = convertMessagesList(messages,userList)
            setMessagesGroup(new_list)
        }
    }, [messages])

    const sendMessage = async (event) => {
        event.preventDefault();
        if (message) {
            let new_message = {
                sender: user_id,
                room_id: room_id,
                message: message , 
                isGroup : false
            }
            socket.emit('SEND_MESSAGE', new_message);
            setMessage('')
        }
    }

    const getListMessages = async (id) => {
        let new_list = await fetchApi('messages/list/' + id)
        if (new_list && new_list.detail) setMessages(new_list.detail);
    }
    return (
        <Box className="outerContainer" sx={{bgcolor: 'background.default'}}>
            <TopBar open={open} setOpen={setOpen} store={store}/>
            <Sidebar chatList = {store.chatList} user_id={user_id} open={open} setOpen={setOpen}/>
            <Box sx={{bgcolor: 'background.paper', boxShadow: 1, mx: 3, mt: '64px'}} className="container-chat">
                <Messages messagesGroup={messagesGroup} mySelfId={user_id} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </Box>
            <ListUserBar userList={userList}  setStore={setStore} store={store}/>
        </Box>
    );
}
export default Chat;
