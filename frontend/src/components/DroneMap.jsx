import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './DroneMap.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
};

function DroneMap({ drones, selectedDrone, onDroneSelect }) {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (selectedDrone) {
      setSelectedMarker(selectedDrone.id);
    }
  }, [selectedDrone]);

  const handleMarkerClick = (drone) => {
    setSelectedMarker(drone.id);
    onDroneSelect(drone);
  };

  const getMarkerColor = (status) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'idle':
        return '#FFC107';
      case 'charging':
        return '#2196F3';
      case 'returning':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <div className="drone-map">
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          options={mapOptions}
          onLoad={setMap}
        >
          {drones.map((drone) => (
            <Marker
              key={drone.id}
              position={{ lat: drone.latitude, lng: drone.longitude }}
              onClick={() => handleMarkerClick(drone)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: getMarkerColor(drone.status),
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              }}
            >
              {selectedMarker === drone.id && (
                <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                  <div className="marker-info">
                    <h3>{drone.name}</h3>
                    <p>Status: {drone.status}</p>
                    <p>Battery: {drone.battery.toFixed(1)}%</p>
                    <p>Altitude: {drone.altitude.toFixed(1)}m</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default DroneMap;
