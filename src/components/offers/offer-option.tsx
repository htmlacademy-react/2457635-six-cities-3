type OfferOptionProps = {
  option: string;
};

export default function OfferOption ({option}: OfferOptionProps) {
  return(
    <li className="offer__inside-item">
      {option}
    </li>
  );
}
