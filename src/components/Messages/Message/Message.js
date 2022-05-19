import { Box } from '@mui/material';
import React from 'react';
import './Message.css';


const Message = ({ message: { message, user , status} ,isSentByCurrentUser}) => {
    return (
        <Box className={` p-3 mb-2 rounded-3 ms-2`}
            sx={{
                ...(isSentByCurrentUser ? {bgcolor: 'primary.light', color: '#fff'} : {bgcolor: 'background.container'}),
                
                // bgcolor: 'primary.light',
            }}
        >
            <Box component={'div'}>
                <Box component='span'>
                    {message}
                </Box>
            </Box>
            {
                isSentByCurrentUser &&
                <Box textAlign='right'>
                    <Box component='span'  fontSize={12}>
                        {
                            status &&
                            status === 1 ? 'đang gửi' 
                                : status === 2 ? 'đã gửi' 
                                : status === 3 ? 'đã nhận' 
                                : status === 4 ? 'đã xem' 
                                : 'lỗi'
                        }
                    </Box>
                </Box>
            }
            
        </Box>
    );
}

export default Message;