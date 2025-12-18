import { Link } from 'react-router-dom';
import { HEADER_FAVORITE_COUNT, AuthorizationStatus } from '../../constants';
import { authorization } from '../../utils';
import { useAppSelector } from '../../hooks';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer';

export default function Header () {
  const loggedStatus = useAppSelector(getCurrentAuth);
  const loginMarkup = loggedStatus === AuthorizationStatus.Auth ?
    (
      <a className="header__nav-link header__nav-link--profile" href="#">
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__user-name user__name">{'Oliver.conner@gmail.com'}</span>
        <span className="header__favorite-count">{HEADER_FAVORITE_COUNT}</span>
      </a>
    )
    : '';

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
                <Link className="header__nav-link" to="/login">
                  <span className="header__signout">{authorization(loggedStatus, 'Sign out', 'Sign in')}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
