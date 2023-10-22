import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Modal.module.css";
const Modal = ({ item, onCancel, onSave }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSaveClick = (editedItem) => {
    onSave(editedItem);
    onCancel();
  };

  return (
    <form>
      <div className={styles.wrapper}></div>
      <div className={styles.inputWrapper}>
        <label htmlFor="name">Name </label>

        <input
          name="name"
          id="name"
          type="text"
          value={editedItem.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="email">Email </label>

        <input
          name="email"
          id="email"
          type="email"
          value={editedItem.email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="role">Role :</label>
        <select
          id="role"
          name="role"
          value={editedItem.role}
          onChange={handleChange}
        >
          <option value="member">member</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.saveButton}
          onClick={() => handleSaveClick(editedItem)}
        >
          Save
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
Modal.propTypes = {
  onCancel: PropTypes.func,
  editedData: PropTypes.object,
  setEditedData: PropTypes.func,
  onSave: PropTypes.func,
  item: PropTypes.object,
};

export default Modal;
