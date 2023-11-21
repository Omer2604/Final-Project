import PropTypes from "prop-types";
import CardBody from "./CardBody";
import CardControllers from "./CardControllers";
import CardHead from "./CardHead";

const Card = ({ card, handleDelete, user, changeLikeStatus }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-3">
      <div className="card px-0">
        <CardHead card={card} />
        <CardBody card={card} />
        <CardControllers
          card={card}
          user={user}
          handleDelete={handleDelete}
          changeLikeStatus={changeLikeStatus}
        />
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeLikeStatus: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Card;
