import Header from '../../components/header/header.tsx';
import HotelCardList from '../../components/hotel-card/hotel-card-list.tsx';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import TownList from '../../components/towns/town-list.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import MainEmptyScreen from './main-empty-screen.tsx';
import { changeOffers, getCityName } from '../../store/reduser.ts';

export default function MainScreen () {
  const [currentCard, setCurrentCard] = useState('');
  const offers = useAppSelector((state) => changeOffers(state));
  const cityName = useAppSelector((state) => getCityName(state));

  if (offers.length === 0) {
    return <MainEmptyScreen/>;
  }

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <TownList/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {cityName}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-capti`on">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <HotelCardList setCurrentCard={setCurrentCard}/>
            </section>
            <div className="cities__right-section">
              <section className='cities__map map '>
                <Map offers={offers} selectedCard={currentCard}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
