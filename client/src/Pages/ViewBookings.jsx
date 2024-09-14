import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();

  // Getting all the bookings for every render
  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    const res = await axios.get(import.meta.env.VITE_SERVER + "/bookings/get");
    console.log(res);
    if (res.status === 200) {
      setBookings(res.data.response);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className='h-[100vh] flex flex-col'>
        <div className='px-5 pt-4'>
          <button
            onClick={() => {
              nav('/');
            }}
            className='px-6 py-2 bg-[#163300] text-[#f9f9f9] hover:bg-[#9fe870] hover:border-[#163300] hover:text-[#163300] duration-300 border-2 border-transparent rounded-lg'
          >
            Back
          </button>
        </div>

        <div className='flex-1 flex flex-col justify-center'>
          <p className='md:text-5xl text-4xl self-center p-5'>Bookings</p>
          <div className='tablecontrol overflow-auto mx-2 border-2 rounded-xl border-b-[5px] border-r-[5px] h-[70vh]'>
            <table className='min-w-full rounded-xl hover:table-fixed leading-normal'>
              <thead>
                <tr>
                  <th className='px-5 py-3 border-b-2 border-[#097969] bg-[#9fe870] text-start md:text-lg text-sm font-semibold text-white uppercase tracking-wider'>
                    User Name
                  </th>
                  <th className='px-5 py-3 border-b-2 border-[#097969] bg-[#9fe870] text-start md:text-lg text-sm font-semibold text-white uppercase tracking-wider'>
                    Station Name
                  </th>
                  <th className='px-5 py-3 border-b-2 border-[#097969] bg-[#9fe870] text-start md:text-lg text-sm font-semibold text-white uppercase tracking-wider'>
                    Quantity Booked
                  </th>
                  <th className='px-5 py-3 border-b-2 border-[#097969] bg-[#9fe870] text-start md:text-lg text-sm font-semibold text-white uppercase tracking-wider'>
                    Station Location
                  </th>
                  <th className='px-5 py-3 border-b-2 border-[#097969] bg-[#9fe870] text-start md:text-lg text-sm font-semibold text-white uppercase tracking-wider'>
                    Booking Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, idx) => {
                  const {
                    firstName,
                    stationName,
                    quantityBooked,
                    location,
                    createdAt,
                  } = booking;
                  return (
                    <tr key={idx}>
                      <td className='px-5 py-4 border-b border-gray-200 bg-white text-sm md:text-lg'>
                        {firstName}
                      </td>
                      <td className='px-5 py-4 border-b border-gray-200 bg-white text-sm md:text-lg'>
                        {stationName}
                      </td>
                      <td className='px-5 py-4 border-b border-gray-200 bg-white text-sm md:text-lg'>
                        {quantityBooked}
                      </td>
                      <td className='px-5 py-4 border-b border-gray-200 bg-white text-sm md:text-lg'>
                        {location}
                      </td>
                      <td className='px-5 py-4 border-b border-gray-200 bg-white text-sm md:text-lg'>
                        {new Date(createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBookings;
