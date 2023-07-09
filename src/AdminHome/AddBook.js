import './AddBook.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import Card from '../Card';

export default function AddBook() 
{
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    return (<>
    <AdminMenu/>
    {(confirmOpen) ? 
    <Card className='confirm-wnd'>
        <h1>Book Added</h1>
        <h2>The book was added to the system.</h2>
        <div className='confirm-btn'>
            <button onClick={()=>{setConfirmOpen(false); navigate('/Admin/ManageBooks/Add')}}>OK</button>
        </div>
    </Card>
    :
    <Card className='book-add-form'>
        <form onSubmit={()=>setConfirmOpen(true)}>
        <h2>Enter Book Details</h2>
        <input type='text' placeholder='Title'/>
        <input type='text' placeholder='ISBN'/>
        <input type='text' placeholder='Genre'/>
        <input type='text' placeholder='Author'/>
        <input type='text' placeholder='Cover URL'/>
        <input type='text' placeholder='Description'/>
        <input type='text' placeholder='Rating'/>
        <input type='text' placeholder='Price'/>
    
        <div className='confirm-btn'>
            <button type='submit'>Add Book</button>
        </div>
        </form>
    </Card>
    }
    </>);
}
