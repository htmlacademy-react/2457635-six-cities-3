import { City, SortTypes } from './types/models';

export const LETTER_LENGTH = 50;
export const REVIEW_MIN_LENGTH = 50;
export const REVIEW_MAX_LENGTH = 300;

export const REVIEW_LENGTH = 10;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  Error = '/*',
}
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const SORT_TYPES: SortTypes[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude:  2.3522,
      zoom: 12,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.374,
      longitude: 4.88969,
      zoom: 12,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 12,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 12,
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 12,
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2260,
      longitude: 6.7762,
      zoom: 12,
    }
  }
];

export enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

export const TIMEOUT_SHOW_ERROR = 2000;

export enum NameSpace {
  Auth = 'AUTH',
  Error = 'ERROR',
  Offers = 'OFFERS',
  Sorting = 'SORTING',
  Town = 'TOWN',
  User = 'USER',
  Review = 'REVIEW',
  CurrentOffer = 'CURRENT_OFFER',
  CurrentCard = 'CURRENT_CARD',
  FavoriteOffers = 'FAVORITE_OFFERS',
}

export const RATING_MULTIPLIER = 20;

export enum ErrorMessages {
  NoID = 'ID не передан',
  FailLoadData = 'Не удалось загрузить данные',
  FailAddFavorite = 'Не удалось добавить/удалить избранное',
}

export enum SORTING_TYPES {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}
