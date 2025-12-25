import { Link,Navigate } from 'react-router-dom';
import { Offer } from '../../types/models.ts';
import cn from 'classnames';
import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer.ts';
import { AppRoute, AuthorizationStatus, RATING_MULTIPLIER } from '../../constants.ts';
import { addFavoriteOffer } from '../../store/api-actions.ts';
import { replaceOffer } from '../../store/slices/offers-slice/offers-action.ts';
type HotelCardProps = {
  offer: Offer;
}

function HotelCard ({offer}: HotelCardProps) {
  const {price, isFavorite, rating, title, type} = offer;
  const bookmarked = isFavorite ? 'Is bookmarks' : 'To bookmarks';
  const ratingValue = rating * RATING_MULTIPLIER;
  const loggedStatus = useAppSelector(getCurrentAuth);
  const dispatch = useAppDispatch();

  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleClick = () => {
    if (loggedStatus !== AuthorizationStatus.Auth) {
      setRedirectToLogin(true);

      return;
    }

    dispatch(addFavoriteOffer(offer));

    dispatch(replaceOffer(offer.id));

  };

  if (redirectToLogin) {
    return <Navigate to={AppRoute.Login} />;
  }

  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={cn('place-card__bookmark-button', 'button', {'place-card__bookmark-button--active': isFavorite})} type="button" onClick={handleClick}>
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

export const HotelCardMemo = memo(HotelCard, (prevProps, nextProps) => prevProps.offer === nextProps.offer);
