import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './Stores/Store';
import App from './App';
import './index.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Body from './Components/Body';
import AddListing from './Pages/AddListing';
import Notifications from './Pages/Notifications';
import EditProfile from './Pages/EditProfile';
import Home from './Pages/Home';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ,{
        path:"/",
        element:<Home/>
      },
      {
        path: '/map',
        element: <Body />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },{
    path:"/addlisting",
    element:<AddListing/>
  },{
    path:"/notifications",
    element:<Notifications/>
  },
  {
    path:"/editprofile",
    element:<EditProfile/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>

);
