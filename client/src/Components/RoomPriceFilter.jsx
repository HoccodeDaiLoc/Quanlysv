import { useState, useEffect } from "react";
import styles from "../styles/Rooms.modules.scss";
import { fetchRoomByPrice } from "../service/RoomService";
import ReactPaginate from "react-paginate";

import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import DropDownBoostrap from "./DropDownBoostrap";

function RoomPriceFilter() {
  const params = useSearchParams();

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(params[0].get("page"));
  const location = useLocation(); // biến location chứa pathnam e
  const lowerPrice = params[0].get("lp");
  const higherPrice = params[0].get("rp");
  useEffect(() => {
    const fetchDataBasedOnLocation = async () => {
      const res = await fetchRoomByPrice(lowerPrice, higherPrice, currentPage);
      setItems(res.room);
      setTotalPages(res.total_pages);
    };
    fetchDataBasedOnLocation();
  }, [currentPage]);

  useEffect(() => {
    const fetchDataBasedOnLocation = async () => {
      const res = await fetchRoomByPrice(lowerPrice, higherPrice, currentPage);
      setCurrentPage(1);
      setItems(res.room);
      setTotalPages(res.total_pages);
    };
    fetchDataBasedOnLocation();
  }, [location]);

  const handlePageClick = (event) => {
    const newCurrentPage = event.selected + 1;
    setCurrentPage(newCurrentPage);
  };
  const navigate = useNavigate();
  const RoomItem = ({ item, index }) => (
    <div
      className="Room_container"
      key={index}
      onClick={() => navigate(`/Rooms/${item.roomId}`, { state: item })}
    >
      <div className="Room_details_container">
        <div className="img_container">
          <img
            className="room_img"
            src={item.roomImage[0].image.imageUrl}
            alt="Room"
          />
        </div>
        <div className="info">
          <div className="bold">Phòng {item.roomNumber}</div>
          <div className="area">Diện tích phòng {item.roomArea} m²</div>
          <div className="max">Phòng {item.roomStatus}</div>
          <div className="max">Số người ở tối đa {item.maxOccupancy}</div>
          <div className="cost bold">Giá phòng {item.price} vnđ/tháng</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div id="Content_wrapper">
        <DropDownBoostrap></DropDownBoostrap>
        <div className="Content">
          {items.map((item, index) => (
            <RoomItem key={index} item={item} />
          ))}
        </div>
        <div className="paginate_container">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
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
      </div>
    </>
  );
}

export default RoomPriceFilter;
