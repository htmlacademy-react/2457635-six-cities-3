import { AuthorizationStatus } from './constants';
import { Offer, Offers, Result } from './types/models';

export const authorization = (auth: AuthorizationStatus, trueResult: Result, falseResult: Result) => {
  if (auth === AuthorizationStatus.Auth) {
    return trueResult;
  }

  return falseResult;
};

export const getCurrentDate = (convertData: Date) => `${convertData.getFullYear()}-${convertData.getMonth() + 1}-${convertData.getDate()}`;

export const getMonthAndYear = (convertData: Date) => `${convertData.toLocaleString('default', {month: 'long'})}-${convertData.getFullYear()}`;

const sortingMethods = {
  lowToHighPriceSorting: (first: Offer, second: Offer) => first.price - second.price,
  highToLowPriceSorting: (first: Offer, second: Offer) => second.price - first.price,
  highToLowRatingSorting: (first: Offer, second: Offer) => second.ratingValue - first.ratingValue,
};

export const sortingTypes = {
  popularOffers: (offers: Offers, name: string) => offers.filter((offer) => offer.town === name),
  priceLowToHighOffers: (offers: Offers) => offers.sort(sortingMethods.lowToHighPriceSorting),
  priceHighToLowOffers: (offers: Offers) => offers.sort(sortingMethods.highToLowPriceSorting),
  topRatingOffers: (offers: Offers) => offers.sort(sortingMethods.highToLowRatingSorting),
};
