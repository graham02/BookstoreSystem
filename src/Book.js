import './Book.css';
import Card from './Card';
import { Link } from 'react-router-dom';

export default function Book(props)
{
    return (
        <Card className='book'>
            <img src={props.image} alt={props.description} className='cover-img'/>
            <h2 className='book-price'>${props.prie}</h2>
            <h2 className='book-title'>{props.title}</h2>
            <h2 className='book-author'>Author: {props.author}</h2>
            <h2 className='book-rating'>{props.rating} / 5</h2>

            <Link className='view-btn' to={`/View/${props.isbn}`} state={{isbn: props.isbn}}>
                <button className='view-btn user'>View Details</button>
            </Link>
        </Card>
    );
}