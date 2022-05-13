import { AppBar, Box } from "@mui/material";
import queryString from 'query-string';
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import fetchApi from "../../api";
import { convertMessagesList } from "../../utils";
import Input from '../Input/Input';
import ListUserBar from "../ListUserBar";
import Messages from '../Messages/Messages';
import Sidebar from "../Sidebar/Sidebar";
import TopBar from "../TopBar";
import './Chat.css';



const ENDPOINT = 'https://chatapptma.herokuapp.com';
let socket;

const Chat = ({ location }) => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);
    const { user_id ,room_id} = queryString.parse(location.search);
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        socket = io(ENDPOINT);
        // socket.emit('JOIN_CHAT', { user_id }, (error) => {
        //     if (error) {
        //         alert(error);
        //     }
        // });

    }, [ENDPOINT]);


    useEffect(() => {
        if (room_id && user_id) {
            socket.emit('JOIN_ROOM',{ user_id, room_id})
            getListMessages(room_id)
        }
    }, [room_id ,user_id]);


    useEffect(() => {

        socket.on('NEW_MESSAGE', message => {
            setMessages(pre => [...pre, message]);
        });

        socket.on("USERS_ROOM", ({ users }) => {
            console.log('users room');
            setUsers(users);
        });
    }, []);

    useEffect(() => {
        if (messages) {
            let new_list = convertMessagesList(messages)
            setMessagesGroup(new_list)
        }
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            let new_message = {
                sender: user_id,
                room_id: room_id,
                message: message
            }
            socket.emit('SEND_MESSAGE', new_message, () => setMessage(''));
        }
    }

    const getListMessages = async (id) => {
        let new_list = await fetchApi('messages/list/' + id)
        if (new_list && new_list.detail) setMessages(new_list.detail);
    }
    return (
        <Box className="outerContainer" sx={{bgcolor: 'background.default'}}>
            <TopBar open={open} setOpen={setOpen}/>
            <Sidebar user_id={user_id} open={open} setOpen={setOpen}/>
            <Box sx={{bgcolor: 'background.paper', boxShadow: 1, mx: 3, mt: '64px'}} className="container-chat">
                <Messages messagesGroup={messagesGroup} mySelfId={user_id} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </Box>
            <ListUserBar />
        </Box>
    );
}

export default Chat;
