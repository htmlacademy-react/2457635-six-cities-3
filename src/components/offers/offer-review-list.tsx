import { Reviews } from '../../types/models';
import OfferReview from './offer-review';

type ReviewProps = {
  reviews: Reviews;
};

export default function OfferReviewList ({reviews}: ReviewProps) {
  return (
    <ul className="reviews__list">{reviews.map((currentReview) => <OfferReview currentReview={currentReview} key={currentReview.id}/>)}</ul>
  );
}
