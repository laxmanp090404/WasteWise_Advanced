import React from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
// component to handle uploading of images by users
// to intimate the admin about the bins that are full
// client\public\assets\imageuploadvector.png
const UploadBins = () => {
  const nav = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  return (
    <div className='container min-w-screen min-h-screen px-5 flex flex-col'>
      <section className='utils flex flex-col justify-between   '>
      <button
  onClick={() => {
    scrollToTop(); // Ensure this is called before navigation
    setTimeout(() => nav(-1), 500); // Navigate back after scrolling
  }}
>
  <IoArrowBackCircle size={48} />
</button>

        <section className="headertextcontent flex flex-col items-center justify-center  p-5"><header className='main-header text-[5rem] max-w-2xl leading-none uppercase text-center font-black'>Found Waste Dumpings?</header>
          <p className='text-[1.5rem] max-w-2xl text-center font-normal pt-4'>Help us clean up our environment. Report waste dumpings and we'll take care of the rest.</p></section>
      </section>
      <section className='main-container flex  justify-center items-center'>
        <div className='upload-vector w-[30%] h-full'>
          <img src='/assets/imageuploadvector.png' alt='upload-vector' className='w-full h-full' />
        </div>
        <div className='uploadcard w-[70%] h-full bg-green-500'>fdsfsds</div>
      </section>
    </div>
  )
}

export default UploadBins