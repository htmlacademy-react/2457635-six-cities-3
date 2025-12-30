import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from './components/history-route/history-route';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      {component}
    </HistoryRouter>
  );
}
