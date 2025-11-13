import MainScreen from '../pages/main-screen';
import {MainScreenProps} from '../types.ts';

export default function App({headerFavoriteCount, foundedPlaces, hotelsData}: MainScreenProps): JSX.Element {
  return (
    <MainScreen headerFavoriteCount={headerFavoriteCount} foundedPlaces={foundedPlaces} hotelsData= {hotelsData} />
  );
}
