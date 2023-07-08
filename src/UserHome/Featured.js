import Book from '../Book';

export default function Featured(props)
{
    const dummy_data = {
        'Featured' : [
            {
                title : "BookA",
                author : "John Doe",
                cover : "https://i.pinimg.com/originals/ca/e0/d1/cae0d1cebd9112af6f9e56b40d5f03d1.jpg",
                rating : 5,
                price : 12.99,
                isbn: "000-000"
            },
            {
                title : "BookA",
                author : "John Doe",
                cover : "https://i.pinimg.com/originals/ca/e0/d1/cae0d1cebd9112af6f9e56b40d5f03d1.jpg",
                rating : 5,
                price : 12.99,
                isbn: "000-000"
            },
            {
                title : "BookA",
                author : "John Doe",
                cover : "https://i.pinimg.com/originals/ca/e0/d1/cae0d1cebd9112af6f9e56b40d5f03d1.jpg",
                rating : 5,
                price : 12.99,
                isbn: "000-000"
            },
            {
                title : "BookA",
                author : "John Doe",
                cover : "https://i.pinimg.com/originals/ca/e0/d1/cae0d1cebd9112af6f9e56b40d5f03d1.jpg",
                rating : 5,
                price : 12.99,
                isbn: "000-000"
            }
        ],
        'Top Sellers' : [
            {
                title : "BookB",
                author : "Jane Doe",
                cover : "https://i.pinimg.com/originals/ca/e0/d1/cae0d1cebd9112af6f9e56b40d5f03d1.jpg",
                rating : 4.5,
                price : 17.99,
                isbn: "000-001"
            }
        ],
    }

    return dummy_data[props.cat].map((book, k)=>
        <Book key={k}
            title={book.title}
            author={book.author}
            cover={book.cover}
            rating={book.rating}
            price={book.price}
            isbn={book.isbn}
        />
    );
}