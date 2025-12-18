type OfferFeauturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

export default function OfferFeautures ({bedrooms, type, maxAdults}: OfferFeauturesProps) {
  const upperCaseType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {upperCaseType}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {`${bedrooms} Bedrooms`}
      </li>
      <li className="offer__feature offer__feature--adults">
        {`Max ${maxAdults} adults`}
      </li>
    </ul>
  );
}
