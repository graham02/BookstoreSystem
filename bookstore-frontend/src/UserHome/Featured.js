import './Featured.css'
import Book from '../Book';

export default function Featured(props)
{
    const dummy_data = {
        'Featured' : [
            {
                title : "The Great Gatsby",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "F-Scott Fitzgerald",
                cover : "https://s26162.pcdn.co/wp-content/uploads/2018/02/gatsby-original2.jpg",
                rating : 4.3,
                price : 7.99,
                isbn: "000-000"
            },
            {
                title : "Invisible Man",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Ralph Ellison",
                cover : "https://s26162.pcdn.co/wp-content/uploads/2018/10/invisibleman-1509049531-640x996.jpg",
                rating : 4.5,
                price : 10.99,
                isbn: "000-001"
            },
            {
                title : "Fahrenheit 451",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Ray Bradbury",
                cover : "https://s26162.pcdn.co/wp-content/uploads/2021/10/lf-1-1.jpg",
                rating : 3.7,
                price : 11.99,
                isbn: "000-002"
            },
            {
                title : "To Kill a Mockingbird",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Harper Lee",
                cover : "https://s26162.pcdn.co/wp-content/uploads/2021/10/To_Kill_a_Mockingbird_first_edition_cover.jpg",
                rating : 4.2,
                price : 12.99,
                isbn: "000-003"
            },
            {
                title : "Kindred",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Ocatvia E. Butler",
                cover : "https://m.media-amazon.com/images/I/91pIF5zxBVL._AC_UF1000,1000_QL80_.jpg",
                rating : 4.6,
                price : 17.99,
                isbn: "000-004"
            }
        ],
        'Top Sellers' : [
            {
                title : "Five Survive",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Holly Jackson",
                cover : "https://storage.googleapis.com/du-prd/books/images/9780593374160.jpg",
                rating : 4.1,
                price : 12.99,
                isbn: "000-005"
            },
            {
                title : "Solitaire",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Alice Oseman",
                cover : "https://storage.googleapis.com/du-prd/books/images/9781339016238.jpg",
                rating : 4.3,
                price : 11.99,
                isbn: "000-006"
            },
            {
                title : "Divine Rivals",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Rebecca Ross",
                cover : "https://storage.googleapis.com/du-prd/books/images/9781250857439.jpg",
                rating : 4.7,
                price : 17.99,
                isbn: "000-007"
            },
            {
                title : "The first to Die at the End",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Adam Silvera",
                cover : "https://storage.googleapis.com/du-prd/books/images/9780063240803.jpg",
                rating : 4.4,
                price : 10.99,
                isbn: "000-008"
            },
            {
                title : "Lightlark",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Alex Aster",
                cover : "https://storage.googleapis.com/du-prd/books/images/9781419760860.jpg",
                rating : 3.9,
                price : 15.99,
                isbn: "000-009"
            },
            {
                title : "Warrior Girl Unearthed",
                desc : "This is a book description temporary placeholder.",
                genre : "Young Adult",
                author : "Angeline Boulley",
                cover : "https://storage.googleapis.com/du-prd/books/images/9781250766588.jpg",
                rating : 4.6,
                price : 14.99,
                isbn: "000-010"
            }
        ],
    }

    return (
    <div className='featured-display'>
        {dummy_data[props.cat].map((book, k)=>
        <Book key={k}
            title={book.title}
            author={book.author}
            cover={book.cover}
            rating={book.rating}
            price={book.price}
            isbn={book.isbn}
            desc={book.desc}
            genre={book.genre}
        />
    )}</div>
    );
}
