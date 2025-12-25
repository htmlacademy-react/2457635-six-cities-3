import { useAppSelector } from '../../hooks';
import './error-message.css';
import { getCurrentError } from '../../store/slices/error-slice/error-reducer';

export default function ErrorMessage() {
  const error = useAppSelector(getCurrentError);

  return(error ? <div className='error-message'>{error}</div> : null);
}
