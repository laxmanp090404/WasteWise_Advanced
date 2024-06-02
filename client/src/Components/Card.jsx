import React, { useState } from 'react'
//SAMPLE COMPONENT IRRELEVANT FOR THE APPLICATION
const Card = () => {
    const name = "Vinayaga Center"
  const binlevel = 69
  const [binreq,setBinReq] = useState(0);
  const role ="user"
  return (
    <div className='flex items-center justify-center'>
        {
        role ==="admin"?(<div className='border-2 w-[250px] rounded-lg pb-5 flex flex-col items-center justify-center space-y-4 '>
          <p className='bg-green-600 text-white w-full h-[3rem]  text-xl rounded-t-lg flex items-center justify-center'><span>{name}</span></p>
          <div className="details flex flex-col space-y-3 items-center justify-center">
              <p className='text-5xl'>{binlevel}</p>
              <p className='text-green-400'>Total Capacity in Kgs</p>
              <button className='text-lg hover:bg-[#f05656] bg-[#ee3a3a] px-5 py-2 rounded-xl text-white'>Delete Center</button>
          </div>
        </div>):(<div className='border-2 w-[250px] rounded-lg pb-5 flex flex-col items-center justify-center space-y-4 '>
        <p className='bg-green-600 text-white w-full h-[3rem]  text-xl rounded-t-lg flex items-center justify-center'><span>{name}</span></p>
          <div className="details flex flex-col space-y-3 items-center justify-center">
              <p className='text-5xl'>{binlevel}</p>
              <p className='text-green-400'>Total Capacity in Kgs</p>
            
              <p className='text-5xl'>{binreq}</p>
              <input type='range' className='w-full bg-green-700' min={1} max={binlevel} value={binreq} onChange={(e)=>{setBinReq(e.target.value)}}/>
              <p className='text-green-700'>Required Capacity in Kgs</p>
              <button className='text-lg text-white hover:bg-[#f05656] bg-[#ee3a3a] px-5 py-2 rounded-xl'>Book Center</button>
          </div>
        </div>)
        }
    </div>
  )
}

export default Card