import { renderHook } from '@testing-library/react';
import useMap from './useMap';
import leaflet from 'leaflet';
import { CITIES } from '../constants';

vi.mock('leaflet', () => {
  const mockMapInstance = {
    setView: vi.fn(),
    addTo: vi.fn(),
  };

  return {
    default: {
      map: vi.fn(() => mockMapInstance),
      tileLayer: vi.fn(() => ({
        addTo: vi.fn(),
      })),
    },
  };
});

describe('Hook: useMap', () => {
  const city = CITIES[0];

  it('should rerender Map 1 times', () => {
    vi.spyOn(leaflet, 'map');
    const mapRef = { current: document.createElement('div') };
    const { rerender } = renderHook(() => useMap({mapRef, city}));
    expect(leaflet.map).toHaveBeenCalledTimes(1);
    rerender();
    expect(leaflet.map).toHaveBeenCalledTimes(1);
  });
});
