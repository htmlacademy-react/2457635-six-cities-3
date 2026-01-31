import { AppRoute, CITIES, REVIEW_LENGTH } from './constants';
import { Offer, Offers, Review, Reviews } from './types/models';

export const getCurrentDate = (convertData: Date) => `${convertData.getFullYear()}-${convertData.getMonth() + 1}-${convertData.getDate()}`;

export const getMonthAndYear = (convertData: Date) => {
  const month = convertData.toLocaleString('en-US', {month: 'long'});
  const normalizedMonth = `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
  return `${normalizedMonth} ${convertData.getFullYear()}`;
};

const sortingMethods = {
  lowToHighPriceSorting: (first: Offer, second: Offer) => first.price - second.price,
  highToLowPriceSorting: (first: Offer, second: Offer) => second.price - first.price,
  highToLowRatingSorting: (first: Offer, second: Offer) => second.rating - first.rating,
};

export const sortingTypes = {
  popularOffers: (offers: Offers, name: string) => offers.filter((offer) => offer.city.name === name),
  priceLowToHighOffers: (offers: Offers) => [...offers].sort(sortingMethods.lowToHighPriceSorting),
  priceHighToLowOffers: (offers: Offers) => [...offers].sort(sortingMethods.highToLowPriceSorting),
  topRatingOffers: (offers: Offers) => [...offers].sort(sortingMethods.highToLowRatingSorting),
};

export const replaceOffersArray = (offers: Offers, id: string) => {
  const currentOfferIndex = offers.findIndex((offer) => offer.id === id);
  if (currentOfferIndex === -1) {
    return offers;
  }
  offers[currentOfferIndex].isFavorite = !offers[currentOfferIndex].isFavorite;

  return offers;
};

export const removeFavoriteOffer = (offers: Offers, currentOffer: Offer) => offers.filter((offer) => offer.id !== currentOffer.id);

const sortMethod = (first: Review, second: Review) => new Date(second.date).getTime() - new Date(first.date).getTime();

export const sortingReview = (reviews: Reviews) => [...reviews].sort(sortMethod).slice(0, REVIEW_LENGTH);

const townSort = (first: Offer, second: Offer) => {
  const firstElem = first.city.name;
  const secondElem = second.city.name;

  if (firstElem > secondElem) {
    return 1;
  }

  if (firstElem === secondElem) {
    return 0;
  }

  return -1;
};

export const deletingDuplicateCities = (offers: Offers) => {
  let town = null;
  const modifiedOffers = structuredClone(offers);

  for (let i = 0; i < modifiedOffers.length; i++) {
    if (modifiedOffers[i].city.name === town) {
      modifiedOffers[i].city.name = '';
    } else {
      town = modifiedOffers[i].city.name;
    }
  }

  return modifiedOffers;
};

export const sortingFavoriteOffers = (offers: Offers) => [...offers].sort(townSort);

export const removeFavoriteOffersData = (offers: Offers) => offers.map((offer) => ({
  ...offer,
  isFavorite: offer.isFavorite ? false : offer.isFavorite,
}));

export const getRandomTown = () => {
  const randomIndex = Math.floor(Math.random() * (CITIES.length - 1));
  return CITIES[randomIndex];
};

export const getOfferRoute = (id: string) => AppRoute.Offer.replace(':id', id);
