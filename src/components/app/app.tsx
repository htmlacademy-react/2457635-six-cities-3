import MainScreen from '../../pages/main-screen/main-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
// import FavoritesItemList from '../favorites/favorites-item-list.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants.ts';
import PrivateRoute from '../private-route/private-route.tsx';
import PrivateOfferRoute from '../private-route/private-offer-route.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import { OfferScreenWithHOC } from '../../pages/offers/offer-screen.tsx';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer.ts';
// import { getCurrentLoadingStatus, getErrorStatus } from '../../store/slices/offers-slice/offers-reducer.ts';
import { getCurrentLoadingStatus } from '../../store/slices/offers-slice/offers-reducer.ts';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';
// import ErrorScreen from '../../pages/error-screen/error-screen.tsx';
import PrivateMainScreeRoute from '../private-route/private-main-screen-route.tsx';
import { FavoritesItemListWithHOC } from '../favorites/favorites-item-list.tsx';

export default function App() {
  const authorizationStatus = useAppSelector(getCurrentAuth);
  const isDataLoading = useAppSelector(getCurrentLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <PrivateMainScreeRoute>
              <MainScreen />
            </PrivateMainScreeRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesItemListWithHOC/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={
            <PrivateOfferRoute>
              <OfferScreenWithHOC />
            </PrivateOfferRoute>
          }
        />
        <Route
          path= {AppRoute.Error}
          element={<NotFoundScreen/>}
        />
      </Routes>
    </HistoryRouter>
  );
}
