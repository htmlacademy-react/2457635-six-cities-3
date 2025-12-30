type UserHost = {
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  description: string;
};

export default function OfferHost ({host, description}: UserHost) {
  const {name, avatarUrl, isPro} = host;
  const statusMarkup = isPro ? <span className="offer__user-status">Pro</span> : '';

  return (
    <div className="offer__host" data-testid='host-container'>
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
        </div>
        <span className="offer__user-name">
          {name}
        </span>
        {statusMarkup}
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {description}
        </p>
      </div>
    </div>
  );
}
