import './OrderHistory.css';
import Order from './Order';
import Navigation from '../Navigation';

export default function OrderHistory() 
{
    const dummy_data = [
        {
            orderid : 1,
            date : "0/0/0000",
            total : 50,
            books : [
                {
                    title : "BookA",
                    author : "John Doe",
                    cover : "https://s26162.pcdn.co/wp-content/uploads/2018/02/gatsby-original2.jpg",
                    rating : 5,
                    price : 12.99,
                    isbn: "000-000"
                },
                {
                    title : "BookA",
                    author : "John Doe",
                    cover : "https://s26162.pcdn.co/wp-content/uploads/2018/02/gatsby-original2.jpg",
                    rating : 5,
                    price : 12.99,
                    isbn: "000-000"
                },
                {
                    title : "BookA",
                    author : "John Doe",
                    cover : "https://s26162.pcdn.co/wp-content/uploads/2018/02/gatsby-original2.jpg",
                    rating : 5,
                    price : 12.99,
                    isbn: "000-000"
                }
            ]
        },
        {
            orderid : 2,
            date : "0/0/0000",
            total : 60,
            books : [
                {
                    title : "BookB",
                    author : "John Doe",
                    cover : "https://s26162.pcdn.co/wp-content/uploads/2018/02/gatsby-original2.jpg",
                    rating : 5,
                    price : 17.99,
                    isbn: "000-000"
                }
            ]
        }
    ]

    return (<>
    <Navigation />
    <div className='order-display'>
        {dummy_data.map((order, k)=>
        <Order key={k}
            id={order.orderid}
            total={order.total}
            date={order.date}
            books={order.books}
        />
        )}
    </div> 
    </>);   
}
