import { useParams } from 'react-router-dom';
import { OfferScreenHOC } from '../../components/offer-screen-hoc/offer-screen-hoc';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function OfferScreen() {
  const {id} = useParams<{id: string}>();
  if (!id) {
    return <NotFoundScreen />;
  }

  return <OfferScreenHOC id={id}/>;
}
