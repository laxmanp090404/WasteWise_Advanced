import React from 'react'

const Loader = () => {
  return (
    <div class="min-h-screen flex items-center justify-center">
       <div class="loader-wrapper">
        <div class="loader"></div>
        <div class="loader-content">
            <img src="/assets/logo1.png" alt="Loading Image"/>
            <p className='text-xl md:text-2xl '>Loading</p>
        </div>
    </div>
    </div>
  )
}

export default Loader