import { fireEvent, render, screen } from '@testing-library/react';
import { withStore } from '../../test/mock-component';
import { CITIES } from '../../constants';
import Town from './town';
import { extractActionsTypes } from '../../test/mock';
import { changeTown } from '../../store/slices/town/town';
import { TestIdMarkups, townActiveClass } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Component: Town', () => {
  const currentCity = CITIES[0];
  const store = {
    TOWN: {
      currentCity: currentCity,
    }
  };

  it('should render Town', () => {
    const { withStoreComponent } = withStore(<Town town={currentCity} />, store);

    render(withStoreComponent);
    const townContainer = screen.getByTestId(TestIdMarkups.TownTestId);

    expect(townContainer).toBeInTheDocument();
  });

  it('should dispatch "changeTown" when user clicked on town', () => {
    const { withStoreComponent, mockStore } = withStore(<Town town={currentCity} />, store);

    render(withStoreComponent);
    const hrefContainer = screen.getByTestId(TestIdMarkups.TownHrefTestId);
    fireEvent.click(hrefContainer);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([changeTown.type]);
  });

  it('should set class "tabs__item--active" when user clicked on town', () => {
    const { withStoreComponent } = withStore(<Town town={currentCity} />, store);

    render(withStoreComponent);
    const hrefContainer = screen.getByTestId(TestIdMarkups.TownHrefTestId);
    fireEvent.click(hrefContainer);

    expect(hrefContainer).toHaveClass(townActiveClass);
  });
});
