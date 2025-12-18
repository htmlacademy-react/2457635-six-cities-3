import { City, SortTypes } from './types/models';

export const HEADER_FAVORITE_COUNT = 3;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites/',
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
    name: 'Amsterdam',
    location: {
      latitude: 52.374,
      longitude: 4.88969,
      zoom: 12,
    },
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude:  2.3522,
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
}

export const TIMEOUT_SHOW_ERROR = 2000;
