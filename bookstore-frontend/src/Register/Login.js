import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../Card';
import Navigation from '../Navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Login()
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] =  useState('');
    const API = 'http://localhost:8080/api/login';
    const key = 'auth';

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(API, {
            email: email,
            password: password
        }).then((res) => {
            if(res.status === 200) {
                sessionStorage.setItem(key, 1);
                navigate('/');
            } else {
                alert("This shouldn't happen");
            }
        }).catch((err) => {
            console.log(err);
            if(err.response.status === 403) {
                alert("Activate your account.");
            } else {
                alert("Invalid credentials");
            }
        })

    }

    return (<>
    <Navigation/>
    <Card className='login-page'>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type='email' required onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type='password' required onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Link className='login-leave' to ='/ForgotPassword'>
                Forgot password?
            </Link>
            <div className='login-btn'>
                <button type='submit'>Login</button>
            </div>
        </form>   
        <Link className='login-leave' to ='/Signup'>
            Don't have an account?
        </Link>
    </Card>
    </>);
}
