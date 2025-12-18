import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer';
import { getUserData } from '../../store/slices/user-slice/user-reducer';
import { favoriteOffers } from '../../store/slices/offers-slice/offers-reducer';
import { logoutAction } from '../../store/api-actions';

export default function Header () {
  const dispatch = useAppDispatch();
  const loggedStatus = useAppSelector(getCurrentAuth);
  const user = useAppSelector(getUserData);
  const currentFavoriteOffers = useAppSelector(favoriteOffers);
  const handleClick = () => {
    dispatch(logoutAction());
  };
  const loginMarkup = loggedStatus === AuthorizationStatus.Auth ?
    (
      <Link className="header__nav-link header__nav-link--profile" to={'/favorites'}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
          <img src={user.avatarUrl}></img>
        </div>
        <span className="header__user-name user__name">{user.email}</span>
        <span className="header__favorite-count">{currentFavoriteOffers.length}</span>
      </Link>
    )
    : '';

  const signMarkup = loggedStatus === AuthorizationStatus.Auth ? (
    <Link className="header__nav-link" to="/login" onClick={handleClick}>
      <span className="header__signout">{'Sign out'}</span>
    </Link>
  ) : (
    <Link className="header__nav-link" to="/login">
      <span className="header__signin">{'Sign in'}</span>
    </Link>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {loginMarkup}
              </li>
              <li className="header__nav-item">
                {signMarkup}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
