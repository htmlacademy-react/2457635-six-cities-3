import { useEffect, useRef } from 'react';
import { City, IconProperties, Offers } from '../../types/models';
import useMap from '../../hooks/useMap';
import L from 'leaflet';
import PinActive from'/img/pin-active.svg';
import Pin from '/img/pin.svg';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/slices/town/selectors';
import { getSortedOffers } from '../../store/reducer';
import { getCurrentCardId } from '../../store/slices/current-card/selectors';

const ICON_PROPERTIES: IconProperties = {
  iconAnchor: [20, 40],
  iconSize: [40, 40],
};

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

type MapProps = {
  offers?: Offers;
  city?: City;
  activeOfferId?: string;
}

export default function Map ({offers: offersProp, city: cityProp, activeOfferId}: MapProps) {
  const mapRef = useRef(null);
  const selectedCard = useAppSelector(getCurrentCardId);
  const cityFromStore = useAppSelector(getCity);
  const offersFromStore = useAppSelector(getSortedOffers);
  const city = cityProp ?? cityFromStore;
  const offers = offersProp ?? offersFromStore;
  const activeId = selectedCard || activeOfferId;
  const map = useMap({mapRef, city});
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.setView(
        {lat: city.location.latitude, lng: city.location.longitude},
        city.location.zoom
      );
      offers.forEach((offer) => {
        const offerMarker = L.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        }, {
          icon: (offer.id === activeId) ? currentCustomIcon : defaultCustomIcon,
        }).addTo(map);

        markersRef.current.push(offerMarker);
      });
    }
  }, [activeId, city.location.longitude, city.location.latitude, map, offers]);

  return (
    <div
      ref={mapRef}
      style={{height: `${100}%`, width: `${100}%`}}
    >
    </div>
  );
}
