import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Header = ({ username, role }) => {
  const [showMenu, setShowMenu] = useState(false);
  const nav = useNavigate();

  const handleLogout = async () => {
    setShowMenu(!showMenu);
    try {
      const res = await axios.post(import.meta.env.VITE_SERVER + "/user/logoutuser");
      if (res.status === 200) {
        toast.success("Successfully logged out");
      }
    } catch (error) {
      console.log("error logging out", error);
      toast.error("Error logging out");
    }
    nav("/login");
  }
 const handleProfile = ()=>{
  nav("/editprofile")
  setShowMenu(!showMenu)
 }
 const handleNotification = ()=>{
  nav("/tonotifications")
  setShowMenu(!showMenu)
 }
 const handleAddListing = ()=>{
  nav("/addlisting")
  setShowMenu(!showMenu)
 }
  return (
    
    <>
    <Toaster/>
      <header className={role === "admin"?'bg-[#133313] text-white px-[3vh] py-[2vh] text-md flex items-center justify-between':"px-[3vh] py-[2vh] text-md flex items-center justify-between "}>
        <figure className='flex items-center space-x-2 cursor-pointer' onClick={()=>{nav('/')}}>
          <img src="/assets/logo1.png" alt="logo" className='w-[32px] h-[32px]' />
          <figcaption className='text-2xl poetsen-one-regular'>WASTE<span className='text-green-700'>WISE</span></figcaption>
        </figure>
        {role === "admin" ? (
          <div className='hidden md:block text-2xl font-extrabold '>
            <p>Admin Dashboard</p>
          </div>
        ) : (
          <div></div>
        )}
        <div className='hidden md:flex list-none gap-2 md:text-md text-sm font-bold'>
          {role === "user" ? (
            <>
              <li className='m-2 min-w-[25px] bg-[#aee67f] px-2 py-1 rounded-2xl'>User</li>
              <li className='m-2 min-w-[25px] px-2 py-1 rounded-2xl'>Admin</li>
            </>
          ) : (
            <>
              <li className='m-2 min-w-[25px] px-2 py-1 rounded-2xl'>User</li>
              <li className='m-2 min-w-[25px] bg-[#aee67f] px-2 py-1 rounded-2xl'>Admin</li>
            </>
          )}
        </div>
        <div className='flex w-1/3 justify-between'>
          <nav className='list-none items-center space-x-3 '>
            {/* <li>Home</li>
            <li>Listings</li>
            <li>Notify</li> */}
          </nav>
          <div className='relative cursor-pointer flex items-center space-x-3 text-lg md:text-xl font-bold' onClick={() => { setShowMenu(!showMenu) }}>
            <p className='hidden md:block'>{username}</p>
            <img src='/assets/user.png' alt='Profile' className='w-[32px] h-[32px]' />
          </div>
        </div>
        {showMenu && (
          <div className='absolute z-50 right-3 top-[8vh] list-none bg-[#1a4c1a] rounded-lg text-white text-md md:text-xl'>
            {role === "user" ? (
              <>
                <li onClick={handleProfile } className='p-[2vh] w-full h-full cursor-pointer hover:bg-[#133313]  rounded-t-lg'>Profile</li>
                <li onClick={handleNotification} className='p-[2vh] w-full h-full cursor-pointer hover:bg-[#133313] '>Notification</li>
                <li onClick={handleLogout} className='p-[2vh] w-full h-full cursor-pointer hover:bg-[#133313]  rounded-b-lg'>Logout</li>
              </>
            ) : (
              <>
                <li onClick={handleProfile } className='p-[2vh] w-full h-full cursor-pointer hover:bg-[#133313]  rounded-t-lg'>Profile</li>
                <li onClick={handleAddListing } className='p-[2vh] w-full h-full cursor-pointer hover:bg-[#133313] '>Add Listing</li>
                <li onClick={handleLogout} className='p-[2vh] w-full h-full cursor-pointer hover:bg-[#133313]  rounded-b-lg'>Logout</li>
              </>
            )}
          </div>
        )}
      </header>
    </>
    
  );
}

export default Header;
