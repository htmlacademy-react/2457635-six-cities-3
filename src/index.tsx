import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchOfferAction, getUserData } from './store/api-actions';
import { getToken } from './services/token';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction());

if (getToken()) {
  store.dispatch(getUserData());
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
