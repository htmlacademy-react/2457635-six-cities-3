import { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '.';
import { getCity } from '../store/reduser';

const MAP_TITLE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

type useMapProps = {
  mapRef: React.RefObject<HTMLDivElement>;
}

export default function useMap({mapRef}: useMapProps) {
  const city = useAppSelector((state) => getCity(state));
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = L.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },

      });

      L.tileLayer(
        MAP_TITLE_LAYER,
        {
          attribution: MAP_ATTRIBUTION,
        },
      ).addTo(instance);

      setMap(instance);

      isRenderedRef.current = true;
    }

  }, [mapRef, city]);

  return map;
}
