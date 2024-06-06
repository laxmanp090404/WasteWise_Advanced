import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
const Home = () => {
  const nav = useNavigate();
  return (
    <div className="w-full">
      <section className="w-full bg-[#f0f9f0] py-20 md:py-30 lg:py-35">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a4c1a]">
                Sustainable Waste Management Solutions
              </h1>
              <p className="text-lg md:text-xl text-[#4d7a4d]">
                Experience the future of waste management with our innovative services and state-of-the-art facilities.
              </p>
              <Link
                to={"/map"}
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-[#1a4c1a] text-white font-medium transition-colors hover:bg-[#133313] focus:outline-none focus:ring-2 focus:ring-[#1a4c1a] focus:ring-opacity-50"
                prefetch={false}
              >
                View Stations
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/Heroimage.jpeg"
                width="600"
                height="400"
                alt="Waste Management"
                className="w-full max-w-[500px] h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#f0f9f0] rounded-lg p-6 flex flex-col items-start gap-4">
              <MapIcon className="w-8 h-8 text-[#1a4c1a]" />
              <h3 className="text-xl font-bold text-[#1a4c1a]">Waste Drop-off Locations</h3>
              <p className="text-[#4d7a4d]">
                Find the nearest waste drop-off facility to conveniently dispose of your recyclables and hazardous
                materials.
              </p>
              <Link
                to={"/map"}
                className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-[#1a4c1a] text-white font-medium transition-colors hover:bg-[#133313] focus:outline-none focus:ring-2 focus:ring-[#1a4c1a] focus:ring-opacity-50"
                prefetch={false}
              >
                View Locations
              </Link>
            </div>
            <div className="bg-[#f0f9f0] rounded-lg p-6 flex flex-col items-start gap-4">
              <TruckIcon className="w-8 h-8 text-[#1a4c1a]" />
              <h3 className="text-xl font-bold text-[#1a4c1a]">Waste Collection Services</h3>
              <p className="text-[#4d7a4d]">
                Schedule reliable and eco-friendly waste collection for your home or business, tailored to your needs.
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-[#1a4c1a] text-white font-medium transition-colors hover:bg-[#133313] focus:outline-none focus:ring-2 focus:ring-[#1a4c1a] focus:ring-opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
            <div className="bg-[#f0f9f0] rounded-lg p-6 flex flex-col items-start gap-4">
              <RecycleIcon className="w-8 h-8 text-[#1a4c1a]" />
              <h3 className="text-xl font-bold text-[#1a4c1a]">Recycling Programs</h3>
              <p className="text-[#4d7a4d]">
                Participate in our comprehensive recycling programs to minimize waste and contribute to a greener
                future.
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-[#1a4c1a] text-white font-medium transition-colors hover:bg-[#133313] focus:outline-none focus:ring-2 focus:ring-[#1a4c1a] focus:ring-opacity-50"
                prefetch={false}
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home



function MapIcon(props) {
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
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
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


function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}