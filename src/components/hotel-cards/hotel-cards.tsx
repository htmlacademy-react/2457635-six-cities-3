import { HotelCardMemo } from './hotel-card.tsx';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { getSortedOffers } from '../../store/reducer.ts';
import { setCurrentCardId } from '../../store/slices/current-card/current-card.tsx';
import { getOfferRoute } from '../../utils.tsx';

export default function HotelCards() {
  const offers = useAppSelector(getSortedOffers);
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-list places__list tabs__content" data-testid='hotel-card-list-container'>
      {offers.map((offer) =>
        (
          <article className='cities__card place-card' key={offer.id} data-testid='hotel-card-list-article'
            onMouseOver={
              () => {
                dispatch(setCurrentCardId(offer.id));
              }
            }
            onMouseLeave={
              () => {
                dispatch(setCurrentCardId(''));
              }
            }
          >
            <div className='cities__image-wrapper place-card__image-wrapper'>
              <Link to={{pathname: getOfferRoute(offer.id)}} state={offer}>
                <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
              </Link>
            </div>
            {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
            <HotelCardMemo offer={offer} key={offer.id}/>
          </article>
        )
      )}
    </div>
  );
}
