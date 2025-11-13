export type MainScreenProps = {
  headerFavoriteCount: number;
  foundedPlaces: number;
  hotelsData: HotelsData;
};

export type Hotel = {
  imageSource: string;
  price: number;
  isBookmarked: boolean;
  cardRating: number;
  name: string;
  placeCardType: string;
};

export type HotelsData = Hotel[];
