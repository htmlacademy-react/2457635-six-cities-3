import { CITIES } from '../../constants';
import Town from './town';

export default function TownList () {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((town) => <Town key={town.id} town={town} />)}
    </ul>
  );
}
