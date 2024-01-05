import React from "react";
import PropTypes from "prop-types";

const Textarea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group mb-1">
      <label htmlFor={name}>{label}</label>
      <textarea {...rest} name={name} id={name} className="form-control" />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default Textarea;
