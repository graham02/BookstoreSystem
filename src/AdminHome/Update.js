import './Update.css';
import AdminMenu from './AdminMenu';
import Card from '../Card';
import { useNavigate } from 'react-router-dom';

export default function Remove(props) 
{
    const navigate = useNavigate();

    return (<>
    <AdminMenu/>
    <Card className='book-upd-form'>
        <h1>Updating _______</h1>

        <div>
            <form onSubmit={()=>navigate('/Admin/ManageBooks/Update')}>
                <h2>Enter New Book Details</h2>
                <input type='text' placeholder='Title'/>
                <input type='text' placeholder='ISBN'/>
                <input type='text' placeholder='Genre'/>
                <input type='text' placeholder='Author'/>
                <input type='text' placeholder='Cover URL'/>
                <input type='text' placeholder='Description'/>
                <input type='text' placeholder='Rating'/>
                <input type='text' placeholder='Price'/>
            
                <div className='upd-btn'>
                    <button type='submit'>Update</button>
                </div>
            </form>
        </div>
    </Card>
    </>);
}