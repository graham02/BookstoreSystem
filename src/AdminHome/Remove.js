import './Remove.css';
import AdminMenu from './AdminMenu';
import Card from '../Card';
import { useNavigate } from 'react-router-dom';

export default function Remove(props) 
{
    const navigate = useNavigate();

    return (<>
    <AdminMenu/>
    <Card className='remove-page'>
        <h1>Remove _______?</h1>

        <div className='dual-btn-confirm'>
            <button className='remove-btn yes' onClick={()=>navigate('/Admin/ManageBooks/Remove')}>Yes</button>
            <button className='remove-btn no' onClick={()=>navigate('/Admin/ManageBooks/Remove')}>No</button>
        </div>
    </Card>
    </>);
}