import { createSelector } from '@reduxjs/toolkit';
import { CurrentOffer, Offers, SortTypes } from '../types/models';
import { sortingTypes } from '../utils';
import { currentCityName } from './slices/town-slice/town-reducer';
import { currentSort } from './slices/sorting-slice/sorting-reducer';
import { allOffers } from './slices/offers-slice/offers-reducer';
import { currentOffer } from './slices/current-offer/current-offer-reducer';

export const changeOffers = createSelector([currentCityName, allOffers, currentSort], (name: string, offersData: Offers, sort: SortTypes) => {
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

export const getOffer = createSelector([allOffers, currentOffer], (offers: Offers, offerCurrent: CurrentOffer) => offers.find((offer) => offer.id === offerCurrent.id));
