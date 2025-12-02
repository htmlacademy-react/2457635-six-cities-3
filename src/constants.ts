export const HEADER_FAVORITE_COUNT = 3;

export const FOUND_PLACES_COUNT = 312;

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
