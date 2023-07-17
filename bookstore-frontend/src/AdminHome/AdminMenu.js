import './AdminMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Nagivation()
{  
    const key = 'auth';
    const navigate = useNavigate();
    const [admin, setAdminStatus] = useState(false);

    const API = 'http://localhost:8080/exists/admin';


    function checkAdminStatus() {
        axios.get(API, 
            { params: {token: localStorage.getItem(key) || sessionStorage.getItem(key)}
        }).then((res) => {
            console.log("You're an admin!");
            setAdminStatus(true);
        }).catch((err) => {
            console.log(err);
            setAdminStatus(false);
            navigate(-1);
        });
    }
    
    // eslint-disable-next-line
    useEffect(checkAdminStatus, []);

    return admin ?(<>
    <div className='nav-bar'>
        <p className='home-button'>
            <Link className='nav-link' to='/Admin'>Home</Link>
        </p>
        <p>
            <button className='nav-button' onClick={() => {sessionStorage.removeItem(key); localStorage.removeItem(key); navigate('/')}}>Logout</button>
        </p>
    </div>
    <div className='admin-banner'>
        <h1>Admin Menu</h1>
    </div>
    </>)
    :
    (<>
        <div className='nav-bar'>
        </div>
        <div className='admin-banner'>
        <h1>Unauthorized</h1>
    </div>
    </>)
    ;
}
