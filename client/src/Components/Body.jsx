import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Common/Loader';
import { createBooking } from '../Slices/bookingSlice';

// Custom icons
const binIcon = new Icon({
  iconUrl: "/assets/mapbinmarker.jpg",
  iconSize: [70, 70]
});

const fullBinIcon = new Icon({
  iconUrl: "/assets/filledbinmarker.png", 
  iconSize: [50, 50]
});

const centerIcon = new Icon({
  iconUrl: "/assets/CENTER_ICON.png",
  iconSize: [50, 50]
});

// Geocoding function
const geocode = async (address) => {
  if (!address) {
    console.error('No address provided for geocoding.');
    return null;
  }

  const encodedAddress = encodeURIComponent(address);
  const apiUrl = `/geocode/v1/geocode?apiKey=${import.meta.env.VITE_HERE_MAPS_API_KEY}&q=${encodedAddress}`;
  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      const { lat, lng } = response.data.items[0].position;
      return [lat, lng];
    } else {
      console.error('No results found for address:', address);
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
  }

  return null;
};

const Body = () => {
  const [centerPosition, setCenterPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const user = useSelector((store) => store.user.details);
  const role = user?.roles?.[0] || "";
  const [binreq, setBinReq] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/stations/getall`);
        const updatedMarkers = await Promise.all(res.data.map(async (marker) => {
          const position = await geocode(marker.location);
          return {
            ...marker,
            position
          };
        }));
        setMarkers(updatedMarkers.filter(marker => marker.position));
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };

    const fetchCenterPosition = async () => {
      const position = await geocode(user.location);
      console.log("Position", position);
      if (position) {
        setCenterPosition(position);
      } else {
        console.error('Center position could not be determined.');
      }
    };

    fetchMarkers();
    fetchCenterPosition();
  }, [user.location]);

  if (!centerPosition) {
    return <Loader />;
  }

  const handleBooking = async (stationId, binlevel) => {
    try {
      if (binreq !== 0) {
        await dispatch(createBooking({ stationId, quantity: binreq })).unwrap();
        toast.success('Booking successful!');
        setMarkers((prevMarkers) =>
          prevMarkers.map(marker =>
            marker._id === stationId
              ? { ...marker, binlevel: marker.binlevel - binreq }
              : marker
          )
        );
      } else {
        toast.error("Booking quantity is 0");
      }
    } catch (error) {
      toast.error(error.message || 'Booking failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER}/stations/delete/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setMarkers(prevMarkers => prevMarkers.filter(marker => marker._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting station:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleRefill = async (stationId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/stations/refill/${stationId}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        setMarkers((prevMarkers) =>
          prevMarkers.map(marker =>
            marker._id === stationId
              ? { ...marker, binlevel: res.data.newBinLevel }
              : marker
          )
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error refilling station:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className='w-[100%] h-[90vh]'>
        {console.log(centerPosition)}
        <MapContainer center={centerPosition} zoom={16} style={{ width: '100%', height: '90vh' }} className='z-0'>
          <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" //normal
            //url='http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'   //satellite
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <Marker position={centerPosition} icon={centerIcon}>
            <Popup>
              <div className='w-[250px] text-xl font-bold bg-white p-3 text-center flex flex-col space-y-4 rounded-lg'>
                <h2>👋Hello {user.firstname}</h2>
                <p>This is your location</p>
              </div>
            </Popup>
          </Marker>

          <MarkerClusterGroup>
            {markers.map(({ _id, name, position, binlevel }) => position && (
              <Marker
                key={_id}
                position={position}
                icon={binlevel === 0 ? fullBinIcon : binIcon}
              >
                <Popup>
                  <div className='flex items-center justify-center'>
                    {role === "admin" ? (
                      <div className='w-[250px] rounded-lg pb-5 flex flex-col items-center justify-center space-y-2'>
                        <p className='bg-green-600 text-white w-full h-[2rem] text-xl rounded-t-lg flex items-center justify-center'><span>{name}</span></p>
                        <div className="details flex flex-col space-y-3 items-center justify-center">
                          <p className='text-5xl'>{binlevel}</p>
                          <p className='text-green-400'>Total Capacity in Kgs</p>
                          {binlevel === 0 ? (
                            <button onClick={() => handleRefill(_id)} className='text-lg hover:bg-[#4CAF50] bg-[#3B8F44] px-5 py-2 rounded-xl text-white'>Refill Center</button>
                          ) : (
                            <button onClick={() => handleDelete(_id)} className='text-lg hover:bg-[#f05656] bg-[#ee3a3a] px-5 py-2 rounded-xl text-white'>Delete Center</button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className='w-[250px] rounded-lg pb-5 flex flex-col items-center justify-center space-y-2'>
                        <p className='bg-green-600 text-white w-full h-[2rem] text-xl rounded-t-lg flex items-center justify-center'><span>{name}</span></p>
                        <div className="details flex flex-col space-y-1 items-center justify-center">
                          <p className='text-4xl py-0'>{binlevel}</p>
                          <p className='text-green-400'>Total Capacity in Kgs</p>
                          {binlevel === 0 ? (
                            <p className='text-red-500'>Station is filled. See other stations.</p>
                          ) : (
                            <>
                              <input
                                type='range'
                                min='0'
                                max={binlevel}
                                value={binreq}
                                onChange={(e) => setBinReq(Number(e.target.value))}
                                className='border-2 border-gray-400 rounded-lg w-full'
                              />
                              <span className='text-4xl'>{binreq}</span>
                              <p>Required Capacity in Kgs</p>
                              <button
                                onClick={() => handleBooking(_id, binlevel)}
                                className='text-lg hover:bg-[#4CAF50] bg-[#3B8F44] px-5 py-2 rounded-xl text-white'
                              >
                                Book Center
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </>
  );
};

export default Body;

// //Geocoding function to get coordinates from an address using Distance Matrix API
// const geocode = async (address) => {
//   if (!address) {
//     console.error('No address provided for geocoding.');
//     return null;
//   }

//   const apiKey = import.meta.env.VITE_DISTAI_API_KEY1; 
//   const encodedAddress = encodeURIComponent(address);
//   const apiUrl = `maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

//   try {
//     const response = await axios.get(apiUrl);
//     if (response.data.status === 'OK' && response.data.result.length > 0) {
//       const { lat, lng } = response.data.result[0].geometry.location;
//       return [lat, lng];
//     } else {
//       console.error('No results found for address:', address);
//     }
//   } catch (error) {
//     console.error('Error geocoding address:', error);
//   }
//   return null;
// };
