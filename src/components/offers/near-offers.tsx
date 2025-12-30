import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { HotelCardMemo } from '../hotel-card/hotel-card';
import { setCurrentCardId } from '../../store/slices/current-card-slice/current-card-reducer';
import { changeOffers } from '../../store/reducer';
import { getCurrentOffer } from '../../store/slices/current-offer/current-offer-reducer';


export default function NearOffers () {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(changeOffers);
  const id = useAppSelector(getCurrentOffer).id;
  const anotherOffers = offers.filter((offer) => offer.id !== id);

  return(
    <div className="near-places__list places__list" data-testid='near-offers-container'>
      {anotherOffers.map((offer) => (
        <article className="near-places__card place-card" key={offer.id} data-testid='near-offers-article'
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
          <div className="near-places__image-wrapper place-card__image-wrapper">
            <Link to={{pathname: `/offer/${offer.id}`}} state={offer}>
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
