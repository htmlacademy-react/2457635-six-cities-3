import { useEffect, useRef } from 'react';
import { IconProperties } from '../../types/models';
import useMap from '../../hooks/useMap';
import L from 'leaflet';
import PinActive from'/img/pin-active.svg';
import Pin from '/img/pin.svg';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/slices/town-slice/town-reducer';
import { changeOffers } from '../../store/reducer';
import { getCurrentCardId } from '../../store/slices/current-card-slice/current-card-reducer';

const ICON_PROPERTIES: IconProperties = {
  iconAnchor: [20, 40],
  iconSize: [40, 40],
};

export default function Map () {
  const mapRef = useRef(null);
  const city = useAppSelector(getCity);
  const map = useMap({mapRef, city});
  const markersRef = useRef<L.Marker[]>([]);
  const offers = useAppSelector(changeOffers);
  const selectedCard = useAppSelector(getCurrentCardId);

  const defaultCustomIcon = L.icon({
    iconUrl: Pin,
    iconSize: ICON_PROPERTIES.iconSize,
    iconAnchor: ICON_PROPERTIES.iconAnchor,
  });

  const currentCustomIcon = L.icon({
    iconUrl: PinActive,
    iconSize: ICON_PROPERTIES.iconSize,
    iconAnchor: ICON_PROPERTIES.iconAnchor,
  });

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.setView({lat: city.location.latitude, lng: city.location.longitude}, 12);
      offers.forEach((offer) => {
        const offerMarker = L.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        }, {
          icon: (offer.id === selectedCard) ? currentCustomIcon : defaultCustomIcon,
        }).addTo(map);

        markersRef.current.push(offerMarker);
      });
    }

  }, [city.location.longitude, city.location.latitude, currentCustomIcon, defaultCustomIcon, map, offers, selectedCard]);

  return (
    <div
      ref={mapRef}
      style={{height: '600px', width: `${100}%`}}
    >
    </div>
  );
}
