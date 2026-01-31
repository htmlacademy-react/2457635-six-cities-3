import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getCurrentAuth } from '../../store/slices/auth/selectors';

export default function SignMarkup () {
  const dispatch = useAppDispatch();
  const loggedStatus = useAppSelector(getCurrentAuth);
  const handleSignOutClick = () => {
    dispatch(logoutAction());
  };

  return loggedStatus === AuthorizationStatus.Auth ? (
    <Link className="header__nav-link" to={AppRoute.Login} onClick={handleSignOutClick} data-testid='auth-markup-container'>
      <span className="header__signout">{'Sign out'}</span>
    </Link>
  ) : (
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login} data-testid='no-auth-markup-container'>
      <span className="header__signin">{'Sign in'}</span>
    </Link>
  );
}
