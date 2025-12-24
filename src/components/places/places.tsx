import { useAppSelector } from '../../hooks';
import { changeOffers } from '../../store/reducer';
import { getCityName } from '../../store/slices/town-slice/town-reducer';

export default function Places () {
  const offers = useAppSelector(changeOffers);
  const cityName = useAppSelector(getCityName);

  return <b className="places__found">{offers.length} places to stay in {cityName}</b>;
}
