import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages  from '../Messages/Messages';
import Input from '../Input/Input';

import './Chat.css';
import { convertMessagesList } from "../../utils";
import Sidebar from "../Sidebar/Sidebar";

const ENDPOINT = 'http://localhost:8080';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);

        setRoom(room);
        setName(name)

        socket.emit('JOIN_ROOM', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('NEW_MESSAGE', message => {
            setMessages(pre => [...pre, message]);
        });

        socket.on("ROOM_DATA", ({ users }) => {
            setUsers(users);
        });
    }, []);


    useEffect(() => {
        if(messages){
            let new_list = convertMessagesList(messages)
            setMessagesGroup(new_list)
        }
    }, [messages])
    
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('SEND_MESSAGE', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <Sidebar />
            <div className="container-chat">
                <Messages messagesGroup={messagesGroup} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;
