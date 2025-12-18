import { Link } from 'react-router-dom';
import { Offer } from '../../types/models.ts';
import classnames from 'classnames';

type HotelCardProps = {
  offer: Offer;
}

export default function HotelCard ({offer}: HotelCardProps) {
  const {price, isFavorite, rating, title, type} = offer;
  const bookmarked = isFavorite ? 'Is bookmarks' : 'To bookmarks';
  const ratingValue = rating * 20;

  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={classnames('place-card__bookmark-button', 'button', {'place-card__bookmark-button--active': isFavorite})} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{bookmarked}</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${ratingValue}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={{pathname: `/offer/${offer.id}`}} state={offer}>{title}</Link>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  );
}
