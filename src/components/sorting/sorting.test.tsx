import { fireEvent, render, screen } from '@testing-library/react';
import { SORT_TYPES } from '../../constants';
import { withStore } from '../../test/mock-component';
import Sorting from './sorting';
import { TestIdMarkups, hiddenUlSortClass } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: Sorting', () => {
  const store = {
    SORTING: {
      sorting: SORT_TYPES[0],
    }
  };
  it('should render Sorting', () => {
    const { withStoreComponent } = withStore(<Sorting />, store);

    render(withStoreComponent);
    const sortingContainer = screen.getByTestId(TestIdMarkups.SortTestId);

    expect(sortingContainer).toBeInTheDocument();
  });

  it('should set class "places__options--opened" to unsorted list when the user clicked on form', () => {
    const { withStoreComponent } = withStore(<Sorting />, store);

    render(withStoreComponent);
    const sortingContainer = screen.getByTestId(TestIdMarkups.SortTestId);
    const expectedClass = screen.getByTestId(TestIdMarkups.SortUnsortedListTestId);
    fireEvent.click(sortingContainer);

    expect(expectedClass).toHaveClass(hiddenUlSortClass);
  });

  it('should set and remove class "places__options--opened" to unsorted list when the user two clicked on form', () => {
    const { withStoreComponent } = withStore(<Sorting />, store);

    render(withStoreComponent);
    const sortingContainer = screen.getByTestId(TestIdMarkups.SortTestId);
    const expectedClass = screen.getByTestId(TestIdMarkups.SortUnsortedListTestId);
    fireEvent.dblClick(sortingContainer);

    expect(expectedClass).not.toHaveClass(hiddenUlSortClass);
  });
});
