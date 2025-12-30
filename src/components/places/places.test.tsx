import { render, screen } from '@testing-library/react';
import { fakeStore } from '../../test/mock';
import { withHistory, withStore } from '../../test/mock-component';
import Places from './places';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: Places', () => {
  const store = fakeStore();

  it('should render Places', () => {
    const { withStoreComponent } = withStore(<Places />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const placesContainer = screen.getByTestId(TestIdMarkups.PlacesTestId);

    expect(placesContainer).toBeInTheDocument();
  });
});
