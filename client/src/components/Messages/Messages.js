import { nanoid } from 'nanoid';
import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const RenderAvatar = ( {url} ) =>{
    let text = url.split('')
    return (
        <div className='border d-flex align-items-center justify-content-center rounded-circle w-h-40 bg-danger bg-gradient text-white text-uppercase'>
            <span className=''>
                {text[0]}
            </span>
        </div>
    )
}
const Messages = ({ messagesGroup, name }) => {
    console.log({messagesGroup});

    return (
        <ScrollToBottom className="messages px-3">
            {messagesGroup.length > 0  && messagesGroup.map((item, i) =>{
                let isSentByCurrentUser = false;

                const trimmedName = name.trim().toLowerCase();
            
                if (item.image === trimmedName) {
                    isSentByCurrentUser = true;
                }
                return (
                    <div className='d-flex flex-row w-100'
                        key={item.key}
                        >
                        {
                            !isSentByCurrentUser &&
                            <RenderAvatar url={item.image}/>
                        }
                        
                        <div className={`d-flex flex-column ${isSentByCurrentUser ? "flex-end w-100" :'w-100-40'}`} >
                        {
                            item.messages.length && item.messages.map(mes => (
                                <div key={mes.message_id} className={`d-flex ${isSentByCurrentUser ? "justify-content-end" :''}`} >
                                    <Message message={mes} name={name} isSentByCurrentUser={isSentByCurrentUser}/>
                                </div>
                            ))
                        }
                        </div>

                    </div>
                )
            }
                
            )}
        </ScrollToBottom>
    )
}

export default Messages;
