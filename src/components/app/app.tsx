import MainScreen from '../../pages/main-screen/main-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offers/offer-screen.tsx';
import FavoritesItemList from '../favorites/favorites-item-list.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import PrivateOfferRoute from '../private-route/private-offer-route.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesItemList auth={AuthorizationStatus.Auth}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <PrivateOfferRoute>
              <OfferScreen auth={AuthorizationStatus.Auth}/>
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
