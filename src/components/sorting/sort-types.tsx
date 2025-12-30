import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortTypes } from '../../types/models';
import { getCurrentSort } from '../../store/slices/sorting-slice/sorting-reducer';
import { setSorting } from '../../store/slices/sorting-slice/sorting-slice';
import { memo } from 'react';

type SortingTypesProps = {
  sort: SortTypes;
}

export function SortingTypes({sort}: SortingTypesProps) {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getCurrentSort);
  const handleClick = () => dispatch(setSorting(sort));

  return (
    <li className={cn('places__option', {'places__option--active' : currentSort === sort})} onClick={handleClick} tabIndex={0} data-testid='sort-types-container'>{sort}</li>
  );
}

export const SortingTypesMemo = memo(SortingTypes, (prevProps, nextProps) => prevProps.sort === nextProps.sort);
