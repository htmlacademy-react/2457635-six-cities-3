import {createSelector, createSlice } from '@reduxjs/toolkit';
import {offers, changeTown} from './action';
import { OFFERS_DATA } from '../mocks/offers';
import { CITIES } from '../constants';
import { City, Offers, СommonSlice } from '../types/models';


export const townsSlice = createSlice({
  name: 'towns',
  initialState: {
    currentCity: CITIES[1],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeTown, (state, action) => {
        state.currentCity = action.payload;
      });
  }
});

export const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: OFFERS_DATA,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(offers, (state) => {
        state.offers = OFFERS_DATA;
      });
  },
});

const currentCityName = (state: СommonSlice) => state.towns.currentCity.name;
const allOffers = (state: СommonSlice) => state.offers.offers;
const currentCity = (state: СommonSlice) => state.towns.currentCity;

export const getCityName = createSelector([currentCityName], (name: string) => name);
export const changeOffers = createSelector([currentCityName, allOffers], (name: string, offersData: Offers) => offersData.filter((offer) => offer.town === name));
export const getCity = createSelector([currentCity], (city: City) => city);
export const getAllOffers = createSelector([allOffers], (allCurrentOffers: Offers) => allCurrentOffers);
