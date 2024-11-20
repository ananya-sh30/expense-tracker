import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./styles/UserHome.css"
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 28.6139,  
  lng: 77.2090,  
};

function MapSection(props) {
  const [locations, setLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const userEmail = props.useremail;
  useEffect(() => {
    axios
      .get('http://localhost:3002/locations', {
        params: { email: userEmail },
      })
      .then((response) => {
        setLocations(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, [userEmail]);
  const handleMarkerClick = (location) => {
    setSelectedMarker(location); 
  };
  return (
    
      <LoadScript googleMapsApiKey="AIzaSyBw4punbwbcnthbQDBeAdpBYWNvDr29-zs">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {console.log(locations[0])}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
              title={location.area}
              onClick={() => handleMarkerClick(location)}
            />
          ))}

          {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(selectedMarker.latitude),
                      lng: parseFloat(selectedMarker.longitude),
                    }}
                    onCloseClick={() => setSelectedMarker(null)} 
                  >
                    <div>
                      <h4>{selectedMarker.area}, {selectedMarker.location}</h4>
                      <p>On: {selectedMarker.date.slice(0, 10)}</p>
                      <p>{selectedMarker.description || 'No additional information available'}</p> 
                    </div>
                  </InfoWindow>
                )}
                </GoogleMap>
              </LoadScript>
  
  );
}

export default MapSection;
