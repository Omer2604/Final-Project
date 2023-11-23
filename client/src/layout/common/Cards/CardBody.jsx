import PropTypes from "prop-types";

const CardBody = () => {
  return (
    <div className="card-body p-2" style={{ textAlign: "right" }}>
      <div>לפירוט לחץ על התמונה</div>
    </div>
  );
};

CardBody.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardBody;
