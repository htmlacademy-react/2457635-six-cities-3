import { createSelector } from '@reduxjs/toolkit';
import { City, Offers, CommonSlice } from '../types/models';
import { sortingTypes} from '../utils';

const currentCityName = (state: CommonSlice) => state.towns.currentCity.name;
const allOffers = (state: CommonSlice) => state.offers.offers;
const currentCity = (state: CommonSlice) => state.towns.currentCity;
const currentSort = (state: CommonSlice) => state.sorting.sorting;

export const getCityName = createSelector([currentCityName], (name: string) => name);
export const changeOffers = createSelector([currentCityName, allOffers, currentSort], (name: string, offersData: Offers, sort: string) => {
  const popularOffers = sortingTypes.popularOffers(offersData, name);

  switch (sort) {
    case 'Popular':
      return popularOffers;
    case 'Price: low to high':
      return sortingTypes.priceLowToHighOffers(popularOffers);
    case 'Price: high to low':
      return sortingTypes.priceHighToLowOffers(popularOffers);
    case 'Top rated first':
      return sortingTypes.topRatingOffers(popularOffers);
    default:
      return popularOffers;
  }
});
export const getCity = createSelector([currentCity], (city: City) => city);
export const getAllOffers = createSelector([allOffers], (allCurrentOffers: Offers) => allCurrentOffers);
export const favoriteOffers = createSelector([allOffers], (offersData: Offers) => offersData.filter((offer) => offer.isBookmarks));
export const getCurrentSort = createSelector([currentSort], (sort: string) => sort);
