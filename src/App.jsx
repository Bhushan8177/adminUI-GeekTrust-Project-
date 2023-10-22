import { useEffect, useState } from "react";
import "./index.css";
import { SearchBar, ListingTable } from "./components/main";
import PropTypes from "prop-types";
import { dataFetching } from "./apis/Api";

function App() {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Variables
  let totalPages = Math.ceil(filteredData.length / 10);
  let itemsPerPage = 10;
  let startIndex = (pageCount - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  const handleDataFetching = async () => {
    try {
      const data = await dataFetching();
      if (data.status === 200) {
        setTableData(data.data);
      }
    } catch (error) {
      throw error.response;
    }
  };

  useEffect(() => {
    handleDataFetching();
  }, []);

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setPageCount={setPageCount}
      />
      <ListingTable
        tableData={tableData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        startIndex={startIndex}
        endIndex={endIndex}
        searchTerm={searchTerm}
        pageCount={pageCount}
        setPageCount={setPageCount}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </>
  );
}

App.propTypes = {
  tableData: PropTypes.array,
  totalPages: PropTypes.number,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
};

export default App;
