import './Login.css';
import { useState } from 'react';
import Card from '../Card';
import Navigation from '../Navigation';

export default function ForgotPassword()
{
    const [isOpen, setIsOpen ] = useState(false);

    return (<>
    <Navigation/>
    <Card className='login-page'>
        {(isOpen) ?
            <div>
                <label>Email sent for associated account.</label>
                <div className='login-btn'>
                    <button onClick={()=>setIsOpen(false)}>OK</button>
                </div>
            </div>
            :
            <form onSubmit={()=>setIsOpen(true)}>
                <div>
                    <label>Email:</label>
                    <input type='text'/>
                </div>
                <div className='login-btn'>
                    <button type='submit'>Reset Password</button>
                </div>
            </form>
        }
    </Card>
    </>);
}