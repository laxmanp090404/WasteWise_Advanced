import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Body from './Components/Body.jsx'


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Body/>
      }
    ]
  },{
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}></RouterProvider>);
