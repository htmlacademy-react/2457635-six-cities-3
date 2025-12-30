type OfferOptionProps = {
  option: string;
};

export default function OfferOption ({option}: OfferOptionProps) {
  return(
    <li className="offer__inside-item" data-testid='option-container'>
      {option}
    </li>
  );
}
