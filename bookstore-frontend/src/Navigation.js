import './Navigation.css';
import { Link } from 'react-router-dom';

export default function Nagivation(props)
{
    let loggedIn = false; // temp value to manually update for viewing account stuff

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
                <span className='cart-count'>{props.cart || 0}</span>
            </li>

            {(loggedIn) ? 
                <>
                <li key='account'>
                    <Link className='nav-link' to='/Account'>Account</Link>
                </li>
                <li key='logout'>
                    <button className='nav-button'>Logout</button>
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
