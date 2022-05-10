import React from 'react';
import './Message.css';


const Message = ({ message: { message, user } ,isSentByCurrentUser}) => {
    
    return (
        <div className={` p-3 mb-2 rounded-3 ms-2 message--content ${isSentByCurrentUser ? 'bg-primary bg-gradient' : 'bg-dark'}`}>
            <span className='text-white'>
                {message}
            </span>
        </div>
    );
}

export default Message;