import FavoritesItem from './favorites-item.tsx';
import FavoritesEmptyScreen from '../../pages/favorites-screen/favorites-empty-screen.tsx';
import Header from '../header/header.tsx';
import { FavoriteItemListHOC } from './favorites-item-list-hoc.tsx';
import { Offers } from '../../types/models.ts';

type FavoriteItemListProps = {
  offers: Offers;
}

export function FavoritesItemList ({offers}: FavoriteItemListProps) {

  if (offers.length === 0) {
    return <FavoritesEmptyScreen />;
  }

  return (
    <div className="page" data-testid='favorites-item-list-container'>
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {offers.map((offer) => <FavoritesItem offer={offer} key={offer.id}/>)}
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

export const FavoritesScreen = FavoriteItemListHOC(FavoritesItemList);
