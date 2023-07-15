import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Card from '../Card';
import Navigation from '../Navigation';

export default function Signup()
{
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (<>
    <Navigation/>
    {(confirmOpen) ? 
    <Card className='confirm-wnd'>
        <h1>Account Created!</h1>
        <h2>Please activate your account. An activation email was sent to your email address.</h2>
        <div className='confirm-btn'>
            <button onClick={()=>{setConfirmOpen(false); navigate('/')}}>OK</button>
        </div>
    </Card>
    :
    <Card className='signup-form'>
        <form onSubmit={()=>setConfirmOpen(true)}>
        <h3 className='section-header'>Personal info</h3>
        <input type='text' placeholder='Full Name'/>
        <input type='text' placeholder='Phone Number'/>

        <h3 className='section-header'>Address</h3>
        <input type='text' placeholder='Street Line 1'/>
        <input type='text' placeholder='Street Line 2'/>
        <input className='state' type='text' placeholder='State'/>
        <input className='zip' type='text' placeholder='Zip code'/>
        <input className='country' type='text' placeholder='Country'/>

        <h3 className='section-header'>Payment Info</h3>
        <input type='text' placeholder='Name on Card'/>
        <input type='text' placeholder='Card number'/>
        <input className='card-date' type='text' placeholder='Expiration date'/>
        <input className='card-cvv' type='text' placeholder='CVV'/>
            
        <h3 className='section-header'>Password</h3>
        <input type='text' placeholder='Password (6+ characters)'/>
        <input type='text' placeholder='Confirm Password'/>

        <div className='create-btn'>
            <button type='submit'>Create Account</button>
        </div>
        </form>

        <Link className='go-login' to ='/Login'>
            Already have an account?
        </Link>
    </Card>
    }
    </>);
}
