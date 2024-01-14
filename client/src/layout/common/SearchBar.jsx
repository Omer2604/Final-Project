import PropTypes from "prop-types";

const SearchBar = ({ handleChange, placeholder }) => {
  return (
    <div className="col-12 mb-2">
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        onInput={handleChange}
        style={{ direction: "rtl" }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
