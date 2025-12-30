import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAllOffers } from '../../store/slices/offers-slice/offers-reducer';
import { OfferScreenHOC } from '../../components/offers/offer-screen-hoc';
import ErrorScreen from '../error-screen/error-screen';

export default function OfferScreen() {
  const {id} = useParams<{id: string}>();
  const offers = useAppSelector(getAllOffers);

  const currentOffer = offers.find((offer) => offer.id === id);

  if (!currentOffer) {
    return <ErrorScreen />;
  }

  return <OfferScreenHOC id={id}/>;
}
