import { AuthorizationStatus } from './constants';
import { AuthStatus, Offer, Offers } from './types/models';

export const authorization = (auth: AuthStatus, trueResult: string, falseResult: string) => {
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
  highToLowRatingSorting: (first: Offer, second: Offer) => second.rating - first.rating,
};

export const sortingTypes = {
  popularOffers: (offers: Offers, name: string) => offers.filter((offer) => offer.city.name === name),
  priceLowToHighOffers: (offers: Offers) => offers.sort(sortingMethods.lowToHighPriceSorting),
  priceHighToLowOffers: (offers: Offers) => offers.sort(sortingMethods.highToLowPriceSorting),
  topRatingOffers: (offers: Offers) => offers.sort(sortingMethods.highToLowRatingSorting),
};
