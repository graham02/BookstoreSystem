import './AdminMenu.css';
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
            <Link className='nav-link' to='/Admin'>Home</Link>
        </p>
        <p>
            <button className='nav-button' onClick={logout}>Logout</button>
        </p>
    </div>
    <div className='admin-banner'>
        <h1>Admin Menu</h1>
    </div>
    </>);
}
