import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Footer = () => {
  const nav = useNavigate()
  return (
    <footer className="bg-[#1a4c1a] text-white py-8 md:py-12">
    <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-start space-y-4">
      <figure className='flex items-center space-x-2 cursor-pointer' onClick={()=>{nav('/')}}>
          <img src="/assets/logo1.png" alt="logo" className='w-[32px] h-[32px]' />
          <figcaption className='text-2xl poetsen-one-regular'>WASTE<span className='text-green-700'>WISE</span></figcaption>
        </figure>
        <p className="text-gray-300 max-w-md">
          WasteWise is a comprehensive waste management solution that helps communities reduce their environmental
          impact.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="grid gap-2">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
            View Stations
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
            Contact
          </Link>
        </div>
        
        
      </div>
    </div>
    <div className="container mx-auto px-4 md:px-6 mt-8 flex flex-col md:flex-row items-center justify-between">
      <p className="text-gray-300 text-sm">&copy; 2024 WasteWise. All rights reserved.</p>
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
          <TwitterIcon className="h-5 w-5" />
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
          <FacebookIcon className="h-5 w-5" />
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
          <InstagramIcon className="h-5 w-5" />
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white" prefetch={false}>
          <LinkedinIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer




function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function RecycleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}