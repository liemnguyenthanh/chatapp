import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import './Chat.css';
import { convertMessagesList } from "../../utils";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from 'react-router-dom'
import { Box } from "@mui/material";
import fetchApi from "../../api";



const ENDPOINT = 'http://localhost:8080';
let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);
    const { user_id ,room_id} = queryString.parse(location.search);
    useEffect(() => {
        socket = io(ENDPOINT);
    }, [ENDPOINT, room_id]);


    useEffect(() => {
        if (room_id) getListMessages(room_id)
    }, [room_id]);


    useEffect(() => {

        socket.on('NEW_MESSAGE', message => {
            setMessages(pre => [...pre, message]);
        });

        socket.on("ROOM_DATA", ({ users }) => {
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
            <Sidebar user_id={user_id} />
            <Box sx={{bgcolor: 'background.paper', boxShadow: 1, mx: 3}} className="container-chat">
                <Messages messagesGroup={messagesGroup} mySelfId={user_id} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </Box>
        </Box>
    );
}

export default Chat;
