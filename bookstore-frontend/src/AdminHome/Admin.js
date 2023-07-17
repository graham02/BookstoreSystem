import './Admin.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminMenu from './AdminMenu';
import Card from '../Card';

export default function Admin() {
    const key = 'auth';
    const [admin, setAdminStatus] = useState(false);

    const API = 'http://localhost:8080/exists/admin';

    function checkAdminStatus() {
        axios.get(API,
            {
                params: { token: localStorage.getItem(key) || sessionStorage.getItem(key) }
            }).then((res) => {
                console.log("You're an admin!");
                setAdminStatus(true);
            }).catch((err) => {
                console.log(err.response.data);
                setAdminStatus(false);
            });
    }

    // eslint-disable-next-line
    useEffect(checkAdminStatus, []);

    return (admin ? (<>
        <AdminMenu />
        <div className='admin-btns'>
            <Card className='admin-util'>
                <h1>Manage Books</h1>
                <Link to='/Admin/ManageBooks/Add' className='admin-btn'>Add Book</Link>
                <Link to='/Admin/ManageBooks/Remove' className='admin-btn'>Remove Book</Link>
                <Link to='/Admin/ManageBooks/Update' className='admin-btn'>Update Book</Link>
            </Card>

            <Card className='admin-util'>
                <h1>Manage Users</h1>
                <p>Not yet implemented.</p>
            </Card>

            <Card className='admin-util'>
                <h1>Manage Promotions</h1>
                <p>Not yet implemented.</p>
            </Card>
        </div>
    </>)
        :
        (<div className='unauthorized'>
            <h1>UNAUTHORIZED ACCESS:</h1>
            <Link to='/'>Go back to home page</Link>
        </div>)
    )
}


