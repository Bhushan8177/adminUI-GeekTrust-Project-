import PropTypes from "prop-types";
import styles from "./DeleteButton.module.css";
const DeleteButton = ({ selectedRows, filteredData, handleSelectedDelete }) => {
  return (
    <button
      className={styles.deleteButton}
      onClick={() => handleSelectedDelete(selectedRows, filteredData)}
    >
      Delete Selected
    </button>
  );
};
DeleteButton.propTypes = {
  filteredData: PropTypes.array,
  selectedRows: PropTypes.array,
  handleSelectedDelete: PropTypes.func,
};

export default DeleteButton;
