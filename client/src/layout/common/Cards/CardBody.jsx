import PropTypes from "prop-types";

const CardBody = ({ card }) => {
  const { מחיר } = card;
  return (
    <div className="card-body p-2">
      <div>
        <strong>מחיר: </strong>
        {מחיר}
      </div>
    </div>
  );
};

CardBody.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardBody;
