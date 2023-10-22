import DeleteButton from "../buttons/deleteButton";
import PropTypes from "prop-types";
import styles from "./Footer.module.css";
const Footer = ({
  totalPages,
  pageCount,
  setPageCount,
  selectedRows,
  filteredData,
  handleSelectedDelete,
  setActiveButton,
  activeButton,
}) => {
  const handlePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const pageNumbers = handlePageNumbers();
  const handlePreviousPage = () => {
    setPageCount((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setPageCount((prev) => prev + 1);
  };
  const handleFirstPage = () => {
    setPageCount(1);
  };
  const handleLastPage = () => {
    setPageCount(totalPages);
  };
  const handleCurrentPage = (page) => {
    setPageCount(page);
    setActiveButton(page);
  };

  return (
    <>
      {filteredData.length !== 0 ? (
        <div className={styles.wrapper}>
          <DeleteButton
            selectedRows={selectedRows}
            filteredData={filteredData}
            handleSelectedDelete={handleSelectedDelete}
          />
          <div>
            <button
              className={styles.footerButton}
              disabled={pageCount === 1}
              onClick={handleFirstPage}
            >{`<<`}</button>
            <button
              className={styles.footerButton}
              disabled={pageCount === 1}
              onClick={handlePreviousPage}
            >
              {"<"}
            </button>
            {pageNumbers?.map((page) => (
              <button
                className={
                  activeButton === page
                    ? styles.activeButton
                    : styles.footerButton
                }
                key={page}
                onClick={() => handleCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={styles.footerButton}
              disabled={pageCount === totalPages}
              onClick={handleNextPage}
            >{`>`}</button>
            <button
              className={styles.footerButton}
              disabled={pageCount === totalPages}
              onClick={handleLastPage}
            >
              {">>"}
            </button>
          </div>
          <div></div>
        </div>
      ) : null}
    </>
  );
};
Footer.propTypes = {
  totalPages: PropTypes.number,
  pageCount: PropTypes.number,
  setPageCount: PropTypes.func,
  selectedRows: PropTypes.array,
  filteredData: PropTypes.array,
  handleSelectedDelete: PropTypes.func,
  activeButton: PropTypes.number,
  setActiveButton: PropTypes.func,
};
export default Footer;
