import './AccountPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation';
import Card from '../Card'

export default function AccountPage() 
{
    const [ editInfo, setEditInfo ] = useState(false);
    const [ editPaym, setEditPaym ] = useState(false);
    const [ editAddr, setEditAddr ] = useState(false);
    const [ editPswd, setEditPswd ] = useState(false);

    const dummy_data = {
        personal : {
            name : "First Last",
            number : "000-000-0000"
        },
        
        payment : {
            name : "First Last",
            card : "0000 0000 0000 0000",
            exp : "00/00",
        },

        address : {
            street1 : "Street 1",
            street2 : "Street 2",
            state : "State",
            zip : "Zip code"
        },
    }

    return (<>
    <Navigation/>
        <Card className='account-form'>
            <h1>Personal Info</h1>
            {(!editInfo) ?
                <div>
                    <p>Name: {dummy_data.personal.name}</p>
                    <p>Phone Number: {dummy_data.personal.number}</p>
                    <button className='account-edit-btn' onClick={() => setEditInfo(true)}>Edit personal info</button>
                </div>
                :
                <form onSubmit={() => setEditInfo(false)}>
                    <input type='text' placeholder='Full Name' />
                    <input type='text' placeholder='Phone Number' />

                    <button className='account-edit-btn' type='submit'>Save</button>
                </form>
            }
            <hr />

            <h1>Address</h1>
            {(!editAddr) ?
                <div>
                    <p>{dummy_data.address.street1}</p>
                    <p>{dummy_data.address.street2}</p>
                    <p>{dummy_data.address.state}, {dummy_data.address.zip}</p>
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
        </Card>
    </>);
}

