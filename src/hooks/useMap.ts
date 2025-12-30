import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../types/models';

const MAP_TITLE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

type useMapProps = {
  city: City;
  mapRef: React.RefObject<HTMLDivElement>;
}

export default function useMap({mapRef, city}: useMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = L.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
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
