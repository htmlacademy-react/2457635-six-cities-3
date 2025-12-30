import { CITIES } from '../../constants';
import Town from './town';

export default function TownList () {
  return (
    <ul className="locations__list tabs__list" data-testid='town-list-container'>
      {CITIES.map((town) => <Town key={town.name} town={town} />)}
    </ul>
  );
}
