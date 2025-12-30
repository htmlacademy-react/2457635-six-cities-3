import { fireEvent, render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import { extractActionsTypes, fakeStore } from '../../test/mock';
import { setCurrentCardId } from '../../store/slices/current-card-slice/current-card-slice';
import NearOffers from './near-offers';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: NearOffers', () => {
  const store = fakeStore();

  it('should render NearOffers', () => {
    const { withStoreComponent } = withStore(<NearOffers />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const nearOffersContainer = screen.getByTestId(TestIdMarkups.NearOffersTestId);

    expect(nearOffersContainer).toBeInTheDocument();
  });

  it('should dispatch "setCurrentCardId" when the user hovered the mouse from the hotel card', () => {
    const { withStoreComponent, mockStore } = withStore(<NearOffers />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const article = screen.getAllByTestId(TestIdMarkups.NearOffersArticleTestId);

    fireEvent.mouseOver(article[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCurrentCardId.type]);
  });

  it('should dispatch "setCurrentCardId" when the user removed the mouse from the hotel card', () => {
    const { withStoreComponent, mockStore } = withStore(<NearOffers />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const article = screen.getAllByTestId(TestIdMarkups.NearOffersArticleTestId);

    fireEvent.mouseLeave(article[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCurrentCardId.type]);
  });
});
