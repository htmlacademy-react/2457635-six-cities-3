import Sorting from '../../components/sorting/sorting.tsx';
import HotelCardList from '../../components/hotel-card/hotel-card-list.tsx';
import Map from '../../components/map/map.tsx';
import TownList from '../../components/towns/town-list.tsx';
import Header from '../../components/header/header.tsx';
import Places from '../../components/places/places.tsx';

export function MainPage () {

  return (
    <div className="page page--gray page--main" data-testid='main-screen-container'>
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <TownList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <Places />
              <Sorting />
              <HotelCardList />
            </section>
            <div className="cities__right-section">
              <section className='map' style={{width: '100%'}}>
                <Map />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
