import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {FOUND_PLACES_COUNT} from './constants';
import {OFFERS_DATA} from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App foundPlace={FOUND_PLACES_COUNT} offers={OFFERS_DATA} />
  </React.StrictMode>
);
