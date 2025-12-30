import { useState } from 'react';
import { sendUserReview } from '../../store/api-actions';
import { CurrentOfferId } from '../../types/models';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentAuth } from '../../store/slices/auth-slice/auth-reducer';
import { AuthorizationStatus } from '../../constants';

type OfferFormReviewProps = {
  id: CurrentOfferId;
}

export default function OfferFormReview ({id}: OfferFormReviewProps) {
  const loggedStatus = useAppSelector(getCurrentAuth);
  const [ratingReview, setRating] = useState('');
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  if (loggedStatus !== AuthorizationStatus.Auth) {
    return '';
  }

  const handleClick = () => {
    dispatch(sendUserReview({
      offerId: id,
      comment: text,
      rating: Number(ratingReview),
    }));
    setText('');
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={
      (evt) => {
        evt.preventDefault();
        setText(text);
        setRating(ratingReview);
      }
    }
    data-testid='form-review-container'
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={(evt) => setRating(evt.target.value)}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={(evt) => setRating(evt.target.value)}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={(evt) => setRating(evt.target.value)}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={(evt) => setRating(evt.target.value)}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={(evt) => setRating(evt.target.value)}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={text} onChange={(evt) => setText(evt.target.value)}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" onClick={handleClick}>Submit</button>
      </div>
    </form>
  );
}
