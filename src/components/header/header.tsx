import { Link } from 'react-router-dom';
import { HEADER_FAVORITE_COUNT, AuthorizationStatus } from '../../constants';
import { authorization } from '../../utils';

type Auth = {
  auth?: AuthorizationStatus;
}

export default function Header ({auth = AuthorizationStatus.NoAuth}: Auth) {
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
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{authorization(auth, 'Oliver.conner@gmail.com', '')}</span>
                  <span className="header__favorite-count">{authorization(auth, HEADER_FAVORITE_COUNT, null)}</span>
                </a>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to="#">
                  <span className="header__signout">{authorization(auth, 'Sign out', 'Sign in')}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
