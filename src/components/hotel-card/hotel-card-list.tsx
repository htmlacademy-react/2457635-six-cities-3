import { HotelCardMemo } from './hotel-card.tsx';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { changeOffers } from '../../store/reducer.ts';
import { setCurrentCardId } from '../../store/slices/current-card-slice/current-card-reducer.ts';

export default function HotelCardList() {
  const offers = useAppSelector(changeOffers);
  const dispatch = useAppDispatch();

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <article className='cities__card place-card' key={offer.id}
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
              <Link to={{pathname: `/offer/${offer.id}`}} state={offer}>
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
