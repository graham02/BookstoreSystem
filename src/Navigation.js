import './Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Nagivation()
{
    const [ loggedIn, setLoggedIn ] = useState(false);
    const navigate = useNavigate();

    function logout() {
        navigate('/');
        setLoggedIn(!loggedIn);
    }

    return (<>
    <div className='nav-bar'>
        <p className='home-button'>
            <Link className='nav-link' to='/'>Home</Link>
        </p>
        <ul>
            <li key='shop'>
                <Link className='nav-link' to='/Shop'>Shop</Link>
            </li>
            <li className='cart' key='cart'>
                <Link className='nav-link' to='/Cart'>Cart</Link>
                <span className='cart-count'>2</span>
            </li>

            {(loggedIn) ? 
                <>
                <li key='account'>
                    <Link className='nav-link' to='/Account'>Account</Link>
                </li>
                <li key='logout'>
                    <button className='nav-button' onClick={logout}>Logout</button>
                </li>
                </>    
                :
                <>
                <li key='login'>
                    <Link className='nav-link' to='/Login'>Login</Link>
                </li>
                <li key='signup'>
                    <Link className='nav-link' to='/Signup'>Signup</Link>
                </li>
                </>
            }
        </ul>
    </div>
    <div className='banner'>
        <h1>Bookstore</h1>
    </div>
    </>);
}
