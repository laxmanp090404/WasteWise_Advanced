import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser, loginState } from '../Slices/userSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_SERVER+`/user/loginuser`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true,
      });

      const result = res.data;

      if (res.status === 200) {
        toast.success(result.message);
        dispatch(addUser(result.user));
        dispatch(loginState(true));
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error('User not found');
        } else if (error.response.status === 400) {
          toast.error('Invalid credentials');
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <Toaster className="z-50"/>
      <div className="relative w-full h-screen bg-[url('/assets/bg1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto flex h-full items-center justify-center px-4 py-12 md:px-6 lg:px-8">
          <div className="grid w-full max-w-5xl grid-cols-1 items-center rounded-lg bg-white shadow-xl md:grid-cols-2">
            <div className="p-6 md:p-10">
              <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="email"
                      placeholder="example@gmail.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="password"
                      placeholder="********"
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-black text-white hover:bg-gray-900 duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset- h-10 px-4 py-2 w-full"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <label className="block mt-4 text-center">
                  Don't have an account? <span><Link to="/signup">Sign Up</Link></span>
                </label>
              </div>
            </div>
            <div className="hidden md:block bg-gray-300 h-full rounded-e-md ">
              <img
                src="/assets/loginvector.png"
                width="500"
                height="500"
                alt="Login"
                className="h-full w-full object-cover rounded-e-md"
                style={{ aspectRatio: '500 / 500', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
