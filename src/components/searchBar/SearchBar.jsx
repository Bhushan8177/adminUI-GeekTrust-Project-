import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import styles from "./SearchBar.module.css";
import glass from "../../assets/glass.svg";

const SearchBar = memo(({ searchTerm, setSearchTerm, setPageCount }) => {
  
  // searching Functionality
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setPageCount(1);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
      setPageCount(1);
      console.log("handleKeyPress clicked : " + e.target.value);
    }
  };
  const handleClick = () => {
    setPageCount(1);
    console.log("handleClick clicked : " + searchTerm);
  }
  
  return (
    <div className={styles.wrapper}>
      <img src={glass} alt="Search" className={styles.icon} onClick={() => handleClick()}/>
      <input
        className={styles.inputWrapper}
        name="searchTerm"
        value={searchTerm}
        placeholder="Search by name, email or role"
        onChange={(e) => handleInputChange(e)}
        onKeyPress={(e) => handleKeyPress(e)}
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
