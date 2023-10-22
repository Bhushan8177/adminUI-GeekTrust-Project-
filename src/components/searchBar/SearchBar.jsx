import PropTypes from "prop-types";
import { memo } from "react";
import styles from "./SearchBar.module.css";
const SearchBar = memo(({ searchTerm, setSearchTerm, setPageCount }) => {
  
  // searching Functionality
  const handleInputChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
    setPageCount(1);
  };
  
  return (
    <div>
      <input
        className={styles.wrapper}
        name="searchTerm"
        value={searchTerm}
        placeholder="Search by name, email or role"
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
});
SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  setPageCount: PropTypes.func,
};
SearchBar.displayName = "SearchBar";
export default SearchBar;
