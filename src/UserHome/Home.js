import './Home.css';
import Navigation from '../Navigation';
import Featured from './Featured';

export default function Home()
{
    return (<>
        <Navigation/>
        <div className='user-home'>    
            <div className='featured-section'>
                <h1>Featured</h1>
                <hr></hr>
                <div>
                    <Featured cat='Featured'/>
                </div>
            </div>
            <div className='featured-section'>
                <h1>Top Sellers</h1>
                <hr></hr>
                <div>
                    <Featured cat='Top Sellers'/>
                </div>
            </div>
        </div>
    </>);
}   