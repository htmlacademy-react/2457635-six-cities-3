import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchOfferAction, getUserData } from './store/api-actions';
import { getToken } from './services/token';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

export const AppWithStore = () => {
  useEffect(() => {
    store.dispatch(fetchOfferAction());
    store.dispatch(checkAuthAction());

    if (getToken()) {
      store.dispatch(getUserData());
    }
  }, []);

  return (
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWithStore />
  </React.StrictMode>
);
