import React, { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

import CalculateBounds from "./CalculateBounds";

const PARIS = {
    lat: 48.8566,
    lon: 2.3522
}

const redDotIcon = new L.Icon({
    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const Map = ({ items }) => {
    const [center, setCenter] = useState([PARIS.lat, PARIS.lon]);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    useEffect(() => {
        const first = items?.[0];
        const lat = Number(first?.latitude);
        const lon = Number(first?.longitude);

        setCenter([
            Number.isFinite(lat) ? lat : PARIS.lat,
            Number.isFinite(lon) ? lon : PARIS.lon,
        ]);
    }, [items]);

    const getIconForItem = useMemo(() => {
        return (item) => {
            return redDotIcon;
        };
    }, []);

    if (!items) return null;

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <MapContainer center={center} zoom={4} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CalculateBounds items={items} />

                {items.map((item) => {
                    const lat = Number(item.latitude);
                    const lon = Number(item.longitude);
                    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

                    return (
                        <Marker
                            key={item.id}
                            position={[lat, lon]}
                            icon={getIconForItem(item)}
                            eventHandlers={{
                                mouseover: () => setHoveredMarker(item.id),
                                mouseout: () => setHoveredMarker(null),
                                click: () => {
                                },
                            }}
                        >
                            {hoveredMarker === item.id && (
                                <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent>
                                    <div style={{ whiteSpace: 'normal' }}>

                                    </div>                                        
                                </Tooltip>
                            )}
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Map;
