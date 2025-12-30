import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../constants';
import App from './app';
import { withHistory, withStore } from '../../test/mock-component';
import { fakeOffers, fakeStore } from '../../test/mock';
import { ComponentMarkups, TestIdMarkups } from '../../test/testid-markup';
import '@testing-library/jest-dom';

describe('Application routing', () => {
  let mockHistory: MemoryHistory;
  const offers = fakeOffers;
  const currentOfferId = offers[0].id;
  const store = fakeStore();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders MainScreen on "/" route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, store);
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(TestIdMarkups.MainScreenTestId)).toBeInTheDocument();
  });

  it('renders LoginScreen on "/login" route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, store);
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(ComponentMarkups.Password)).toBeInTheDocument();
    expect(screen.getByText(ComponentMarkups.Email)).toBeInTheDocument();
  });

  it('renders FavoritesScreen on "/favorites" route and the user is authorized', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {...store,
      AUTH: {
        authStatus: AuthorizationStatus.Auth
      }});
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(ComponentMarkups.SavedListing)).toBeInTheDocument();
  });

  it('renders ErrorScreen on "/*" route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, store);
    mockHistory.push(AppRoute.Error);

    render(withStoreComponent);

    expect(screen.getByText(ComponentMarkups.BackToMain)).toBeInTheDocument();
  });

  it('renders OfferScreen on "/offer/:id" route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, store);
    mockHistory.push(`/offer/${currentOfferId}`);

    render(withStoreComponent);

    expect(screen.getByText(ComponentMarkups.OtherPlaces)).toBeInTheDocument();
  });
});
