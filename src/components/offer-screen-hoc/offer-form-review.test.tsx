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

  it('should not dispatch "userReview" when the user click on button and the user is authorized when message less than 50 symbols', () => {
    const { withStoreComponent, mockStore } = withStore(<OfferFormReview id={offer.id}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).not.toEqual([sendUserReview.pending.type]);
  });

  it('should not dispatch "userReview" when the user click on button and the user is authorized when the user has not selected the rating', () => {
    const text = 'Tell how was your stay, what you like and what can be improved';
    const { withStoreComponent, mockStore } = withStore(<OfferFormReview id={offer.id}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByRole('button');
    const textArea = screen.getByPlaceholderText(text);
    const userText = 'a'.repeat(50);
    fireEvent.change(textArea, { target: { value: userText } });
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).not.toEqual([sendUserReview.pending.type]);
  });

  it('should dispatch "userReview" when the user click on button and the user is authorized and the user selected the rating and message 50 symbols or more', () => {
    const text = 'Tell how was your stay, what you like and what can be improved';
    const { withStoreComponent, mockStore } = withStore(<OfferFormReview id={offer.id}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const button = screen.getByRole('button');
    const textArea = screen.getByPlaceholderText(text);
    const rating = screen.getByTestId(TestIdMarkups.OfferFormReviewInputTestId);
    const userText = 'a'.repeat(50);
    fireEvent.click(rating);
    fireEvent.change(textArea, { target: { value: userText } });
    fireEvent.click(button);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([sendUserReview.pending.type]);
  });
});
