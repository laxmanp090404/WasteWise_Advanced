import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';

const binMarkers = [
  {
    id: 1,
    name: "Vinayaga Garden Center",
    location: "WX9P+7V, Eachanari, Tamil Nadu 641021",
    binlevel: 90 
  },{
    id: 2,
    name: "L and L Center",
    location: "W243+42 Malumichampatti, Tamil Nadu",
    binlevel: 75,
  },
  {
    id: 3,
    name: "Chandran Center",
    location: "WX7J+5M Eachanari, Tamil Nadu, India",
    binlevel: 75,
  }
];

const geocode = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: import.meta.env.VITE_GOOGLE_MAP_API_KEY
      },
      withCredentials: false,
      headers: null
    });
    
    const data = response.data;
    
    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    } else {
      console.log(`Geocoding failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Error making request:', error);
  }
  return null;
};

const Body = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchGeocode = async () => {
      const updatedMarkers = await Promise.all(binMarkers.map(async (marker) => {
        const position = await geocode(marker.location);
        return {
          ...marker,
          position
        };
      }));
      setMarkers(updatedMarkers);
    };

    fetchGeocode();
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div className='w-[100%] h-[90vh]'>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: 10.906329580038504, lng: 77.00308059211149 }}
          zoom={16}
          mapContainerStyle={{
            width: '100%',
            height: '90vh'
          }}
        >
          {markers.map(({ id, name, position }) => (
            position && (
              <MarkerF
                key={id}
                position={position}
                onClick={() => handleActiveMarker(id)}
                icon={{
                  url: "/assets/binmarker.png",
                  scaledSize: { width: 50, height: 50 }
                }}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => { setActiveMarker(null) }}>
                    <div>
                      {name}
                    </div>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            )
          ))}
        </GoogleMap>
      ) : null}
    </div>
  );
};

export default Body;
