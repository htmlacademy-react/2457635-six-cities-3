import OfferImage from './offer-image';

type OfferImageListProps = {
  images: string[];
}


export default function OfferImageList ({images}: OfferImageListProps) {
  return (
    <div className="offer__gallery" data-testid='offer-image-list-container'>
      {images && images.slice(0, 6).map((image, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <OfferImage key={`${image}-${index}`} image={image}/>
      ))}
    </div>
  );
}
