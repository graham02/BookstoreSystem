import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Password from 'react-better-password';
import Card from '../Card';
import Navigation from '../Navigation';

export default function Login()
{
    const navigate = useNavigate();

    return (<>
    <Navigation/>
    <Card className='login-page'>
        <form onSubmit={()=>navigate('/')}>
            <div>
                <label>Email:</label>
                <input type='text'/>
            </div>
            <div>
                <label>Password:</label>
                <Password/>
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
