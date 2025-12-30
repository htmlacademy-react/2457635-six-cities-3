import { fireEvent, render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../constants';
import { extractActionsTypes, fakeOffer } from '../../test/mock';
import { withHistory, withStore } from '../../test/mock-component';
import OfferFormReview from './offer-form-review';
import { sendUserReview } from '../../store/api-actions';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: OfferFormReview', () => {
  const offer = fakeOffer();
  const store = {
    AUTH: {
      authStatus: AuthorizationStatus.Auth,
    }
  };

  it('should render OfferFormReview', () => {
    const { withStoreComponent } = withStore(<OfferFormReview id={offer.id}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const formReviewContainer = screen.getByTestId(TestIdMarkups.FormReviewTestId);

    expect(formReviewContainer).toBeInTheDocument();
  });

  it('should not render component when the user is not authorized', () => {
    const { withStoreComponent } = withStore(<OfferFormReview id={offer.id}/>, {...store, AUTH: {authStatus: AuthorizationStatus.NoAuth}});
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const formReviewContainer = screen.queryByTestId(TestIdMarkups.FormReviewTestId);

    expect(formReviewContainer).not.toBeInTheDocument();
  });

  it('should dispatch "userReview" when the user click on button and the user is authorized', () => {
    const { withStoreComponent, mockStore } = withStore(<OfferFormReview id={offer.id}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([sendUserReview.pending.type]);
  });
});
