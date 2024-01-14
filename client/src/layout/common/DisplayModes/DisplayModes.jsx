import PropTypes from "prop-types";
import Cards from "../Cards/cards";
import CardTable from "../Cards/CardTable";

const DisplayModes = ({ cards, display, changeLikeStatus, handleDelete }) => {
  switch (display) {
    case "table":
      return <CardTable cards={cards} />;
    case "cards":
      return (
        <Cards
          cards={cards}
          changeLikeStatus={changeLikeStatus}
          handleDelete={handleDelete}
        />
      );
    default:
      return <div>Invalid display mode: {display}</div>;
  }
};

DisplayModes.propTypes = {
  cards: PropTypes.array.isRequired,
  display: PropTypes.string.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DisplayModes;
