import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const locations = [
    { id: 1, name: 'Warby Parker', street: '11700 Domain Blvd Suite 114', city: 'Austin', state: 'TX', zipCode: '78758', tier: {key: 'gold', name: 'Gold'}, position: {lat: 30.402968, lng: -97.720991} },
    { id: 2, name: 'ClearView Optics', street: '1980 East State Hwy 114', city: 'Southlake', state: 'TX', zipCode: '76092', tier: {key: 'bronze', name: 'Bronze'}, position: {lat: 32.945113, lng: -97.121117} },
    { id: 3, name: 'Stanton Optical', street: '3620 W University Dr #400', city: 'McKinney', state: 'TX', zipCode: '75071', tier: {key: '', name: ''}, position: {lat: 33.217463, lng: -96.660282} },
    { id: 4, name: 'Roka', street: '5646 Milton St. Suite 540', city: 'Dallas', state: 'TX', zipCode: '75206', tier: {key: 'silver', name: 'Silver'}, position: {lat: 32.848092, lng: -96.770822} }
];

// Center on the first location
const center = locations[0].position;
const apiKey = "API_KEY";

const Map = () => {
    const [activeMarker, setActiveMarker] = useState(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    const handleMarkerClick = (markerId) => {
        setActiveMarker(markerId);
        
        Liferay.fire('selectDistributor', locations.find(location => location.id === markerId));
    };

    const handleMouseOver = (markerId) => {
        setHoveredMarker(markerId);
    };

    const handleMouseOut = () => {
        setHoveredMarker(null);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={4}
                    options={{
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                        zoomControl: true,
                    }}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={location.position}
                            title={location.name}
                            onClick={() => handleMarkerClick(location.id)}
                            onMouseOver={() => handleMouseOver(location.id)}
                            onMouseOut={handleMouseOut}
                        >
                            {/* InfoWindow shown only on click */}
                            {hoveredMarker === location.id && (
                                <InfoWindow
                                    position={location.position}
                                    onCloseClick={() => setActiveMarker(null)}
                                    options={{ pixelOffset: new window.google.maps.Size(0, -8) }} // optional
                                >
                                    <div style={{ maxWidth: 300 }}>
                                        <div>{location.name}</div>
                                        <div>{location.street}</div>
                                        <div>{location.city}, {location.state}, {location.zipCode}</div>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;