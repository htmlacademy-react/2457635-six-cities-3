import Header from '../../components/header/header';
import Map from '../../components/map/map';
import { AuthorizationStatus } from '../../constants';
import OfferFormReview from '../../components/offers/offer-form-review';
import { CurrentOffer, Reviews } from '../../types/models';
import OfferImage from '../../components/offers/offer-image';
import OfferHost from '../../components/offers/offer-host';
import OfferFeautures from '../../components/offers/offer-feautures';
import OfferOption from '../../components/offers/offer-option';
import { Link } from 'react-router-dom';
import HotelCard from '../../components/hotel-card/hotel-card';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { changeOffers } from '../../store/reducer';
import OfferReviewList from '../../components/offers/offer-review-list';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer';
import { OfferScreenHOC } from './offer-screen-hoc';

type OfferScreenProps = {
  id?: string;
  currentOffer: CurrentOffer;
  reviews: Reviews;
}

export function OfferScreen ({id, currentOffer, reviews}: OfferScreenProps) {
  const loggedStatus = useAppSelector(getCurrentAuth);
  const offers = useAppSelector(changeOffers);
  const [currentCard, setCurrentCard] = useState<string>('');

  if (currentOffer === null) {
    return;
  }

  const {images, isPremium, title, isFavorite, rating, bedrooms, type, maxAdults, price, goods, host, description} = currentOffer;
  const bookmarked = isFavorite ? 'Is bookmarks' : 'To bookmarks';
  const anotherOffers = offers.filter((offer) => offer.id !== id);

  const ratingValue = rating * 20;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => <OfferImage key={image} image={image}/>)}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? <div className="offer__mark"><span>Premium</span></div> : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{bookmarked}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${ratingValue}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <OfferFeautures type={type} bedrooms={bedrooms} maxAdults={maxAdults}/>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((option) => <OfferOption key={option} option={option}/>)}
                </ul>
              </div>
              {host ? <OfferHost host={host} description={description}/> : ''}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                {reviews ? <OfferReviewList reviews={reviews}/> : ''}
                {loggedStatus === AuthorizationStatus.Auth ? <OfferFormReview/> : ''}
              </section>
            </div>
          </div>
          <section className='map' style={{width: '100%'}}>
            <Map offers={anotherOffers} selectedCard={currentCard} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {anotherOffers.map((offer) => (
                <article className="near-places__card place-card" key={offer.id}
                  onMouseOver={
                    () => {
                      setCurrentCard(offer.id);
                    }
                  }
                  onMouseLeave={
                    () => {
                      setCurrentCard('');
                    }
                  }
                >
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <Link to={{pathname: `/offer/${offer.id}`}} state={offer}>
                      <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
                    </Link>
                  </div>
                  {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
                  <HotelCard offer={offer} key={offer.id}/>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export const OfferScreenWithHOC = OfferScreenHOC(OfferScreen);
