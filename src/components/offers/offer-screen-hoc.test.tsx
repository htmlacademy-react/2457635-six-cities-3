import { fakeStore } from '../../test/mock';
import { withHistory, withStore } from '../../test/mock-component';
import { TestIdMarkups } from '../../test/testid-markup';
import { CurrentOffer } from '../../types/models';
import { OfferScreenHOC } from './offer-screen-hoc';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Pages: OfferScreenHOC', () => {
  const store = fakeStore();
  const id = store.CURRENT_OFFER.currentOffer.id;

  it('should render OfferScreen', () => {
    const { withStoreComponent } = withStore(<OfferScreenHOC id={id}/>, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByTestId(TestIdMarkups.OfferScreenTestId)).toBeInTheDocument();
  });

  it('should not render OfferScreen when current offer is empty', () => {
    const { withStoreComponent } = withStore(<OfferScreenHOC/>, {...store,
      CURRENT_OFFER: {
        currentOffer: '' as unknown as CurrentOffer,
        isCurrentOfferLoaded: false,
        hasCurrentOfferError: false,
      }
    });
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.queryByTestId(TestIdMarkups.OfferScreenTestId)).not.toBeInTheDocument();
  });
});
