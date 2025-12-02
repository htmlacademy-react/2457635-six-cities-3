export type AppProps = {
  foundPlace?: number;
  offers: Offers;
};

export type Result = string | number | null | JSX.Element;

export type Host = {
  avatar: string;
  username: string;
  userStatus: string;
  text: string;
}

export type Review = {
  id: number;
  avatar: string;
  name: string;
  date: Date;
  text: string;
};

export type Reviews = Review[];

export type Image = {
  id?: number;
  image: string;
}

export type Feauture = {
  id?: number;
  type: string;
  feauture: string;
}

export type Option = {
  id?: number;
  option: string;
}

export type Offer = {
  images: Image[];
  imageSource: string;
  isPremium: boolean;
  name: string;
  isBookmarks: boolean;
  rating: number;
  ratingValue: number;
  feautures: Feauture[];
  price: number;
  options: Option[];
  id: string;
  placeType: string;
  host: Host;
  reviews: Reviews;
  town: string;
};

export type Offers = Offer[];
