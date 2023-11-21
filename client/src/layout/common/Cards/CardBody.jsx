import PropTypes from "prop-types";

const CardBody = ({ card }) => {
  // const { price } = card;
  return (
    <div className="card-body p-2">
      <div>לפירוט לחץ על התמונה</div>
    </div>
  );
};

CardBody.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardBody;
