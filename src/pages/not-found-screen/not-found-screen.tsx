import { Link } from 'react-router-dom';
import '../../css/no-found-screen.css';
import Image from '../../img/Murlok.png';

export default function NotFoundScreen () {
  return (
    <div className='outer_container'>
      <div className='inner_div'>
        404 Error
        <Link to="/" className='innerLink'>Вернуться на главную</Link>
      </div>
      <img className='image' src={Image} alt='Ёжик в тумане'></img>
    </div>
  );
}
