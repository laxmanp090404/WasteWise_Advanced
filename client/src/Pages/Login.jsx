import React from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative w-full h-screen bg-[url('https://www.shutterstock.com/image-photo/cityscape-office-buildings-modern-corporate-600nw-1935450535.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto flex h-full items-center justify-center px-4 py-12 md:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl grid-cols-1 items-center rounded-lg bg-white shadow-xl md:grid-cols-2">
          <div className="p-6 md:p-10">
            <div className="mx-auto max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
              </div>
              <div className="space-y-4">
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
                  />
                </div>
                <button
                  className="bg-black text-white hover:bg-gray-900 duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset- h-10 px-4 py-2 w-full"
                  type="submit"
                >
                  Login
                </button>
              </div>
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
  );
}

export default Login;
