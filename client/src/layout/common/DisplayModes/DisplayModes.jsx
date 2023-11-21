import PropTypes from "prop-types";
import Cards from "../Cards/cards";
import CardTable from "../Cards/CardTable";

const DisplayModes = ({ cards, display, changeLikeStatus, handleDelete }) => {
  if (!cards.length) return <div>אין כרגע כרטיסים שיצרתם</div>;

  if (display === "table") {
    return <CardTable cards={cards} />;
  }

  if (display === "cards") {
    return (
      <Cards
        cards={cards}
        changeLikeStatus={changeLikeStatus}
        handleDelete={handleDelete}
      />
    );
  }

  return <div>Invalid display mode: {display}</div>;
};

DisplayModes.propTypes = {
  cards: PropTypes.array.isRequired,
  display: PropTypes.string.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DisplayModes;
