import { FormEvent, SetStateAction, useState } from 'react';
import { sendUserReview } from '../../store/api-actions';
import { CurrentOfferId } from '../../types/models';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentAuth } from '../../store/slices/auth/selectors';
import { AuthorizationStatus, LETTER_LENGTH } from '../../constants';

type OfferFormReviewProps = {
  id: CurrentOfferId;
}
export default function OfferFormReview ({id}: OfferFormReviewProps) {
  const loggedStatus = useAppSelector(getCurrentAuth);
  const [ratingReview, setRating] = useState('');
  const [text, setText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  if (loggedStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  const updateButtonState = (nextText: string, nextRating: string) => {
    if (nextText.length >= LETTER_LENGTH && nextText.length <= 300 && nextRating) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const changeEnableButton = (value: SetStateAction<string>) => {
    const nextText = String(value);
    setText(nextText);
    updateButtonState(nextText, ratingReview);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
    updateButtonState(text, value);
  };

  const handleReviewSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isButtonDisabled || isSubmitting) {
      return;
    }

    void (async () => {
      setIsSubmitting(true);
      const result = await dispatch(sendUserReview({
        offerId: id,
        comment: text,
        rating: Number(ratingReview),
      }));
      if (sendUserReview.fulfilled.match(result)) {
        setText('');
        setRating('');
        setIsButtonDisabled(true);
      }
      setIsSubmitting(false);
    })();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleReviewSubmit}
      data-testid='form-review-container'
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={(evt) => handleRatingChange(evt.target.value)} checked={ratingReview === '5'} data-testid='rating-input-container' disabled={isSubmitting}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={(evt) => handleRatingChange(evt.target.value)} checked={ratingReview === '4'} disabled={isSubmitting}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={(evt) => handleRatingChange(evt.target.value)} checked={ratingReview === '3'} disabled={isSubmitting}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={(evt) => handleRatingChange(evt.target.value)} checked={ratingReview === '2'} disabled={isSubmitting}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-stars" type="radio" onChange={(evt) => handleRatingChange(evt.target.value)} checked={ratingReview === '1'} disabled={isSubmitting}/>
        <label htmlFor="1-stars" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={text} onChange={(evt) => changeEnableButton(evt.target.value)} disabled={isSubmitting} maxLength={300}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{LETTER_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled || isSubmitting}>Submit</button>
      </div>
    </form>
  );
}
