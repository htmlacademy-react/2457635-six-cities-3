import { ComponentType, useEffect, useState } from 'react' ;
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getDataCurrentOffer, getReviews } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { changeTown } from '../../store/action';
import { CurrentOffer, Reviews } from '../../types/models';
import { getCurrentOffer, getReviewsData } from '../../store/slices/offers-slice/offers-reducer';

type OfferScreenProps = {
  id?: string;
  currentOffer: CurrentOffer;
  reviews: Reviews;
}

export const OfferScreenHOC = (Component: ComponentType<OfferScreenProps>) => {
  const OfferScreenWrapper = (props: OfferScreenProps) => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    const [loading, setLoading] = useState(true);
    const currentOffer = useAppSelector(getCurrentOffer);
    const reviews = useAppSelector(getReviewsData);

    useEffect(() => {
      if (id !== currentOffer?.id) {
        dispatch(getDataCurrentOffer(id));
        dispatch(getReviews(id));
      }
    }, [currentOffer?.id, dispatch, id]);

    const town = currentOffer?.city ;

    useEffect(() => {
      if (currentOffer) {
        setLoading(false);
      }
    }, [currentOffer]);

    useEffect(() => {
      if (town) {
        dispatch(changeTown(town));
      }
    }, [dispatch, town]);

    if (loading) {
      return;
    }

    return <Component {...props} id={id} currentOffer={currentOffer} reviews={reviews}/>;
  };

  return OfferScreenWrapper;
};
