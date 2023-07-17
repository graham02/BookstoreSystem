import './Login.css';
import { useState } from 'react';
import Card from '../Card';
import Navigation from '../Navigation';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword()
{
    const token = useParams();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const API = 'http://localhost:8080/api/verify-reset';
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.length < 6) {
            alert("Password too short");
            return;
        }

        axios.post(API, {
            token: token,
            password: password
        }).then((res) => {
            if(res.status === 200) {
                setMessage("Password changed");
            } else {
                alert("This shouldn't happen");
            }
        }).catch((err) => {
            setMessage("Something went wrong. Password wasn't changed.");
        })

        setIsOpen(true);
    }

    return (<>
    <Navigation/>
    <Card className='login-page'>
        {(isOpen) ?
            <div>
                <label>{message}</label>
                <div className='login-btn'>
                    <button onClick={()=>navigate('/login')}>OK</button>
                </div>
            </div>
            :
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Password:</label>
                    <input type='text' required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='login-btn'>
                    <button type='submit'>Reset Password</button>
                </div>
            </form>
        }
    </Card>
    </>);
}