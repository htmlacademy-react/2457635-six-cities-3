import { useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { HotelCardMemo } from '../hotel-cards/hotel-card';
import { getCurrentOffer, getNearOffers, getNearOffersLoading } from '../../store/slices/current-offer/selectors';
import { getOfferRoute } from '../../utils';


export default function NearOffers () {
  const offers = useAppSelector(getNearOffers);
  const isNearOffersLoading = useAppSelector(getNearOffersLoading);
  const id = useAppSelector(getCurrentOffer).id;
  const anotherOffers = offers.filter((offer) => offer.id !== id).slice(0, 3);

  if (isNearOffersLoading) {
    return <div className="near-places__list places__list" data-testid='near-offers-container'></div>;
  }

  return(
    <div className="near-places__list places__list" data-testid='near-offers-container'>
      {anotherOffers.map((offer) => (
        <article className="near-places__card place-card" key={offer.id} data-testid='near-offers-article'>
          <div className="near-places__image-wrapper place-card__image-wrapper">
            <Link to={{pathname: getOfferRoute(offer.id)}} state={offer}>
              <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
            </Link>
          </div>
          {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
          <HotelCardMemo offer={offer} key={offer.id}/>
        </article>
      ))}
    </div>
  );
}
