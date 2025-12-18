import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortTypes } from '../../types/models';
import { getCurrentSort } from '../../store/slices/sorting-slice/sorting-reducer';
import { setSorting } from '../../store/slices/sorting-slice/sorting-action';

type SortingTypesProps = {
  sort: SortTypes;
}

export default function SortingTypes({sort}: SortingTypesProps) {
  const currentSort = useAppSelector(getCurrentSort);
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(setSorting(sort));

  return (
    <li className={classnames('places__option', {'places__option--active' : currentSort === sort})} onClick={handleClick} tabIndex={0}>{sort}</li>
  );
}
