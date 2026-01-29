import { useEffect } from 'react' ;
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDataCurrentOffer, getNearbyOffers, getReviews } from '../../store/api-actions';
import { changeTown } from '../../store/slices/town/town';
import { getReviewsData, getReviewsLoading } from '../../store/slices/review/selectors';
import { getCurrentOffer, getCurrentOfferError, getCurrentOfferLoading, getNearOffers } from '../../store/slices/current-offer/selectors';
import { OfferPage } from '../../pages/offer-screen/offer-page';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type OfferScreenHOCProps = {
  id?: string;
}
export const OfferScreenHOC = ({id}: OfferScreenHOCProps) => {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getCurrentOffer);
  const reviews = useAppSelector(getReviewsData);
  const isOfferLoading = useAppSelector(getCurrentOfferLoading);
  const hasOfferError = useAppSelector(getCurrentOfferError);
  const isReviewsLoading = useAppSelector(getReviewsLoading);
  const nearOffers = useAppSelector(getNearOffers);
  const preparedReviews = reviews ?? [];
  useEffect(() => {
    if (id !== currentOffer?.id) {
      dispatch(getDataCurrentOffer(id));
      dispatch(getReviews(id));
      dispatch(getNearbyOffers(id));
    }
  }, [currentOffer?.id, dispatch, id]);
  const town = currentOffer?.city ;
  useEffect(() => {
    if (town) {
      dispatch(changeTown(town));
    }
  }, [dispatch, town]);

  if (hasOfferError) {
    return <NotFoundScreen />;
  }

  if (isOfferLoading || isReviewsLoading) {
    return <LoadingScreen />;
  }

  return <OfferPage id={id} currentOffer={currentOffer} reviews={preparedReviews} nearOffers={nearOffers} />;
};
