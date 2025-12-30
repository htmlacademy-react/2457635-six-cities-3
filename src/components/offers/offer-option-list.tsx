import OfferOption from './offer-option';

type OfferOptionListProps = {
  goods: string[];
}

export default function OfferOptionList ({goods}: OfferOptionListProps) {
  return(
    <ul className="offer__inside-list" data-testid='option-list-container'>
      {goods && goods.map((option) => <OfferOption key={option} option={option}/>)}
    </ul>
  );
}
