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
import UpdateBook from './AdminHome/UpdateBook';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword/>} />
        <Route path='/Admin' element={<Admin/>} />
        <Route path='/Admin/ManageBooks/Add' element={<AddBook/>} />
        <Route path='/Admin/ManageBooks/Remove' element={<RemoveBook/>} />
        <Route path='/Admin/ManageBooks/Update' element={<UpdateBook/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  )
}