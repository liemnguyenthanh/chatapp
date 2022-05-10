import { Button } from '@mui/material';
import React from 'react';
import { Input as MuiInput } from '@mui/material';
import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form--chat">
        <MuiInput
            // className="form--input"
            sx={{
                p: '15px',
                fontSize: '1.2rem',
            }}
            fullWidth
            disableUnderline
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <Button  variant='contained' className="sendButton" onClick={e => sendMessage(e)}>Send</Button>
    </form>
)

export default Input;