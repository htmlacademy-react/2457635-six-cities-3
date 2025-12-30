import { fireEvent, render, screen } from '@testing-library/react';
import { SORT_TYPES } from '../../constants';
import { withStore } from '../../test/mock-component';
import { SortingTypes } from './sort-types';
import { extractActionsTypes } from '../../test/mock';
import { setSorting } from '../../store/slices/sorting-slice/sorting-slice';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: SortingTypes', () => {
  const sorting = SORT_TYPES[0];
  const store = {
    SORTING: {
      sorting: sorting,
    }
  };

  it('should render SortingTypes', () => {
    const { withStoreComponent } = withStore(<SortingTypes sort={sorting}/>, store);

    render(withStoreComponent);
    const sortTypesContainer = screen.getByTestId(TestIdMarkups.SortTypesTestId);

    expect(sortTypesContainer).toBeInTheDocument();
  });

  it('should dispatch "setSorting" when the user click on sorting', () => {
    const { withStoreComponent, mockStore } = withStore(<SortingTypes sort={sorting}/>, store);

    render(withStoreComponent);
    const sortTypesContainer = screen.getByTestId(TestIdMarkups.SortTypesTestId);
    fireEvent.click(sortTypesContainer);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setSorting.type]);
  });
});
