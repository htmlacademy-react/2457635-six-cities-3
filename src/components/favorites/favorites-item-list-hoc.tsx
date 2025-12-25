import { ComponentType, useEffect, useState } from 'react' ;
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFavoriteOffers } from '../../store/slices/favorite-offers-slice/favorite-offers-reducer';
import { Offers } from '../../types/models';
import { getFavoriteOffers } from '../../store/api-actions';

type FavoriteItemListHOCProps = {
  offers: Offers;
}

export const FavoriteItemListHOC = (Component: ComponentType<FavoriteItemListHOCProps>) => {
  const FavoriteScreenWrapper = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const offers = useAppSelector(getAllFavoriteOffers);

    useEffect(() => {
      dispatch(getFavoriteOffers());
    }, [dispatch]);

    useEffect(() => {
      if (offers.length !== 0) {
        setLoading(false);
      }
    }, [offers]);

    if (loading) {
      return;
    }

    return <Component offers={offers}/>;
  };

  return FavoriteScreenWrapper;
};
