import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AuthData, CurrentOffer, CurrentOfferId, Offers, Review, Reviews, SendReview, UserData } from '../types/models';
import { ApiRoute, AppRoute, ErrorMessages } from '../constants';
import { redirectToRoute } from './action';
import { dropToken, getToken, saveToken } from '../services/token';
import { addUserReview } from './slices/review/action';
import { setNearOfferFavorite } from './slices/current-offer/actions';
import { dropUserData, setUserData } from './slices/user/actions';
import { setFavoriteOffers } from './slices/favorite-offers/actions';
import { removeFavoriteOffers } from './slices/offers/actions';

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
      return rejectWithValue(ErrorMessages.NoID);
    }

    try {
      const {data} = await api.get<CurrentOffer>(`/offers/${id}`);

      return data;
    } catch (error : unknown) {
      return rejectWithValue(error || ErrorMessages.FailLoadData);
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
      return rejectWithValue(ErrorMessages.NoID);
    }

    try {
      const { data } = await api.get<Reviews>(`/comments/${id}`);

      return data;
    } catch (error: unknown) {
      return rejectWithValue(error || ErrorMessages.FailLoadData);
    }
  }
);
export const getNearbyOffers = createAsyncThunk<Offers, CurrentOfferId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/getNearbyOffers',
  async (id, { extra: api, rejectWithValue }) => {
    if (!id) {
      return rejectWithValue(ErrorMessages.NoID);
    }

    try {
      const { data } = await api.get<Offers>(`/offers/${id}/nearby`);
      return data;
    } catch (error: unknown) {
      return rejectWithValue(error || ErrorMessages.FailLoadData);
    }
  }
);
export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: string;
}
>(
  'user/checkAuth',
  async (_arg, {extra: api, rejectWithValue}) => {
    if (!getToken()) {
      return rejectWithValue('No token');
    }

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
    dispatch(fetchOfferAction());
    dispatch(getFavoriteOffers());
  },
);

type FavoritePayload = {
  id: string;
  isFavorite: boolean;
};

export const addFavoriteOffer = createAsyncThunk<CurrentOffer, FavoritePayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'favoriteOffers/add',
  async ({id, isFavorite}, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<CurrentOffer>(`/favorite/${id}/${Number(!isFavorite)}`);

      dispatch(setNearOfferFavorite({id, isFavorite: !isFavorite}));
      await dispatch(getFavoriteOffers());
      return data;
    } catch (error : unknown) {
      return rejectWithValue(error || ErrorMessages.FailAddFavorite);
    }
  },
);
export const sendUserReview = createAsyncThunk<void, SendReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'post/review',
  async({comment, rating, offerId}, {dispatch, extra: api, rejectWithValue}) => {
    if (!offerId) {
      return rejectWithValue(ErrorMessages.NoID);
    }
    try {
      const {data} = await api.post<Review>(`/comments/${offerId}`, {comment, rating});
      dispatch(addUserReview(data));
    } catch (error: unknown) {
      return rejectWithValue(error || ErrorMessages.FailLoadData);
    }
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
    dispatch(setFavoriteOffers([]));
    dispatch(removeFavoriteOffers());
  },
);
