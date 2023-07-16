import './Shop.css';
import Book from '../Book';
import Navigation from '../Navigation';
import { useEffect, useState } from 'react';

export default function Shop() 
{
    const API = 'http://localhost:8080/api/books';
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch(API).then(response => { 
            if(response.ok) { 
                return response.json();
            }
            throw response;
        }).then(data => {
            setBooks(data);
        }).catch(error => {
            console.error(error);
        })
    }, [books]);

    return (<>
    <Navigation />
    <div className='search-container'>
        <input className='searchbar' type='text' placeholder='Search'/>

        <div className='search-criteria'>
            <h3>Search by:</h3>
            <input type="checkbox" id="genre" name="genre" />
            <label for="genre">Genre</label>
            <input type="checkbox" id="author" name="author" />
            <label for="author">Author</label>
            <input type="checkbox" id="title" name="title" />
            <label for="title">Title</label>

            <h3>Sort by:</h3>
            <input type="checkbox" id="priceh" name="priceh" />
            <label for="priceh">Price (high-low)</label>
            <input type="checkbox" id="pricel" name="pricel" />
            <label for="pricel">Price (low-high)</label>
            <input type="checkbox" id="title_s" name="title_s" />
            <label for="title_s">Title (a-z)</label>
        </div>
    </div>

    <div className='shop-display'>
        {books.map((book, k)=>
        <Book key={k}
            title={book.title}
            author={book.author}
            cover={book.coverURL}
            rating={book.rating}
            price={book.price}
            isbn={book.isbn}
            desc={book.desc}
            genre={book.genre}
        />
    )}</div>
    </>);
}

