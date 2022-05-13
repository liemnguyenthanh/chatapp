import { Box } from '@mui/material';
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
const Messages = ({ messagesGroup, mySelfId }) => {

    return (
        <ScrollToBottom className="messages px-3">
            {messagesGroup.length > 0  && messagesGroup.map((item, i) =>{
                let isSentByCurrentUser = false;
                
                if (item.info === mySelfId) {
                    isSentByCurrentUser = true;
                }
                return (
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                        }}
                        key={item.key}
                        >
                        {
                            !isSentByCurrentUser &&
                            <RenderAvatar url={item.info}/>
                        }  
                        <Box 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                ...(isSentByCurrentUser ? { justifyContent: 'flex-end', width: '100%'} : { width: 'calc(100% - 100px)'})
                            }}
                        >
                        {
                            item.messages.length && item.messages.map(mes => (
                                <Box key={mes.message_id} className={`d-flex ${isSentByCurrentUser ? "justify-content-end" :''}`} 
                                    sx={{
                                        display: 'flex',
                                        ...(isSentByCurrentUser && { justifyContent: 'flex-end'}),
                                    }}
                                >
                                    <Message message={mes} isSentByCurrentUser={isSentByCurrentUser}/>
                                </Box>
                            ))
                        }
                        </Box>
                    </Box>
                )
            }
                
            )}
        </ScrollToBottom>
    )
}

export default Messages;
