import { Box } from '@mui/material';
import React from 'react';
import './Message.css';


const Message = ({ message: { message, user }, name ,isSentByCurrentUser}) => {
    
    return (
        <Box className={` p-3 mb-2 rounded-3 ms-2 message--content ${isSentByCurrentUser ? 'bg-primary bg-gradient' : 'bg-dark'}`}>
            <Box component='span' className='text-white'>
                {message}
            </Box>
        </Box>
    );
}

export default Message;