import MainScreen from '../../pages/main-screen/main-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offers/offer-screen.tsx';
import FavoritesItemList from '../favorites/favorites-item-list.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppProps} from '../../types.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import MainEmptyScreen from '../../pages/main-screen/main-empty-screen.tsx';
import PrivateOfferRoute from '../private-route/private-offer-route.tsx';

export default function App({foundPlace, offers}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={offers.length ? <MainScreen foundPlace={foundPlace} offers={offers}/> : <MainEmptyScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesItemList auth={AuthorizationStatus.NoAuth} offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <PrivateOfferRoute offers={offers}>
              <OfferScreen auth={AuthorizationStatus.Auth} offers={offers}/>
            </PrivateOfferRoute>
          }
        />
        <Route
          path= {AppRoute.Error}
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
