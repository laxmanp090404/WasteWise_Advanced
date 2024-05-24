import React from 'react';
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="relative w-full h-screen bg-[url('https://www.shutterstock.com/image-photo/cityscape-office-buildings-modern-corporate-600nw-1935450535.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 container mx-auto flex h-full items-center justify-center px-4 py-12 md:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl grid-cols-1 items-center rounded-lg bg-white shadow-xl md:grid-cols-2">
          <div className="hidden md:block bg-gray-300 h-full rounded-s-md">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-4922762-4097209.png"
              width="500"
              height="500"
              alt="Sign Up"
              className="h-full w-full object-cover"
              style={{ aspectRatio: '500 / 500', objectFit: 'cover' }}
            />
          </div>
          <div className="p-6 md:p-10">
            <div className="mx-auto max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-gray-500 dark:text-gray-400">Create your account to get started.</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="first-name"
                    >
                      First Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="first-name"
                      placeholder="Srinivas"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="last-name"
                    >
                      Last Name
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="last-name"
                      placeholder="S"
                      required
                    />
                  </div>
                </div>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="mobile"
                    >
                      Mobile Number
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="mobile"
                      placeholder="1212121212"
                      required
                      type="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      id="location"
                      placeholder="Kondampatty, Coimbatore"
                      required
                    />
                  </div>
                </div>
                <button
                  className=" bg-black text-white hover:bg-gray-900 duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset- h-10 px-4 py-2 w-full"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <label className="m-4">Already Have an account? <span><Link to={"/login"}>Login</Link></span></label>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
