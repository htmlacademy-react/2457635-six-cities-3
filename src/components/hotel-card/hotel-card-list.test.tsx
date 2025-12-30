import { fireEvent, render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../test/mock-component';
import HotelCardList from './hotel-card-list';
import { extractActionsTypes, fakeStore } from '../../test/mock';
import { setCurrentCardId } from '../../store/slices/current-card-slice/current-card-slice';
import { TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: HotelCardList', () => {
  const store = fakeStore();

  it('should render HotelCardList', () => {
    const { withStoreComponent } = withStore(<HotelCardList />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const hotelCardListContainer = screen.getByTestId(TestIdMarkups.HotelCardListTestId);

    expect(hotelCardListContainer).toBeInTheDocument();
  });

  it('should dispatch "setCurrentCardId" when the user hovers over the hotel card', () => {
    const { withStoreComponent, mockStore } = withStore(<HotelCardList />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const article = screen.getAllByTestId(TestIdMarkups.HotelCardListArticleTestId);

    fireEvent.mouseOver(article[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCurrentCardId.type]);
  });

  it('should dispatch "setCurrentCardId" when the user removed the mouse from the hotel card', () => {
    const { withStoreComponent, mockStore } = withStore(<HotelCardList />, store);
    const withHistoryComponent = withHistory(withStoreComponent);

    render(withHistoryComponent);
    const article = screen.getAllByTestId(TestIdMarkups.HotelCardListArticleTestId);

    fireEvent.mouseLeave(article[0]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([setCurrentCardId.type]);
  });
});
