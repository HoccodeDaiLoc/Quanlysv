import { useState, useEffect } from "react";
import styles from "../styles/SideBar.modules.scss";
import { useNavigate } from "react-router-dom";
import { fecthAllCategory } from "../service/CategoryService";
import left_arrow from "../asset/image/left-arrow.svg";

function SideBar() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số lượng item mỗi trang
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    const fecthdata = async () => {
      let res = await fecthAllCategory();
      let data = res.category;
      setItems(data);
      setTotalItems(data.length);
    };
    fecthdata();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return (
      <div className="sidebar_container">
        {items.slice(startIndex, endIndex).map((item, index) => (
          <div
            className="sidebar"
            key={index}
            onClick={() =>
              navigate(`/category/${item.deviceCategoryId}`, {
                state: item.deviceCategoryId,
              })
            }
          >
            <span className="icon_container">
              <img className="side_icon" src={item.image} alt="tang 1"></img>
            </span>
            <span className="text">{item.categoryName}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="SideBar_wrapper">
      <div className="SideBar_wrapper2">
        <span onClick={handlePrevious}>
          <img className="side_button" src={left_arrow}></img>
        </span>

        {renderItems()}

        <span onClick={handleNext}>
          <img className="side_button rotate" src={left_arrow}></img>
        </span>
      </div>
    </div>
  );
}

export default SideBar;
