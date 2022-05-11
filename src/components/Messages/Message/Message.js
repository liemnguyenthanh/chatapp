import { Box } from '@mui/material';
import React from 'react';
import './Message.css';


const Message = ({ message: { message, user } ,isSentByCurrentUser}) => {
    return (
        <Box className={` p-3 mb-2 rounded-3 ms-2`}
            sx={{
                ...(isSentByCurrentUser ? {bgcolor: 'primary.light', color: '#fff'} : {bgcolor: 'background.container'}),
                
                // bgcolor: 'primary.light',
            }}
        >
            <Box component='span'>
                {message}
            </Box>
        </Box>
    );
}

export default Message;