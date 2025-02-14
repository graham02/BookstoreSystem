import './View.css';
import Card from '../Card';
import Navigation from '../Navigation';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function View(props)
{
    const [cart, setCart] = useState(0);
    const { 
        book = {
            title : "Title",
            desc : "This is a book description temporary placeholder.",
            author : "First Last",
            genre : "Genre",
            cover : "",
            rating : 0.0,
            price : 0.00,
            isbn: "000"
        }
    } = useLocation().state;
    function handleCart() {
        setCart(cart + 1);
    }

    return (<>
    <Navigation cart={cart}/>
    <div className='view-page'>
        <Card className='view-details'>
            <h1>{book.title} [{book.rating} / 5⭐]</h1>
            <h2>By: {book.author}</h2>
            <hr className='top-hr'/>

            <p>{book.desc}</p>
            <p><br/><br/><b>ISBN:</b> {book.isbn}</p>
            <p><b>Genre:</b> {book.genre}</p>

            <hr className='top-hr bottom-hr'/>
            <h3>${book.price}</h3>
            <button onClick={handleCart}>Add to Cart</button>
        </Card>
        <div className='view-main'>
            <img src={book.cover} alt={book.title}></img>
        </div>
    </div>
    </>);
}
