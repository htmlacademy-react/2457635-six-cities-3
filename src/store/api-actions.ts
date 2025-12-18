import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AuthData, CurrentOffer, CurrentOfferId, Offers, Reviews, UserData } from '../types/models';
import { ApiRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../constants';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { setError } from './slices/error-slice/error-action';
import { loadData, setCurrentOffer, setDataLoadingStatus, setReviews } from './slices/offers-slice/offers-action';
import { requireAuthorization } from './slices/auth-slice/auth-action';
import { dropUserData, setUserData } from './slices/user-slice/user-action';

export const clearErrorAction = createAsyncThunk(
  'six-cities/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchOfferAction',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Offers>(ApiRoute.Offers);
    dispatch(setDataLoadingStatus(false));
    dispatch(loadData(data));
  },
);

export const getDataCurrentOffer = createAsyncThunk<void, CurrentOfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/getDataCurrentOffer',
  async (id, {dispatch, extra: api}) => {
    if (!id) {
      return;
    }
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<CurrentOffer>(`/offers/${id}`);
    dispatch(setDataLoadingStatus(false));
    dispatch(setCurrentOffer(data));
  },
);

export const getReviews = createAsyncThunk<void, CurrentOfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/getReviews',
  async (id, {dispatch, extra: api}) => {
    if (!id) {
      return;
    }
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Reviews>(`/comments/${id}`);
    dispatch(setDataLoadingStatus(false));
    dispatch(setReviews(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const getUserData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const data = (await api.get(ApiRoute.Login));
    dispatch(setUserData(data.data as UserData));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(dropUserData());
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
