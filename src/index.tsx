import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import {HEADER_FAVORITE_COUNT, FOUNDED_PLACES, hotelsData} from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App headerFavoriteCount={HEADER_FAVORITE_COUNT} foundedPlaces={FOUNDED_PLACES} hotelsData={hotelsData} />
  </React.StrictMode>
);
