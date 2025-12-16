import {Option} from '../../types/models';

type OfferOptionProps = Option;

export default function OfferOption ({option}: OfferOptionProps) {
  return(
    <li className="offer__inside-item">
      {option}
    </li>
  );
}
