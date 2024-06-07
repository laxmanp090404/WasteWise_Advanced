  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom'
  import toast, { Toaster } from 'react-hot-toast';
  import axios from 'axios'
  import { useDispatch, useSelector } from 'react-redux';
  import { addUser, clearUser } from '../Slices/userSlice';

  axios.defaults.withCredentials = true;
  const EditProfile = () => {
    const user = useSelector((store)=>store.user.details)

    const nav = useNavigate();
    const [firstname,setFirstName] = useState(user.firstname);
    const [lastname,setLastName] = useState(user.lastname);
    const [location,setLocation] = useState(user.location)
    const [mobile,setMobile] = useState(user.mobile)
    const dispatch  = useDispatch();
    const handleUpdate = async()=>{
      try {
        const res = await axios.patch(import.meta.env.VITE_SERVER+"/user/update",{
          firstname,lastname,location,mobile
        })
        if(res.status === 200){
          toast.success(res.data.message)
          dispatch(clearUser())
          dispatch(addUser(res.data.user))
        }
        else{
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
    
    return (
      <>
      <Toaster/>
      <div className='bg-[#9fe870]'>
        <div className='px-5 py-2'>
          <button onClick={() => { nav("/") }} className='px-6 py-2 bg-[#163300] text-[#9fe870] hover:bg-[#9fe870] hover:border-[#163300] hover:text-[#163300] duration-300 border-2 border-transparent rounded-lg'>Back</button>
        </div>
        <div className='bg-inherit  min-w-screen min-h-screen flex flex-col-reverse md:flex-row items-center  justify-between px-[20vh] md:space-x-[2rem] space-y-10 '>
        <section className='card my-20 flex flex-col md:w-[550px] md:h-[620px] w-[350px] h-[600px] gap-10 justify-center bg-white items-center rounded-xl px-4'>
            <p className="text-2xl font-bold">Edit Profile</p>
            <input type="text" value={firstname} placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} className=" text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
            <input type="text" value={lastname} placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}} className=" text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
            <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder="Location" className="text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
            <input type="text" value={mobile} onChange={(e)=>{setMobile(e.target.value)}} placeholder="1212121212" className="text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
            <button onClick={handleUpdate}  className="bg-[#9fe870] px-10 mx-2 self-end p-4 rounded-full hover:bg-[#163300] hover:text-[#9fe870] duration-500">Save</button>

          </section>
          <section className='text md:w-1/3 mt-[20px]'>
            <p className='text-[#163300]  text-wrap md:text-[3rem] text-[3rem]'>Join the movement towards a <span className='text-white font-serif'>waste-free</span> future.</p>
          </section>
          
        </div>
      </div>
      </>
    );
  }

  export default EditProfile;