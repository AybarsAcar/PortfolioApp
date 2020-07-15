import Pagination from "react-js-pagination";

const AppPagination = (props) => {

  const {count, pageSize, onChange, pageNum} = props;


  const handlePageChange = (page) => {
    onChange(page, pageSize);
  }

  return (
    <Pagination
      itemClass="page-item"
      linkClass="page-link"
      // shows the active page
      activePage={pageNum}
      //count how many pages in total
      itemsCountPerPage={pageSize}
      //number of total items
      totalItemsCount={count}
      //how many pages you want to display in the UI
      pageRangeDisplayed={5}
      //provide a function where you will recieve a page number
      //and set a state with that number
      onChange={handlePageChange}
    />
  );
};

export default AppPagination;
