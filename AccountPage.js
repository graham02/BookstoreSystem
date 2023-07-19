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
        axios.get(API + "customer", // Check for customer
            {
                params: { token: localStorage.getItem(key) || sessionStorage.getItem(key) }
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
                params: {
                    token: localStorage.getItem(key) || sessionStorage.getItem(key)
                }
            }).then((res) => {
            // console.log(res.data);
            sessionStorage.setItem("username", res.data.name);
            sessionStorage.setItem("password", res.data.password);
            sessionStorage.setItem("email", res.data.email);
            sessionStorage.setItem("phoneNumber", res.data.phoneNumber);
            sessionStorage.setItem("street", res.data.address.street);
            sessionStorage.setItem("city", res.data.address.city);
            sessionStorage.setItem("state", res.data.address.state);
            sessionStorage.setItem("zipcode", res.data.address.zipcode);
            sessionStorage.setItem("cardName", res.data.paymentCards.cardOwner);
            sessionStorage.setItem("cardDate", res.data.paymentCards.expDate);
            sessionStorage.setItem("cardNum", res.data.paymentCards.cardNumber);

        });




    }, [navigate])
    ////////////////////////////////////////////////////////////////

    const [editInfo, setEditInfo] = useState(false);
    const [editPaym, setEditPaym] = useState(false);
    const [addPaym, setAddPaym] = useState(false);
    const [paymButton, setPaymButton] = useState(false);
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
        e.preventDefault();
        setEditInfo(false);
        /* Don't know why this won't work, but the monstrosity of a string down a few lines works instead?
        axios.post("http://localhost:8080/api/edit-personal", {
            params: {
                // token: localStorage.getItem(key) || sessionStorage.getItem(key),
                token: sessionStorage.getItem(key),
                name: e.target.name.value,
                phoneNumber: e.target.phoneNumber.value
            }
        })
        */
        axios.post("http://localhost:8080/api/edit-personal?token=" + sessionStorage.getItem(key) + "&name=" + e.target.name.value + "&phoneNumber=" + e.target.phoneNumber.value);
    }

    function changeAddr(e) {
        e.preventDefault();
        setEditAddr(false);
        axios.post("http://localhost:8080/api/edit-address?token=" + sessionStorage.getItem(key) + "&street="
            + e.target.street.value + "&city=" + e.target.city.value + "&state=" + e.target.state.value + "&zipcode=" + e.target.zipcode.value);
    }
    function newPaym(e) {
        e.preventDefault();
        setPaymButton(false);
        setAddPaym(false);
        axios.post("http://localhost:8080/api/add-card?token=" + sessionStorage.getItem(key) + "&cardName="
        + e.target.cardName.value + "&cardNumber=" + e.target.cardNum.value + "&cardDate=" + e.target.cardDate.value + "&cvv=" + e.target.cvv.value);
    }
    function changePaym(e) {
        e.preventDefault();
        setPaymButton(false);
        setEditPaym(false);
        axios.post("http://localhost:8080/api/edit-card?token=" + sessionStorage.getItem(key) + "&cardName="
            + e.target.cardName.value + "&cardNumber=" + e.target.cardNum.value + "&cardDate=" + e.target.cardDate.value + "&cvv=" + e.target.cvv.value);
    }

    function changePswd(e) {
        e.preventDefault();
        setEditPswd(false); // Should change this so it only changes to false if the set password works.
        // axios.post("http://localhost:8080/api/change-pswd?token=" + sessionStorage.getItem(key) + "&pass=" + e.target.pass.value + "&passCon=" + e.target.passCon.value);
        axios.post("http://localhost:8080/api/change-pswd?token=" + sessionStorage.getItem(key) + "&pass=" + e.target.pass.value + "&passCon=" + e.target.passCon.value);
    }

    return (<>
        <Navigation />
        {(isAllowed) ?
            (<Card className='account-form'>
                <h1>Personal Info</h1>
                {(!editInfo) ?
                    <div>
                        <p>Name: {sessionStorage.getItem("username")}</p>
                        <p>Phone Number: {sessionStorage.getItem("phoneNumber")}</p>
                        <button className='account-edit-btn' onClick={() => setEditInfo(true)}>Edit personal info</button>
                    </div>
                    :
                    // <form onSubmit={() => setEditInfo(false), {changeInfo} }>
                    <form onSubmit={changeInfo}>
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
                    <form onSubmit={changeAddr}>
                        <input type='text' name='street' placeholder={sessionStorage.getItem("street")} />
                        <input type='text' name='city' placeholder={sessionStorage.getItem("city")} />
                        <input type='text' name='state' placeholder={sessionStorage.getItem("state")} />
                        <input type='text' name='zipcode' placeholder={sessionStorage.getItem("zipcode")} />

                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                }
                <hr />

                <h1>Payment</h1>
                {(!paymButton) ?
                    <div>
                            <p>{sessionStorage.getItem("cardName")}</p>
                            <p>{sessionStorage.getItem("cardNum")}</p>
                            <p>Exp: {sessionStorage.getItem("cardDate")}</p>
                        <div className='payment-opts'>
                            <button className='account-edit-btn add-pay' onClick={() => setEditPaym(true)}>Edit payment method</button>
                            <button className='account-edit-btn add-pay' onClick={() => setAddPaym(true)}>Add payment method</button>
                        </div>
                    </div>
                    :
                    <p/>
                }
                {(editPaym) ?
                    <form onSubmit={changePaym}>
                        <input type='text' name='cardName' placeholder={sessionStorage.getItem("cardName")} />
                        <input type='text' name='cardNum' placeholder={sessionStorage.getItem("cardNum")} />
                        <input name='cardDate' type='text' placeholder={sessionStorage.getItem("cardDate")} />
                        <input name='cvv' type='text' placeholder='CVV' />

                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                    :
                    <p/>
                }
                {(addPaym) ?
                    <form onSubmit={newPaym}>
                        <input type='text' name='cardName' placeholder='Name of card owner' />
                        <input type='text' name='cardNum' placeholder='Card Number' />
                        <input name='cardDate' type='text' placeholder='Expiration date' />
                        <input name='cvv' type='text' placeholder='CVV' />

                        <button className='account-edit-btn' type='submit'>Save</button>
                    </form>
                    :
                    <p/>
                }



                <hr />

                <h1>Password</h1>
                {(!editPswd) ?
                    <div>
                        <button className='account-edit-btn' onClick={() => setEditPswd(true)}>Change Password</button>
                    </div>
                    :
                    <form onSubmit={changePswd}>
                        <input type='text' name='pass' placeholder='New Password (6+ characters)' />
                        <input type='text' name='passCon' placeholder='Confirm Password' />
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
