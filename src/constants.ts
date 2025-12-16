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

export const CITIES = [
  {
    name: 'Amsterdam',
    lat: 52.374,
    lng: 4.88969,
    id: 0,
  },
  {
    name: 'Paris',
    lat: 48.8566,
    lng:  2.3522,
    id: 1,
  },
  {
    name: 'Cologne',
    lat: 50.9375,
    lng: 6.9603,
    id: 2,
  },
  {
    name: 'Brussels',
    lat: 50.8503,
    lng: 4.3517,
    id: 3,
  },
  {
    name: 'Hamburg',
    lat: 53.5511,
    lng: 9.9937,
    id: 4,
  },
  {
    name: 'Dusseldorf',
    lat: 51.2260,
    lng: 6.7762,
    id: 5,
  }
];
