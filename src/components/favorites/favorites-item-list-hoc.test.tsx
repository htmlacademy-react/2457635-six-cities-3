import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { FavoriteItemListHOC } from './favorites-item-list-hoc';
import { fakeOffers } from '../../test/mock';
import '@testing-library/jest-dom';

describe('HOC: FavoriteItemListHOC', () => {
  const expectedText = 'Wrapped Component';
  const component = () => <div>{expectedText}</div>;
  const ComponentWithHOC = FavoriteItemListHOC(component);

  it('should render the wrapped component when favorite offers are present', () => {
    const { withStoreComponent } = withStore(<ComponentWithHOC />, {
      FAVORITE_OFFERS: {
        favoriteOffers: fakeOffers,
      }
    });
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should not display the wrapped component when the list of favorite offers is empty', () => {
    const { withStoreComponent } = withStore(<ComponentWithHOC />, {
      FAVORITE_OFFERS: {
        favoriteOffers: [],
      }
    });
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);

    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
  });
});
