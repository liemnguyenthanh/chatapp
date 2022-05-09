import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages  from '../Messages/Messages';
import Input from '../Input/Input';

import './Chat.css';
import { convertMessagesList } from "../../utils";
import Sidebar from "../Sidebar/Sidebar";
import { useParams } from "react-router-dom";
const ENDPOINT = 'http://localhost:8080';
let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesGroup, setMessagesGroup] = useState([]);
    const { id : room_id} =useParams()

    useEffect(() => {
        const { room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        // socket.emit('JOIN_ROOM', { name, room_id }, (error) => {
        //     if (error) {
        //         alert(error);
        //     }
        // });
    }, [ENDPOINT, room_id]);


    useEffect(() => {
       if(room_id) getListMessages(room_id)
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
        if(messages){
            let new_list = convertMessagesList(messages)
            setMessagesGroup(new_list)
        }
    }, [messages])
    
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            let new_message = {
                sender : '6278c34915a8e3b860b30f38',
                room_id : '1',
                message : message
            }
            socket.emit('SEND_MESSAGE', new_message, () => setMessage(''));
        }
    }

    const getListMessages = async( id )=>{
        await fetch(ENDPOINT + '/messages/list/'+id)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
          },
          (error) =>console.log(error)
        )
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
