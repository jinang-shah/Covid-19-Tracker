import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './Map.css'
import { showDataMap } from './util';

function Map({countries,casesType,center,zoom}) {
    console.log("Map->cacesType =",casesType);
    return (
        <div className="map">
            <MapContainer
                    className="markercluster-map"
                    center={center}
                    zoom={zoom}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataMap(countries,casesType)}
            </MapContainer>
        </div>
    );
}

 export default Map;
