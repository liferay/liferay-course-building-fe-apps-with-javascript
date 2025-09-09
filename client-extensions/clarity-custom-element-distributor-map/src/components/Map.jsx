import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { getDistributors } from 'clarity-distributors-api';

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const Map = ({ promoStore }) => {

    const [locations, setLocations] = useState(null);
    const [center, setCenter] = useState(null);

    useEffect(() => {
        getDistributors()
            .then((response) => {
                setLocations(response); 

                if (response.length > 0) {
                    setCenter({'lat': parseFloat(response[0].latitude), 'lng': parseFloat(response[0].longitude)});
                }
            });
    }, []);

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
        (
            locations && 
            <div style={{ width: '100%', height: '100%' }}>
                <LoadScript googleMapsApiKey="API_KEY">
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
                                position={{'lat': parseFloat(location.latitude), 'lng': parseFloat(location.longitude)}}
                                title={location.name}
                                onClick={() => handleMarkerClick(location.id)}
                                onMouseOver={() => handleMouseOver(location.id)}
                                onMouseOut={handleMouseOut}
                                icon={ 
                                    location.name === promoStore ?
                                    {
                                        url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`
                                    } : 
                                    {
                                        url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`
                                    }
                              }
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
        )
    );
};

export default Map;