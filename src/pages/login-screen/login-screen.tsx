import { FormEvent, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeTown } from '../../store/slices/town/town';
import { getRandomTown } from '../../utils';
import { AuthStatus } from '../../types/models';
import { AppRoute, AuthorizationStatus } from '../../constants';

type LoginScreenProps = {
  authorizationStatus: AuthStatus;
}
export default function LoginScreen ({authorizationStatus}: LoginScreenProps) {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const randomCity = getRandomTown();
  const handleCityChange = () => dispatch(changeTown(randomCity));

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const passwordValue = passwordRef.current.value;
      const passwordValid = /^(?=.*[A-Za-z])(?=.*\d).+$/.test(passwordValue);
      if (!passwordValid) {
        return;
      }
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordValue
      }));
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login" data-testid='login-container'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required data-testid='email-container'/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required data-testid='password-container' pattern="(?=.*[A-Za-z])(?=.*\\d).+"/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to='/' onClick={handleCityChange}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
