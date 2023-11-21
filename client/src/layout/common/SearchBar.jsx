import PropTypes from "prop-types";

const SearchBar = ({ handleChange }) => {
  return (
    <div className="col-12 mb-2">
      <input
        type="search"
        className="text-rtl form-control"
        placeholder="חיפוש"
        onInput={handleChange}
        style={{ direction: "rtl" }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
