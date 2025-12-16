import {Navigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../constants';
import { useAppSelector } from '../../hooks';
import { changeOffers } from '../../store/reduser';

type PrivateOfferRouteProps = {
  children: JSX.Element;
}

export default function PrivateOfferRoute(props: PrivateOfferRouteProps) {
  const {children} = props;
  const id = useParams<{id: string}>();
  const offers = useAppSelector((state) => changeOffers(state));

  const currentOffer = offers.find((offer) => offer.id === id.id);

  if (!currentOffer) {
    return <Navigate to={AppRoute.Error} />;
  }

  return children;
}
