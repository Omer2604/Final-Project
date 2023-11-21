import { faTableCells, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const DisplayControllers = ({ display, handleDisplay }) => {
  return (
    <>
      <button
        className="btn btn-outline-dark me-1"
        onClick={() => handleDisplay(display)}
        disabled={display === "table" ? true : false}
      >
        <FontAwesomeIcon icon={faTableList} />
      </button>

      <button
        className="btn btn-outline-dark ms-1"
        onClick={() => handleDisplay(display)}
        disabled={display === "cards" ? true : false}
      >
        <FontAwesomeIcon icon={faTableCells} />
      </button>
    </>
  );
};

DisplayControllers.propTypes = {
  display: PropTypes.string.isRequired,
  handleDisplay: PropTypes.func.isRequired,
};

export default DisplayControllers;
