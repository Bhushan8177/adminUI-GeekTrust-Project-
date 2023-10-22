import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { Footer } from "../main";
import Modal from "../modal/Modal";
import styles from "./ListingTable.module.css";
import NoDataFound from "../noDataFound/NoDataFound";
const ListingTable = ({
  tableData,
  startIndex,
  endIndex,
  searchTerm,
  filteredData,
  setFilteredData,
  pageCount,
  itemsPerPage,
  totalPages,
  setPageCount,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [activeButton, setActiveButton] = useState(1);

  const isSelectAll = selectedRows.length === itemsPerPage;

  // Checkbox Functions
  const handleRowCheckboxChange = (e, id) => {
    const checked = e.target.checked;
    console.log(checked);
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };
  const handleSelectAll = (e, filteredData) => {
    const isAllChecked = e.target.checked;
    if (isAllChecked) {
      let startIndex = (pageCount - 1) * itemsPerPage;
      let rowsSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < filteredData.length) rowsSelected.push(filteredData[i].id);
        else rowsSelected.push(Math.random());
      }
      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };

  // Delete Functions
  const handleDelete = (id, filteredData) => {
    const updatedData = filteredData.filter((item) => item.id !== id);
    setFilteredData(updatedData);
    if (updatedData.length <= itemsPerPage * (pageCount - 1)) {
      // Decrement the current page to navigate to the previous page
      setPageCount(pageCount - 1);
      setActiveButton(pageCount - 1);
    }
  };

  const handleSelectedDelete = (selectedRows, filteredData) => {
    const updatedData = filteredData.filter(
      (item) => !selectedRows.includes(item.id)
    );
    setFilteredData(updatedData);
    if (updatedData.length <= itemsPerPage * (pageCount - 1)) {
      // Decrement the current page to navigate to the previous page
      setPageCount(pageCount - 1);
      setActiveButton(pageCount - 1);
    }
    setSelectedRows([]);
  };

  // Edit Functions
  const handleEdit = (item) => {
    setIsEdit(true);
    setEditRow(item);
    setPreviousScrollY(window.scrollY);
    document.body.style.overflow = "hidden";
  };

  const handleEditSave = (editedItem) => {
    setFilteredData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id === editedItem.id ? editedItem : item
      );
      return updatedData;
    });

    setEditRow(null);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    setEditRow(null);
    window.scrollTo(0, previousScrollY);
    document.body.style.overflow = "auto";
  };

  // Data Filtering
  const filterData = (searchTerm, tableData) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    let updatedData = [...tableData];
    if (searchTerm.length) {
      updatedData = tableData.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearchTerm) ||
          item.role.toLowerCase().includes(lowerSearchTerm) ||
          item.email.toLowerCase().includes(lowerSearchTerm)
      );
    }
    setFilteredData(updatedData);
  };

  useEffect(() => {
    filterData(searchTerm, tableData);
  }, [searchTerm, tableData]);

  useEffect(() => {}, [pageCount]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={(e) => handleSelectAll(e, filteredData)}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 && (
            <th className={styles.noData}>
              <NoDataFound />
            </th>
          )}
          {filteredData?.slice(startIndex, endIndex).map((member) => (
            <tr key={member.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(member.id)}
                  onChange={(e) => handleRowCheckboxChange(e, member.id)}
                />
              </td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                <BiSolidEdit
                  className={styles.editIcon}
                  onClick={() => handleEdit(member, filteredData)}
                />
                <AiOutlineDelete
                  className={styles.deleteIcon}
                  onClick={() => handleDelete(member.id, filteredData)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        totalPages={totalPages}
        pageCount={pageCount}
        setPageCount={setPageCount}
        selectedRows={selectedRows}
        filteredData={filteredData}
        handleSelectedDelete={handleSelectedDelete}
      />
      {isEdit ? (
        <Modal item={editRow} onCancel={handleCancel} onSave={handleEditSave} />
      ) : null}
    </div>
  );
};

ListingTable.propTypes = {
  tableData: PropTypes.array,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  searchTerm: PropTypes.string,
  filteredData: PropTypes.array,
  setFilteredData: PropTypes.func,
  pageCount: PropTypes.number,
  setPageCount: PropTypes.func,
  itemsPerPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default ListingTable;
