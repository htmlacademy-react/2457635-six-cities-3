import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOfferAction, getFavoriteOffers, getUserData } from './store/api-actions';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import React from 'react';

store.dispatch(fetchOfferAction());
store.dispatch(checkAuthAction()).then((result) => {
  if (checkAuthAction.fulfilled.match(result)) {
    store.dispatch(getUserData());
    store.dispatch(getFavoriteOffers());
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
