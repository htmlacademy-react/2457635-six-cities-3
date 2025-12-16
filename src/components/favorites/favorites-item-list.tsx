import FavoritesItem from './favorites-item.tsx';
import Header from '../header/header.tsx';
import { AuthorizationStatus } from '../../constants.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { getAllOffers } from '../../store/reduser.ts';

type FavoritesItemListProps = {
  auth: AuthorizationStatus;
}

export default function FavoritesItemList ({auth}: FavoritesItemListProps) {
  const offers = useAppSelector((state) => getAllOffers(state));
  return (
    <div className="page">
      <Header auth={auth}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {offers.map((offer) => offer.isBookmarks ? <FavoritesItem offer={offer} key={offer.id}/> : '')}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}
