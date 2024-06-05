import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav = useNavigate();
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <button className='bg-green-700 p-4 rounded-xl text-white' onClick={()=>{nav("/map")}}>View Stations</button>
    </div>
  )
}

export default Home