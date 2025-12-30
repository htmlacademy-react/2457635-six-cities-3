import { useAppSelector } from '../../hooks';
import { changeOffers } from '../../store/reducer';
import MainEmptyScreen from '../../pages/main-screen/main-empty-screen';
import { MainPage } from '../../pages/main-screen/main-page';

export const MainScreen = () => {
  const offers = useAppSelector(changeOffers);

  if (offers.length === 0) {
    return <MainEmptyScreen />;
  }

  return <MainPage/>;
};

