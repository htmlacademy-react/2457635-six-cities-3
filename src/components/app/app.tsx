import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer.ts';
import { getCurrentLoadingStatus } from '../../store/slices/offers-slice/offers-reducer.ts';
import { FavoritesScreen } from '../favorites/favorites-item-list.tsx';
import { MainScreen } from '../main/main-screen-hoc.tsx';
import OfferScreen from '../../pages/offers/offer-screen.tsx';

export default function App() {
  const authorizationStatus = useAppSelector(getCurrentAuth);
  const isDataLoading = useAppSelector(getCurrentLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainScreen />
        }
      />
      <Route
        path={AppRoute.Login}
        element={<LoginScreen/>}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Offer}
        element={<OfferScreen />}
      />
      <Route
        path= {AppRoute.Error}
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}
