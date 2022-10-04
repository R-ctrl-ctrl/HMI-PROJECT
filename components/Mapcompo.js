import { Box, Square, Text } from '@chakra-ui/react'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import styles from '../styles/Map.module.css'
import 'leaflet/dist/leaflet.css';
import {mymarker} from '../components/Mapcomponents/Mymarker'


const Mapcompo = () => {
  function MyComponent() {
    const map = useMap({
      zoomControl: false
    })
    console.log('map center:', map.getCenter())
    return null
  }

  let mapClassName = styles.container;

  const center = [22, 77]
  return (
    <MapContainer center={center} zoom={4} className={mapClassName}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Square center={center} size={1000} />
      <MyComponent />
      <Marker position={[50.5, 30.5]}>
        <Popup>Hello world</Popup>
      </Marker>
    </MapContainer>


  )
}

export default Mapcompo
