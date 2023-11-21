import PropTypes from "prop-types";

const CardDetailsHeader = ({ title, subTitle }) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{subTitle}</p>
      <hr />
    </>
  );
};

CardDetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default CardDetailsHeader;
