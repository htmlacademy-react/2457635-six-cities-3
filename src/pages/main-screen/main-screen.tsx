import Header from '../../components/header/header.tsx';
import Sorting from '../../components/sort/sorting.tsx';
import HotelCardList from '../../components/hotel-card/hotel-card-list.tsx';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import TownList from '../../components/towns/town-list.tsx';
import { useAppSelector } from '../../hooks/index.ts';
import MainEmptyScreen from './main-empty-screen.tsx';
import { changeOffers, getCityName } from '../../store/reducer.ts';
import '../../css/main-screen-map.css';
import { AuthorizationStatus } from '../../constants.ts';

type MainScreenProps = {
  auth: AuthorizationStatus;
}

export default function MainScreen ({auth}: MainScreenProps) {
  const [currentCard, setCurrentCard] = useState('');
  const offers = useAppSelector(changeOffers);
  const cityName = useAppSelector(getCityName);

  if (offers.length === 0) {
    return <MainEmptyScreen/>;
  }

  return (
    <div className="page page--gray page--main">
      <Header auth={auth}/>

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
              <Sorting />
              <HotelCardList setCurrentCard={setCurrentCard}/>
            </section>
            <div className="cities__right-section">
              <section className='leaflet__map map '>
                <Map offers={offers} selectedCard={currentCard}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
