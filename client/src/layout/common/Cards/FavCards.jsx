import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "./card";

const FavoriteCards = ({ cards, user, handleDelete, changeLikeStatus }) => {
  if (!cards.length) return <div>No Favorite cards...</div>;

  const favCards = cards.filter((card) => {
    const { likes } = card;
    if (!likes.length) return null;
    return card;
  });

  if (!favCards.length)
    return (
      <div>
        <p>No Favorite cards...</p>
        <Link to="/">
          Click here to return to the home page and start selecting your
          favorite business cards...
        </Link>{" "}
      </div>
    );

  return (
    <div className="row">
      {favCards.map((card, i) => {
        const { likes } = card;
        let userLikedCard = user && likes.find((id) => id === user._id);
        if (!userLikedCard) return null;

        return (
          <Card
            user={user}
            key={i}
            card={card}
            handleDelete={handleDelete}
            changeLikeStatus={changeLikeStatus}
          />
        );
      })}
    </div>
  );
};

FavoriteCards.propTypes = {
  cards: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
};

export default FavoriteCards;
