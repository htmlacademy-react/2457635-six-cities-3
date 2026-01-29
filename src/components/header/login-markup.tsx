import { useAppSelector } from '../../hooks';
import { getCurrentAuth } from '../../store/slices/auth/selectors';
import { AuthorizationStatus } from '../../constants';
import { getUserData } from '../../store/slices/user/selectors';
import { Link } from 'react-router-dom';
import { getAllFavoriteOffers } from '../../store/slices/favorite-offers/selectors';

export default function LoginMarkup () {
  const loggedStatus = useAppSelector(getCurrentAuth);
  const user = useAppSelector(getUserData);
  const currentFavoriteOffers = useAppSelector(getAllFavoriteOffers);

  return loggedStatus === AuthorizationStatus.Auth ?
    (
      <Link className="header__nav-link header__nav-link--profile" to={'/favorites'} data-testid='login-markup-container'>
        <div className="header__avatar-wrapper user__avatar-wrapper">
          <img src={user.avatarUrl}></img>
        </div>
        <span className="header__user-name user__name">{user.email}</span>
        <span className="header__favorite-count">{currentFavoriteOffers.length}</span>
      </Link>
    )
    : null;
}
