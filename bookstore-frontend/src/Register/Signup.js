import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Card from '../Card';
import Navigation from '../Navigation';
import axios from 'axios';

export default function Signup() {
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()
        if (e.target.password1.value !== e.target.password2.value) {
            alert('Passwords must match')
            return;
        }

        axios.post("http://localhost:8080/api/signup", {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password1.value,
            phoneNumber: e.target.phoneNumber.value,
            address: {
                street: e.target.street.value,
                city: e.target.city.value,
                state: e.target.state.value,
                zipcode: e.target.zipcode.value
            },
            paymentCards :[
                {
                    cardNumber: e.target.cardNumber.value,
                    cardOwner: e.target.cardOwner.value,
                    expDate: e.target.expDate.value,
                    cvv: e.target.cvv.value
                }
            ]
        }).then((res) => {
            if (res.status === 200) {
                setConfirmOpen(true);
            }
        }).catch((err) => {
            console.log(err.response.data);
            alert(typeof err.response.data === 'string' ? err.response.data : "Missing fields")
        })
    }

    return (<>
        <Navigation />
        {(confirmOpen) ?
            <Card className='confirm-wnd'>
                <h1>Account Created!</h1>
                <h2>Please activate your account. An activation email was sent to your email address.</h2>
                <div className='confirm-btn'>
                    <button onClick={() => { setConfirmOpen(false); navigate('/') }}>OK</button>
                </div>
            </Card>
            :
            <Card className='signup-form'>
                <form onSubmit={handleSubmit}>
                    <h3 className='section-header'>Personal info</h3>
                    <input type='text' name='name' placeholder='Full Name' required/>
                    <input type='email' name='email' placeholder='Email' required/>
                    <input type='text' name='phoneNumber' placeholder='Phone Number' required/>

                    <h3 className='section-header'>Address</h3>
                    <input type='text' name='street' placeholder='Street Line 1' required/>
                    <input className='city' name='city' type='text' placeholder='City' required/>
                    <input className='state' name='state' type='text' placeholder='State' required/>
                    <input className='zip' name='zipcode' type='text' placeholder='Zip code' required/>

                    <h3 className='section-header'>Payment Info</h3>
                    <input type='text' name='cardOwner' placeholder='Name on Card' required/>
                    <input type='text' name='cardNumber' placeholder='Card number' required/>
                    <input className='card-date' name='expDate' type='text' placeholder='Expiration date' required/>
                    <input className='card-cvv' name='cvv' type='text' placeholder='CVV' required/>

                    <h3 className='section-header'>Password</h3>
                    <input type='password' name='password1' placeholder='Password (6+ characters)' required/>
                    <input type='password' name='password2' placeholder='Confirm Password' required/>

                    <div className='create-btn'>
                        <button type='submit'>Create Account</button>
                    </div>
                </form>

                <Link className='go-login' to='/Login'>
                    Already have an account?
                </Link>
            </Card>
        }
    </>);
}
