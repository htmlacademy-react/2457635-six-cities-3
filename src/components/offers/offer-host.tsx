import { Host } from '../../types';

type OfferHostProps = {
  host: Host;
}

export default function OfferHost ({host}: OfferHostProps) {
  const {userStatus, avatar, text, username} = host;
  const statusMarkup = userStatus === 'Pro' ? <span className="offer__user-status">Pro</span> : '';

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={avatar} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="offer__user-name">
          {username}
        </span>
        {statusMarkup}
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {text}
        </p>
      </div>
    </div>
  );
}
