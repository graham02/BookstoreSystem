import './AccountPage.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '../Navigation';
import Card from '../Card'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AccountPage() {
    const [isAllowed, setIsAllowed] = useState(true); // changed false to true

    ////////////////////////////////////////////////////////////////
    // Redirects user away if not logged in.
    const key = 'auth';
    const API = 'http://localhost:8080/exists/';
    const dataAPI = 'http://localhost:8080/api/accountpage/'; // My version
    const navigate = useNavigate();
    /*
    var username;
    var password;
    var email;
    var phoneNumber;
    var street;
    var state;
    var city;
    var zipcode;

    const username;
    const password;
    const email;
    const phoneNumber;
    const street;
    const state;
    const city;
    const zipcode;
    */

    // More vars
    useEffect(() => {
        // Checking session/local storage for a token and verifying it matches to someone
/*
        axios.get(API + "customer", // Check for customer
            {
                params: { token: localStorage.getItem(key) || sessionStorage.getItem(key) }
                // params: {token: "656b9f0e-d375-42b0-87ca-14e62d1f9b69"}
                // params: {name: "New Person"} // temp test line
            }).then((res) => {
                console.log(res.data);

        }).catch(() => {
                axios.get(API + "admin", // If customer didn't exist, check for admin
                    {
                        params: { token: localStorage.getItem(key) || sessionStorage.getItem(key) }
                    }).catch(() => {

                        setIsAllowed(false);
                    });
            });
        console.log("Session storage Person = "); // temp test line
        console.log(sessionStorage.getItem(key)); // temp test line
        /*
        console.log("Local storage key: ");
        console.log(localStorage.getItem(key));
        console.log("Session storage key: ");
        console.log(sessionStorage.getItem(key));
        if(!localStorage.getItem(key) && !sessionStorage.getItem(key)) {
            setIsAllowed(false);
        }
        */
        axios.get(API + "customer", // Check for customer
            {
                params: { token: localStorage.getItem(key) || sessionStorage.getItem(key) }
                // params: {token: "656b9f0e-d375-42b0-87ca-14e62d1f9b69"}
                // params: {name: "New Person"} // temp test line
            }).then((res) => {
            // console.log(res.data);

        }).catch(() => {
            axios.get(API + "admin", // If customer didn't exist, check for admin
                {
                    params: { token: localStorage.getItem(key) || sessionStorage.getItem(key) }
                }).catch(() => {

                setIsAllowed(false);
            });
        });



        axios.get("http://localhost:8080/api/profile/:" + sessionStorage.getItem("email"), // Get data of customer
            {
                //params: {: sessionStorage.getItem("email")},
                params: {
                    token: localStorage.getItem(key) || sessionStorage.getItem(key)
                }
                // token: localStorage.getItem(key) || sessionStorage.getItem(key)
                // params: {token: "656b9f0e-d375-42b0-87ca-14e62d1f9b69"}
                // params: {name: "New Person"} // temp test line
            }).then((res) => {
            console.log(res.data);
            sessionStorage.setItem("username", res.data.name);
            sessionStorage.setItem("password", res.data.password);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("phoneNumber", res.data.phoneNumber);
            sessionStorage.setItem("street", res.data.address.street);
            sessionStorage.setItem("city", res.data.address.city);
            sessionStorage.setItem("state", res.data.address.state);
            sessionStorage.setItem("zipcode", res.data.address.zipcode);
            var numOrders = 0;
            while(numOrders < res.data.completedOrders.length) {
                numOrders = numOrders + 1;
                sessionStorage.setItem("order" + numOrders, res.data.completedOrders[numOrders - 1]);
            }
            sessionStorage.setItem("numOrders", numOrders);

            // cardNumber = res.data.paymentCards[0]; // How do payment cards? An array?

        });




    }, [navigate])
    ////////////////////////////////////////////////////////////////

    const [editInfo, setEditInfo] = useState(false);
    const [editPaym, setEditPaym] = useState(false);
    const [editAddr, setEditAddr] = useState(false);
    const [editPswd, setEditPswd] = useState(false);

    const dummy_data = {
        personal: {
            name: "First Last",
            number: "000-000-0000"
        },

        payment: {
            name: "First Last",
            card: "0000 0000 0000 0000",
            exp: "00/00",
        },

        address: {
            street1: "Street 1",
            street2: "Street 2",
            state: "State",
            zip: "Zip code"
        },
    }
    function changeInfo(e) {
        axios.post("http://localhost:8080/api/edit-personal", {
            name: e.target.name.value;
            phoneNumber: e.target.phoneNumber.value;
        })
    }
    // Make similar functions for edit-password and edit-address after getting this one to work right. 

    return (<>
        <Navigation />
        {isAllowed ?
            (<Card className='account-form'>
                <h1>Personal Info</h1>
                {(!editInfo) ?
                    <div>
                        <p>Name: {sessionStorage.getItem("username")}</p>
                        <p>Phone Number: {sessionStorage.getItem("phoneNumber")}</p>
                        <button className='account-edit-btn' onClick={() => setEditInfo(true)}>Edit personal info</button>
                    </div>
                    :
                    <form onSubmit={() => setEditInfo(false)}>
                        <input type='text' name='name' placeholder={sessionStorage.getItem("username")} />
                        <input type='text' name='phoneNumber' placeholder={sessionStorage.getItem("phoneNumber")} />

                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                }
                <hr />

                <h1>Address</h1>
                {(!editAddr) ?
                    <div>
                        <p>{sessionStorage.getItem("street")}</p>
                        <p>{sessionStorage.getItem("state")}, {sessionStorage.getItem("zipcode")}</p>
                        <button className='account-edit-btn' onClick={() => setEditAddr(true)}>Edit address</button>
                    </div>
                    :
                    <form onSubmit={() => setEditAddr(false)}>
                        <input type='text' placeholder='Street Line 1' />
                        <input type='text' placeholder='Street Line 2' />
                        <input className='state' type='text' placeholder='State' />
                        <input className='zip' type='text' placeholder='Zip code' />

                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                }
                <hr />

                <h1>Payment</h1>
                {(!editPaym) ?
                    <div>
                        <p>{dummy_data.payment.name}</p>
                        <p>{dummy_data.payment.card}</p>
                        <p>Exp: {dummy_data.payment.exp}</p>
                        <div className='payment-opts'>
                            <button className='account-edit-btn add-pay' onClick={() => setEditPaym(true)}>Edit payment method</button>
                            <button className='account-edit-btn add-pay' onClick={() => setEditPaym(true)}>Add payment method</button>
                        </div>
                    </div>
                    :
                    <form onSubmit={() => setEditPaym(false)}>
                        <input type='text' placeholder='Name on Card' />
                        <input type='text' placeholder='Card number' />
                        <input className='card-date' type='text' placeholder='Expiration date' />
                        <input className='card-cvv' type='text' placeholder='CVV' />

                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                }
                <hr />

                <h1>Password</h1>
                {(!editPswd) ?
                    <div>
                        <button className='account-edit-btn' onClick={() => setEditPswd(true)}>Change Password</button>
                    </div>
                    :
                    <form onSubmit={() => setEditPswd(false)}>
                        <input type='text' placeholder='New Password (6+ characters)' />
                        <input type='text' placeholder='Confirm Password' />
                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                }
                <hr />

                <h1>Order History</h1>
                <Link to='/Account/OrderHistory' className='account-edit-btn account-link'>View</Link>
            </Card>)
            :
            (<div className='login-for-account'> 
                <br/>
                <h1>Login to view/edit account details.</h1>
            </div>)
        }

    </>);
}
