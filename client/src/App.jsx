import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { addUser, loginState } from './Slices/userSlice';
import { Toaster } from 'react-hot-toast';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userDetails = useSelector(store =>store.user.details);
  useEffect(() => {
    
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/getuser`, { withCredentials: true });
        const user = response.data.user;
        if (user) {
          dispatch(addUser(user));
          dispatch(loginState(true));
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error getting user details:', error);
        navigate('/login');
      }
    };

    if (!isLoggedIn) {
      getUserDetails();
    }
  }, [dispatch, navigate, isLoggedIn]);
  const username = userDetails?.firstname || '';
  const role = userDetails?.roles?.[0] || '';
  return (
    <>
      <Toaster />
      <Header username = {username} role ={role} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
