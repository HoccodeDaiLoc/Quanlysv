import React, { useState, useEffect } from "react";
import Style from "../styles/Modal.modules.scss";
import momo from "../asset/image/momo.png";
import Style1 from "../styles/UserInfo.modules.scss";

const MyModal = ({ bill, onClose }) => {
  const [billDetails, setBillDetails] = useState({});
  console.log("bill", bill);
  useEffect(() => {
    setBillDetails(bill);
  }, [bill]);
  const [show, setShow] = useState(false);

  const handleOutsideClick = (e) => {
    //dom  kiếm classname
    if (e.target.className === "modal_me UserInfo_Wrapper") {
      setShow(false);
    }
  };

  return (
    <div
      onClick={(e) => handleOutsideClick(e)}
      className="modal_me UserInfo_Wrapper"
      style={{ width: "100%", height: "100%", padding: "0px", margin: "0px" }}
    >
      <div
        className="modal-content UserInfo_Container"
        style={{ padding: "20px", height: "fit-content", bottom: "20%" }}
      >
        <div className="modal_header">
          <h4 className="UserInfo_Item_Heading">Chi tiết hóa đơn</h4>

          <span class="cross-stand-alone" onClick={onClose}></span>
        </div>

        <table className="UserInfo_Table ">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Mặt hàng</th>
              <th>Số đơn vị</th>
              <th>Giá tiền trên mỗi đơn vị</th>
              <th>Số tiền thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {/* hàm để tạo 1 mảng mới từ 1 đối tượng có thể lặp dc hoặc 1 đối tượng giống mảng. */}
            {Array.from(billDetails).map((billitem, index) => (
              <tr key={index}>
                <td>{billitem.id}</td>
                <td>{billitem.itemName}</td>
                <td>{billitem.quantity}</td>
                <td>{billitem.unitPrice} VNĐ</td>
                <td>{billitem.totalAmont} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyModal;
