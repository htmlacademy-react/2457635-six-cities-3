import classnames from 'classnames';
import {Feauture} from '../../types/models';

type OfferFeauturesProps = Feauture;

export default function OfferFeautures ({feauture, type}: OfferFeauturesProps) {

  return (
    <li className={classnames('offer__feature', {
      'offer__feature--entire' : type === 'dwelling',
      'offer__feature--bedrooms' : type === 'bedrooms',
      'offer__feature--adults' : type === 'adults',
    })}
    >
      {feauture}
    </li>
  );
}
