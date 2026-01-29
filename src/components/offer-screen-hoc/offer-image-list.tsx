import OfferImage from './offer-image';

type OfferImageListProps = {
  images: string[];
}


export default function OfferImageList ({images}: OfferImageListProps) {
  return (
    <div className="offer__gallery" data-testid='offer-image-list-container'>
      {images && images.slice(0, 6).map((image) => <OfferImage key={image} image={image}/>)}
    </div>
  );
}
