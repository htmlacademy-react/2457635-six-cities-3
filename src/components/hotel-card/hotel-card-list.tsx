import HotelCard from './hotel-card.tsx';
import {Offers} from '../../types.ts';

type HotelCardListProps = {
  offers: Offers;
  setCurrentCard: (value: string) => void;
};

export default function HotelCardList({offers, setCurrentCard}: HotelCardListProps) {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <HotelCard offer={offer} setCurrentCard={setCurrentCard} key={offer.id}/>)}
    </div>
  );
}
