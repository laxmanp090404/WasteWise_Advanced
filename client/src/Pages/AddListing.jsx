import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios'

const Addlisting = () => {
  const nav = useNavigate();
  const [name,setName] = useState("");
  const [location,setLocation] = useState("")
  const [binlevel,setBinLevel] = useState(0)
  
  const addlisting = async () => {
     try {
      const res =await axios.post(import.meta.env.VITE_SERVER+"/stations/create",{
        name,location,binlevel
       })
       if(res.status === 201){
          toast.success(res.data.message);
       }
       else{
        toast.error(res.data.message);
       }
     } catch (error) {
       toast.error(error.response.data.message)
     }
    
  }
  
  return (
    <>
    <Toaster/>
    <div className='bg-[#9fe870]'>
      <div className='px-5 pt-2'>
        <button onClick={() => { nav("/") }} className='px-6 py-2 bg-[#163300] text-[#f9f9f9] hover:bg-[#9fe870] hover:border-[#163300] hover:text-[#163300] duration-300 border-2 border-transparent rounded-lg'>Back</button>
      </div>
      <div className='bg-inherit min-w-screen min-h-screen flex flex-col md:flex-row items-center  justify-between px-[20vh] md:space-x-[2rem] space-y-4 '>

        <section className='text md:w-1/3'>
          <p className='text-[#163300]  text-wrap md:text-[3rem] text-[2rem]'>Managing waste shouldn't be a <span className='text-white md:text-[3.5rem] text-[2.5rem]'>burden</span><br></br> It should be a  <span className='text-white md:text-[3.5rem] text-[2.5rem]'>breeze</span></p>
        </section>
        <section className='card flex flex-col md:w-[550px] md:h-[620px] w-[350px] h-[580px] gap-10 justify-center bg-white items-center rounded-xl px-4'>
          <p className="text-2xl font-bold">Add Listing</p>
          <input type="text" value={name} placeholder="Centre Name" onChange={(e)=>{setName(e.target.value)}} className=" text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
          <input type="text" value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder="Location" className="text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
          <input type="number" value={binlevel} onChange={(e)=>{setBinLevel(e.target.value)}} min={0} placeholder="Capacity(in kgs)" className="text-lg w-full font-bold  py-5 px-2 rounded-lg border-2 border-gray-600 active:border-6 duration-200 active:border-gray-950" />
          <button onClick={addlisting} className="bg-[#9fe870] w-full p-4 rounded-full hover:bg-[#163300] hover:text-[#9fe870] duration-500">Add Listing</button>

        </section>
      </div>
    </div>
    </>
  );
}

export default Addlisting;