import { fireEvent, render, screen } from '@testing-library/react';
import { withStore } from '../../test/mock-component';
import { Offers } from '../../types/models';
import ErrorScreen from './error-screen';
import { extractActionsTypes } from '../../test/mock';
import { fetchOfferAction } from '../../store/api-actions';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: ErrorScreen', () => {
  const store = {
    OFFERS: {
      offers: [] as Offers,
      isOffersLoaded: false,
    }
  };

  it('should render ErrorScreen', () => {
    const { withStoreComponent } = withStore(<ErrorScreen />, store);

    render(withStoreComponent);
    const errorContainer = screen.getByTestId(TestIdMarkups.ErrorTestId);

    expect(errorContainer).toBeInTheDocument();
  });

  it('should dispatch "fetchOfferAction.pending" when the user click on button', () => {
    const { withStoreComponent, mockStore } = withStore(<ErrorScreen />, store);

    render(withStoreComponent);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
    ]);
  });
});
