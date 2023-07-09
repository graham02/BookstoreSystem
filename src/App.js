import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './UserHome/Home';
import ErrorPage from './ErrorPage';
import Login from './Register/Login';
import Signup from './Register/Signup';
import ForgotPassword from './Register/ForgotPassword';
import Admin from './AdminHome/Admin';
import AddBook from './AdminHome/AddBook';
import RemoveBook from './AdminHome/RemoveBook';
import Remove from './AdminHome/Remove';
import UpdateBook from './AdminHome/UpdateBook';
import Update from './AdminHome/Update';
import AccountPage from './Account/AccountPage';
import OrderHistory from './Account/OrderHistory';
import Shop from './Shop/Shop';
import View from './Shop/View';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/Shop' element={<Shop/>} />
        <Route path='/View/:id' element={<View/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword/>} />
        <Route path='/Account' element={<AccountPage/>} />
        <Route path='/Account/OrderHistory' element={<OrderHistory/>} />
        <Route path='/Admin' element={<Admin/>} />
        <Route path='/Admin/ManageBooks/Add' element={<AddBook/>} />
        <Route path='/Admin/ManageBooks/Remove' element={<RemoveBook/>} />
        <Route path ='Admin/ManageBooks/RemoveBook/:isbn' element={<Remove/>}/>
        <Route path ='Admin/ManageBooks/UpdateBook/:isbn' element={<Update/>}/>
        <Route path='/Admin/ManageBooks/Update' element={<UpdateBook/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  )
}
