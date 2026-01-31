import { beforeEach, describe, it, expect, vi } from 'vitest';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppThunkDispatch, extractActionsTypes, fakeCurrentOffer, fakeOffer, fakeOffers, fakeReview, fakeReviews, fakeServerAnswer, fakeUser, fakeUserLogin, fakeUserReview } from '../test/mock';
import { ApiRoute, AuthorizationStatus, CITIES, SORT_TYPES } from '../constants';
import { CurrentOffer, Offers, Reviews, UserData } from '../types/models';
import { addFavoriteOffer, checkAuthAction, fetchOfferAction, getDataCurrentOffer, getFavoriteOffers, getReviews, getUserData, loginAction, logoutAction, sendUserReview } from './api-actions';
import { redirectToRoute } from './action';
import { dropUserData, setUserData } from './slices/user/actions';
import * as tokenStorage from '../services/token';
import { setFavoriteOffers } from './slices/favorite-offers/actions';
import { addUserReview } from './slices/review/action';
import { removeFavoriteOffers } from './slices/offers/actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS: {
        offers: [] as Offers,
        isOffersLoaded: false,
      },
      TOWN: { currentCity: CITIES[1] },
      SORTING: { sorting: SORT_TYPES[0] },
      AUTH: { authStatus: AuthorizationStatus.Unknown },
      USER: { user: {} as UserData },
      REVIEW: {
        reviews: null as unknown as Reviews,
        isReviewLoaded: false,
        hasReviewError: false,
      },
      CURRENT_OFFER: {
        currentOffer: {} as CurrentOffer,
        isCurrentOfferLoaded: false,
        hasCurrentOfferError: false,
        nearOffers: [] as Offers,
        isNearOffersLoading: false,
        hasNearOffersError: false,
      },
      CURRENT_CARD: { currentCardId: '' },
      FAVORITE_OFFERS: { favoriteOffers: [] as Offers }
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);
      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('token');

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);
      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('token');

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchQuestionAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async() => {
      const mockQuestions = fakeOffers;
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockQuestions);

      await store.dispatch(fetchOfferAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockQuestions);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOfferAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerAnswer);

      await store.dispatch(loginAction(fakeUserLogin));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual(expect.arrayContaining([
        loginAction.pending.type,
        setUserData.type,
        redirectToRoute.type,
        fetchOfferAction.pending.type,
        getFavoriteOffers.pending.type,
        loginAction.fulfilled.type,
      ]));
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerAnswer);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUserLogin));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerAnswer.token);
    });


  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        dropUserData.type,
        setFavoriteOffers.type,
        removeFavoriteOffers.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('getUserDataAction', () => {
    it('should dispatch "getUserData.pending", "getUserData.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200, fakeUser);

      await store.dispatch(getUserData());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const userDataFulfilled = emittedActions.at(1) as ReturnType<typeof getUserData.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getUserData.pending.type,
        setUserData.type,
        getUserData.fulfilled.type,
      ]);

      expect(userDataFulfilled.payload)
        .toEqual(fakeUser);
    });

    it('should dispatch "getUserData.pending", "getUserData.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(401, '');

      await store.dispatch(getUserData());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getUserData.pending.type,
        getUserData.rejected.type,
      ]);
    });

  });

  describe('getFavoriteOffersAction', () => {
    it('should dispatch "getFavoriteOffers.pending", "getFavoriteOffers.fulfilled", setFavoriteOffers when server response 200', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, fakeOffers);

      await store.dispatch(getFavoriteOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const userDataFulfilled = emittedActions.at(1) as ReturnType<typeof getFavoriteOffers.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFavoriteOffers.pending.type,
        setFavoriteOffers.type,
        getFavoriteOffers.fulfilled.type,
      ]);

      expect(userDataFulfilled.payload)
        .toEqual(fakeOffers);
    });

    it('should dispatch "getFavoriteOffers.pending", "getFavoriteOffers.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(401, '');

      await store.dispatch(getFavoriteOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoriteOffers.pending.type,
        getFavoriteOffers.rejected.type,
      ]);
    });
  });

  describe('sendUserReviewAction', () => {
    it('should dispatch "sendUserReview.pending", "sendUserReview.fulfilled", addUserReview when server response 201', async () => {
      const review = fakeReview();
      const userReview = {
        offerId: review.id,
        comment: review.comment,
        rating: review.rating,
      };

      mockAxiosAdapter.onPost(`/comments/${userReview.offerId}`, { comment: userReview.comment, rating: userReview.rating }).reply(201, review);

      await store.dispatch(sendUserReview(userReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const userDataFulfilled = emittedActions.at(1) as ReturnType<typeof sendUserReview.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        sendUserReview.pending.type,
        addUserReview.type,
        sendUserReview.fulfilled.type,
      ]);

      expect(userDataFulfilled.payload)
        .toEqual(review);
    });

    it('should dispatch "sendUserReview.pending", "sendUserReview.rejected" when server response 400', async () => {
      const user = fakeUserReview;
      mockAxiosAdapter.onPost(`/comments/${fakeUserReview.offerId}`).reply(400, '');

      await store.dispatch(sendUserReview(user));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendUserReview.pending.type,
        sendUserReview.rejected.type,
      ]);
    });
  });

  describe('getReviewsAction', () => {
    it('should dispatch "getReviews.pending", "getReviews.fulfilled" when server response 200', async () => {
      const offer = fakeOffer();
      mockAxiosAdapter.onGet(`/comments/${offer.id}`).reply(200, fakeReviews);

      await store.dispatch(getReviews(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const userDataFulfilled = emittedActions.at(1) as ReturnType<typeof getReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getReviews.pending.type,
        getReviews.fulfilled.type,
      ]);

      expect(userDataFulfilled.payload)
        .toEqual(fakeReviews);
    });

    it('should dispatch "getReviews.pending", "getReviews.rejected" when server response 404', async () => {
      const offer = fakeOffer();
      mockAxiosAdapter.onGet(`/comments/${offer.id}`).reply(404, '');

      await store.dispatch(getReviews(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getReviews.pending.type,
        getReviews.rejected.type,
      ]);
    });
  });

  describe('getDataCurrentOfferAction', () => {
    it('should dispatch "getDataCurrentOffer.pending", "getDataCurrentOffer.fulfilled" when server response 200', async () => {
      const offer = fakeOffer();
      mockAxiosAdapter.onGet(`/offers/${offer.id}`).reply(200, fakeCurrentOffer);

      await store.dispatch(getDataCurrentOffer(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const userDataFulfilled = emittedActions.at(1) as ReturnType<typeof getDataCurrentOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getDataCurrentOffer.pending.type,
        getDataCurrentOffer.fulfilled.type,
      ]);

      expect(userDataFulfilled.payload)
        .toEqual(fakeCurrentOffer);
    });

    it('should dispatch "getDataCurrentOffer.pending", "getDataCurrentOffer.rejected" when server response 404', async () => {
      const offer = fakeOffer();
      mockAxiosAdapter.onGet(`/offers/${offer.id}`).reply(404, '');

      await store.dispatch(getDataCurrentOffer(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getDataCurrentOffer.pending.type,
        getDataCurrentOffer.rejected.type,
      ]);
    });
  });

  describe('addFavoriteOfferAction', () => {
    it('should dispatch "addFavoriteOffer.pending", "addFavoriteOffer.fulfilled" when server response 200', async () => {
      const offer = fakeOffer();
      mockAxiosAdapter.onPost(`/favorite/${offer.id}/${Number(!offer.isFavorite)}`).reply(200, fakeCurrentOffer);
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, fakeOffers);

      await store.dispatch(addFavoriteOffer({id: offer.id, isFavorite: offer.isFavorite}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const userDataFulfilled = emittedActions.find((action) => action.type === addFavoriteOffer.fulfilled.type) as ReturnType<typeof addFavoriteOffer.fulfilled>;

      expect(extractedActionsTypes).toEqual(expect.arrayContaining([
        addFavoriteOffer.pending.type,
        getFavoriteOffers.pending.type,
        setFavoriteOffers.type,
        getFavoriteOffers.fulfilled.type,
        addFavoriteOffer.fulfilled.type,
      ]));

      expect(userDataFulfilled.payload)
        .toEqual(fakeCurrentOffer);
    });

    it('should dispatch "addFavoriteOffer.pending", "addFavoriteOffer.rejected" when server response 404', async () => {
      const offer = fakeOffer();
      mockAxiosAdapter.onPost(`/favorite/${offer.id}/${Number(!offer.isFavorite)}`).reply(404, '');

      await store.dispatch(addFavoriteOffer({id: offer.id, isFavorite: offer.isFavorite}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addFavoriteOffer.pending.type,
        addFavoriteOffer.rejected.type,
      ]);
    });
  });

});
