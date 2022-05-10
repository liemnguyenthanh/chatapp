import { Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import fetchApi from '../../api';

import './Join.css';

export default function SignIn() {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory()
    const handleSubmit = async () => {
        let res = await fetchApi('users/login', 'post', { full_name: fullname, username })
        if(res && res.error) setError(res.error)
        if(res && res.detail && res.detail._id) {
            history.push(`/dashboard?user_id=${res.detail._id}`)
        }
    }
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                {
                    error &&
                    <Alert severity="error">
                        <AlertTitle sx={{textAlign : 'left'}}>Error</AlertTitle>
                        {error}
                    </Alert>
                }
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Full Name" className="joinInput" type="text" onChange={(event) => setFullname(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Username" className="joinInput mt-20" type="text" onChange={(event) => setUsername(event.target.value)} />
                </div>

                <button className={'button mt-20'} onClick={handleSubmit}>Sign In</button>
            </div>
        </div>
    );
}
