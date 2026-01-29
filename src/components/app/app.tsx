import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import { getCurrentAuth } from '../../store/slices/auth/selectors.ts';
import { getCurrentLoadingStatus, getErrorStatus } from '../../store/slices/offers/selectors.ts';
import { FavoritesScreen } from '../favorites/favorites.tsx';
import { MainScreen } from '../main-screen-hoc/main-screen-hoc.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import ErrorScreen from '../../pages/error-screen/error-screen.tsx';

export default function App() {
  const authorizationStatus = useAppSelector(getCurrentAuth);
  const isDataLoading = useAppSelector(getCurrentLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || (authorizationStatus === AuthorizationStatus.Auth && isDataLoading)) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (
      <ErrorScreen />);
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
        element={<LoginScreen authorizationStatus={authorizationStatus}/>}
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
