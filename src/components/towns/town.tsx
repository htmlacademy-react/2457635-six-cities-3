import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { City } from '../../types/models';
import { getCityName } from '../../store/slices/town-slice/town-reducer';
import { changeTown } from '../../store/slices/town-slice/town-slice';

type TownProps = {
  town: City;
}

export default function Town({town}: TownProps) {
  const dispatch = useAppDispatch();
  const city = useAppSelector(getCityName);
  const handleClick = () => dispatch(changeTown(town));

  return (
    <li className="locations__item" onClick={handleClick}>
      <a className={classnames('locations__item-link', 'tabs__item', {'tabs__item--active': city === town.name})} href="#">
        <span>{town.name}</span>
      </a>
    </li>
  );
}
