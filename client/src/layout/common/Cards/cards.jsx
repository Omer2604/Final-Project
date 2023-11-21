import PropTypes from "prop-types";
import Card from "./card";
import { getCurrentUser } from "./../../../services/userService";

const Cards = ({ cards, handleDelete, changeLikeStatus }) => {
  if (!cards.length) return <div>No Cards In The State Object...</div>;

  const user = getCurrentUser();

  return (
    <div className="row">
      {cards.map((card, i) => (
        <Card
          key={i}
          card={card}
          handleDelete={handleDelete}
          user={user}
          changeLikeStatus={changeLikeStatus}
        />
      ))}
    </div>
  );
};

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
};

export default Cards;
