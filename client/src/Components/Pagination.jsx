import ReactPaginate from "react-paginate";
import styles from "../styles/Paginate.modules.scss";

function Pagination({ totalPages, handlePageClick }) {
  return (
    <>
      <div className="paginate_container">
        <ReactPaginate
          className="paginate"
          previousLabel="Đầu"
          nextLabel="Tiếp"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={totalPages} //tổng
          marginPagesDisplayed={2} //số page đầu cuối
          pageRangeDisplayed={5} //số page ở giữa
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          // forcePage={pageOffset}
        />
      </div>
    </>
  );
}

export default Pagination;
