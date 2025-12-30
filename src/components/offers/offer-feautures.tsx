type OfferFeauturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

export default function OfferFeautures ({bedrooms, type, maxAdults}: OfferFeauturesProps) {
  const upperCaseType = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';

  return (
    <ul className="offer__features" data-testid='feautures-container'>
      <li className="offer__feature offer__feature--entire" data-testid='feautures'>
        {upperCaseType}
      </li>
      <li className="offer__feature offer__feature--bedrooms" data-testid='feautures'>
        {`${bedrooms} Bedrooms`}
      </li>
      <li className="offer__feature offer__feature--adults" data-testid='feautures'>
        {`Max ${maxAdults} adults`}
      </li>
    </ul>
  );
}
