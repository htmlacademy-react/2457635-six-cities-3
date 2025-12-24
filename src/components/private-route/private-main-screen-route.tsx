import { useAppSelector } from '../../hooks';
import { changeOffers } from '../../store/reducer';
import MainEmptyScreen from '../../pages/main-screen/main-empty-screen';

type PrivateMainScreenRouteProps = {
  children: JSX.Element;
}

export default function PrivateMainScreeRoute(props: PrivateMainScreenRouteProps) {
  const {children} = props;
  const offers = useAppSelector(changeOffers);

  if (!offers) {
    return <MainEmptyScreen />;
  }

  return children;
}
