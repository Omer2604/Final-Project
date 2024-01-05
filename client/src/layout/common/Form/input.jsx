import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group mb-1">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Input;
