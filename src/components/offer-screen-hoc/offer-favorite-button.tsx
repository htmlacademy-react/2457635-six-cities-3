import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentOffer } from '../../store/slices/current-offer/selectors';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useState } from 'react';
import { getCurrentAuth } from '../../store/slices/auth/selectors';
import { addFavoriteOffer } from '../../store/api-actions';
import { replaceOffer } from '../../store/slices/offers/actions';
import { Navigate } from 'react-router-dom';
import { getOffer } from '../../store/reducer';
import { setCurrentOfferFavorite } from '../../store/slices/current-offer/actions';

export default function OfferFavoriteButton () {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getCurrentOffer);
  const favorite = currentOffer?.isFavorite ?? false;
  const loggedStatus = useAppSelector(getCurrentAuth);
  const bookmarked = favorite ? 'Is bookmarks' : 'To bookmarks';
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const offer = useAppSelector(getOffer);

  const handleFavoriteToggle = () => {
    if (loggedStatus !== AuthorizationStatus.Auth) {
      setRedirectToLogin(true);

      return;
    }

    const targetOffer = offer ?? currentOffer;
    if (!targetOffer?.id) {
      return;
    }

    dispatch(addFavoriteOffer({id: targetOffer.id, isFavorite: targetOffer.isFavorite}));
    dispatch(replaceOffer(targetOffer.id));
    dispatch(setCurrentOfferFavorite(!favorite));

  };

  if (redirectToLogin) {
    return <Navigate to={AppRoute.Login} />;
  }

  return (
    <button className={cn('offer__bookmark-button', 'button', {'offer__bookmark-button--active': favorite})} onClick={handleFavoriteToggle} type="button" data-testid='offer-favorite-button-contaner'>
      <svg className="offer__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{bookmarked}</span>
    </button>
  );
}
