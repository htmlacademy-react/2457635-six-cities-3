import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentOffer } from '../../store/slices/current-offer/current-offer-reducer';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useState } from 'react';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer';
import { addFavoriteOffer } from '../../store/api-actions';
import { replaceOffer } from '../../store/slices/offers-slice/offers-action';
import { Navigate } from 'react-router-dom';
import { getOffer } from '../../store/reducer';
import { setCurrentOfferFavorite } from '../../store/slices/current-offer/current-offer-action';

export default function OfferFavoriteButton () {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getCurrentOffer);
  const favorite = currentOffer.isFavorite;
  const loggedStatus = useAppSelector(getCurrentAuth);
  const bookmarked = favorite ? 'Is bookmarks' : 'To bookmarks';
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const offer = useAppSelector(getOffer);

  const handleClick = () => {
    if (loggedStatus !== AuthorizationStatus.Auth) {
      setRedirectToLogin(true);

      return;
    }

    if (!offer) {
      return;
    }

    dispatch(addFavoriteOffer(offer));
    dispatch(replaceOffer(offer.id));
    dispatch(setCurrentOfferFavorite(!favorite));

  };

  if (redirectToLogin) {
    return <Navigate to={AppRoute.Login} />;
  }

  return (
    <button className={cn('offer__bookmark-button', 'button', {'offer__bookmark-button--active': favorite})} onClick={handleClick} type="button" data-testid='offer-favorite-button-contaner'>
      <svg className="offer__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{bookmarked}</span>
    </button>
  );
}
