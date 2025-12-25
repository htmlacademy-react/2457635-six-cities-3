export type City = {
  name: string;
  location: Coordinates;
}

export type IconProperties = {
  iconAnchor: IconAnchor;
  iconSize: IconSize;
}

export type IconSize = L.PointExpression;

export type IconAnchor = L.PointExpression;

export type Coordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Coordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};


export type CurrentOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Coordinates;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};

export type Offers = Offer[];


export type TownsSlice = {
  currentCity: City;
}

export type OffersSlice = {
  offers: Offers;
}

export type SortTypes = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type ErrorSlice = string | null;

export type CurrentOfferId = string | undefined;

export type AuthStatus = 'UNKNOWN' | 'AUTH' | 'NO_AUTH';

export type AuthData = {
  login: string | null;
  password: string | null;
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
}

export type SendReview = {
  offerId: CurrentOfferId;
  comment: string;
  rating: number;
}

export type Reviews = Review[];

export type SendingOfferInfo = {
  offerId: string;
  status: number;
}
