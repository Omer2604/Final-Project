import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../../css/CardHead.css";

const CardHead = ({ card, isFavorite }) => {
  const {
    _id,
    title,
    image: { url, alt },
  } = card;

  return (
    <div className="card-head">
      <Link to={isFavorite ? "/card-details" : `card-details/${_id}`}>
        <img className="img-fluid" src={url} alt={alt} />
      </Link>
      <div className="p-2 card-content">
        <h5 className="card-title">{title}</h5>
        <hr className="m-0" />
      </div>
    </div>
  );
};

CardHead.propTypes = {
  card: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
};

export default CardHead;
