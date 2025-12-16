import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSorting } from '../../store/action';
import { getCurrentSort } from '../../store/reducer';

type SortingTypesProps = {
  sort: string;
}

export default function SortingTypes({sort}: SortingTypesProps) {
  const currentSort = useAppSelector(getCurrentSort);
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(setSorting(sort));

  return (
    <li className={classnames('places__option', {'places__option--active' : currentSort === sort})} onClick={handleClick} tabIndex={0}>{sort}</li>
  );
}
