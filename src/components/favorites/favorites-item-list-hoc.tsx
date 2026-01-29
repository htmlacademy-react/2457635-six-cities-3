import { ComponentType, useEffect, useState } from 'react' ;
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFavoriteOffers } from '../../store/slices/favorite-offers/selectors';
import { Offers } from '../../types/models';
import { getFavoriteOffers } from '../../store/api-actions';
import { sortingFavoriteOffers } from '../../utils';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type FavoriteItemListHOCProps = {
  offers: Offers;
}

export const FavoriteItemListHOC = (Component: ComponentType<FavoriteItemListHOCProps>) => {
  const FavoriteScreenWrapper = () => {
    const dispatch = useAppDispatch();
    const offers = useAppSelector(getAllFavoriteOffers);
    const [loading, setLoading] = useState(offers.length === 0);

    useEffect(() => {
      dispatch(getFavoriteOffers());
    }, [dispatch]);

    useEffect(() => {
      setLoading(false);
    }, [offers]);

    if (loading) {
      return <LoadingScreen />;
    }

    return <Component offers={sortingFavoriteOffers(offers)}/>;
  };

  return FavoriteScreenWrapper;
};
