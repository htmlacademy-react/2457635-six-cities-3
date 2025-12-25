import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AuthData, CurrentOffer, CurrentOfferId, Offer, Offers, Review, Reviews, SendReview, UserData } from '../types/models';
import { ApiRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../constants';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';
import { setError } from './slices/error-slice/error-action';
import { addUserReview } from './slices/review-slice/review-action';
import { dropUserData, setUserData } from './slices/user-slice/user-action';
import { setFavoriteOffers } from './slices/favorite-offers-slice/favorites-offers-action';

export const clearErrorAction = createAsyncThunk(
  'six-cities/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOfferAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchOfferAction',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(ApiRoute.Offers);

    return data;
  },
);

export const getDataCurrentOffer = createAsyncThunk<CurrentOffer, CurrentOfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/getDataCurrentOffer',
  async (id, {extra: api, rejectWithValue}) => {
    if (!id) {
      return rejectWithValue('ID не передан');
    }

    try {
      const {data} = await api.get<CurrentOffer>(`/offers/${id}`);

      return data;
    } catch (error : unknown) {
      return rejectWithValue(error || 'Не удалось загрузить данные');
    }
  },
);

export const getReviews = createAsyncThunk<Reviews, CurrentOfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/getReviews',
  async (id, { extra: api, rejectWithValue }) => {
    if (!id) {
      return rejectWithValue('ID не передан');
    }

    try {
      const { data } = await api.get<Reviews>(`/comments/${id}`);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error || 'Не удалось загрузить данные');
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(ApiRoute.Login);
  },
);

export const getUserData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'user/getUserData',
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
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const addFavoriteOffer = createAsyncThunk<CurrentOffer, Offer, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'favoriteOffers/add',
  async ({id, isFavorite}, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<CurrentOffer>(`/favorite/${id}/${Number(!isFavorite)}`);

      return data;
    } catch (error : unknown) {
      return rejectWithValue(error || 'Не удалось добавить/удалить избранное');
    }
  },
);

export const getFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'favoriteOffers/get',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(ApiRoute.Favorite);

    dispatch(setFavoriteOffers(data));
  },
);

export const sendUserReview = createAsyncThunk<void, SendReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'post/review',
  async({comment, rating, offerId}, {dispatch, extra: api}) => {
    if (!offerId) {
      return;
    }
    const {data} = await api.post<Review>(`/comments/${offerId}`, {comment, rating});
    dispatch(addUserReview(data));
  }
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
  },
);
