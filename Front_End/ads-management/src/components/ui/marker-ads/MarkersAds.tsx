import { Marker, Popup } from 'react-leaflet';
import './MarkersAds.scss';
const AdMarker = ({ position, hasAd, onClick }) => {
  return (
    <Marker position={position} onClick={onClick}>
      <Popup>{hasAd ? 'Ad Found' : 'No Ad'}</Popup>
    </Marker>
  );
};

export default AdMarker;
