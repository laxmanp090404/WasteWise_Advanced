import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import NoResults from '../Common/NoResults';

const Notifications = () => {
  const [bookings, setBookings] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [notif, showNotif] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const nav = useNavigate();

  const fetchUserBookings = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER + "/bookings/getuserbookings");
      if (res.status === 200) {
        setBookings(res.data.response);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error fetching bookings. Try reloading.");
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_SERVER + "/notifications/getnotifs");
      if (res.status === 200) {
        setNotifications(res.data.notifs);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error fetching notifications. Try reloading.");
    }
  };

  useEffect(() => {
    fetchUserBookings();
    fetchNotifications();
  }, []);

  const timeAgo = (input) => {
    const date = (input instanceof Date) ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = [
      ['years', 3600 * 24 * 365],
      ['months', 3600 * 24 * 30],
      ['weeks', 3600 * 24 * 7],
      ['days', 3600 * 24],
      ['hours', 3600],
      ['minutes', 60],
      ['seconds', 1],
    ];
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;

    for (const [rangeType, rangeVal] of ranges) {
      if (rangeVal < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / rangeVal;
        return formatter.format(Math.round(delta), rangeType);
      }
    }
  };

  return (
    <div>
      <Toaster />
      <button onClick={() => { nav("/") }} className='mx-10 my-5 px-6 py-2 bg-[#163300] text-[#f9f9f9] hover:bg-[#9fe870] hover:border-[#163300] hover:text-[#163300] duration-300 border-2 border-transparent rounded-lg'>Back</button>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-4xl m-10'>Your Bookings</p>
        <div className='min-h-screen m-5 w-[420px] sm:w-auto'>
          {bookings == null ? (
            <div className="loader-wrapper">
              <div className="loader"></div>
              <div className="loader-content">
                <img src="/assets/logo1.png" alt="Loading Image" />
                <p className='text-xl md:text-2xl '>Loading</p>
              </div>
            </div>
          ) : (
            <>
            {
              bookings.length === 0?(
                <NoResults/>
              ):(
                <div className="tablecontainer overflow-x-auto border-4 rounded-xl">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Station Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity Booked</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>

                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking, index) => {
                    const { stationName, quantityBooked, location,createdAt } = booking;
                    return (
                      <tr key={index} className='rounded-xl'>
                        <td className={index % 2 === 0 ? "px-5 py-5 border-b border-gray-200 bg-white text-md md:text-lg" : "px-5 py-5 border-b border-gray-200 bg-[#e8f7dd] text-md md:text-lg"}>{stationName}</td>
                        <td className={index % 2 === 0 ? "px-5 py-5 border-b border-gray-200 bg-white text-md md:text-lg" : "px-5 py-5 border-b border-gray-200 bg-[#e8f7dd] text-md md:text-lg"}>{quantityBooked}</td>
                        <td className={index % 2 === 0 ? "px-5 py-5 border-b border-gray-200 bg-white text-md md:text-lg" : "px-5 py-5 border-b border-gray-200 bg-[#e8f7dd] text-md md:text-lg"}>{location}</td>
                        <td className={index % 2 === 0 ? "px-5 py-5 border-b border-gray-200 bg-white text-md md:text-lg" : "px-5 py-5 border-b border-gray-200 bg-[#e8f7dd] text-md md:text-lg"}>{new Date(createdAt).toLocaleString()}</td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
              )
            }
            
            </>
          )}
        </div>
      </div>
      <div className='min-h-screen min-w-full flex flex-col items-center space-y-10 bg-opacity-30 notification-container'>
        <p className='text-4xl my-10'>Your Notifications</p>
        {notifications == null ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
            <div className="loader-content">
              <img src="/assets/logo1.png" alt="Loading Image" />
              <p className='text-xl md:text-2xl '>Loading</p>
            </div>
          </div>
        ) : (
          <>
            {notifications.length === 0 ? (
              <NoResults/>
            ) : (
              <div className="notifcontainer relative">
                {notifications.map((notification, index) => {
                  const { status, createdAt, message, _id } = notification;
                  return (
                    <div key={index} className='md:text-lg text-md flex w-[80vw] bg-[#e2ffe7] hover:bg-[#ccf6d3] duration-300 ease-out m-5 px-[1vw] py-[1vh] rounded-lg justify-between'>
                      <div className="container1 flex gap-4">
                        <div className='notifcontainer'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12 p-3 rounded-full bg-green-400 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                          </svg>
                        </div>
                        <div className='texts'>
                          <p>New Message Received</p>
                          <p className='text-green-500'>Not Yet read. Click to Know More</p>
                        </div>
                      </div>
                      <div className="container2 flex flex-col gap-4">
                        <p className='text-sm'>{timeAgo(createdAt)}</p>
                        <button className='self-end' onClick={() => { showNotif(true); setSelectedMessage(message); }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
                {notif && (
                  <div className='absolute top-0 bg-opacity-60 bg-white w-full h-full'>
                    <div className='flex items-center justify-center'>
                      <div className='modal p-[4vh] bg-white w-[90vw] md:w-[30vw] h-[40vh] shadow-xl rounded-xl border-2'>
                        <p className='md:ml-[25vw] ml-[20vh] cursor-pointer' onClick={() => { showNotif(false); }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </p>
                        <p className='my-[7vh] mx-[2vh] text-xl'>{selectedMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
