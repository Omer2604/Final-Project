import React from "react";
import PropTypes from "prop-types";

const PageHeader = ({ title, subTitle }) => {
  return (
    <header className="text-center">
      <h1 className="display-4">{title}</h1>
      <h2 className="fs-5">{subTitle}</h2>
    </header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default PageHeader;
