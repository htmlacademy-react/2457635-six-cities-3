import Header from '../../components/header/header';
import OfferFormReview from '../../components/offers/offer-form-review';
import { CurrentOffer, Reviews } from '../../types/models';
import OfferHost from '../../components/offers/offer-host';
import OfferFeautures from '../../components/offers/offer-feautures';
import OfferReviewList from '../../components/offers/offer-review-list';
import LoadingScreen from '../loading-screen/loading-screen';
import NearOffers from '../../components/offers/near-offers';
import Map from '../../components/map/map';
import OfferOptionList from '../../components/offers/offer-option-list';
import OfferImageList from '../../components/offers/offer-image-list';
import OfferFavoriteButton from '../../components/offers/offer-favorite-button';

type OfferScreenProps = {
  id?: string;
  currentOffer: CurrentOffer;
  reviews: Reviews;
}

export function OfferPage ({id, currentOffer, reviews}: OfferScreenProps) {

  if (currentOffer === null) {
    return <LoadingScreen />;
  }

  const {isPremium, title, rating, bedrooms, type, maxAdults, price, goods, host, description, images} = currentOffer;
  const ratingValue = rating * 20;

  return (
    <div className="page" data-testid='offer-screen-container'>
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            {<OfferImageList images={images}/>}
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? <div className="offer__mark"><span>Premium</span></div> : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <OfferFavoriteButton />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${ratingValue}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              {maxAdults && bedrooms && <OfferFeautures type={type} bedrooms={bedrooms} maxAdults={maxAdults}/>}
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {<OfferOptionList goods={goods} />}
              </div>
              {host && <OfferHost host={host} description={description}/>}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews && reviews.length}</span></h2>
                {reviews && <OfferReviewList reviews={reviews}/>}
                {<OfferFormReview id={id}/>}
              </section>
            </div>
          </div>
          <section className='map' style={{width: '100%'}}>
            <Map />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {<NearOffers/>}
          </section>
        </div>
      </main>
    </div>
  );
}
