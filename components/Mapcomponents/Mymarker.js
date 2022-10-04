import L from 'leaflet';

const mymarker = new L.Icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/000/440/946/original/vector-location-icon.jpg',
    // iconAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-icon-mymarker'
});

export { mymarker };