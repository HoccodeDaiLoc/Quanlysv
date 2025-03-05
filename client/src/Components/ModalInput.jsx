import React, { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import UserInfo from "./UserInfo";
function ModalInput() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOutsideClick = (e) => {
    //dom  kiếm classname
    if (e.target.className === "modal_me") {
      setShow(false);
    }
  };
  const check = () => {
    if (show === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  //   const imgArray = data;
  const [bigImage, setBigImage] = useState(0);
  check();
  return (
    <div>
      <button className="button_modal" onClick={handleShow}>
        Xem chi tiết
      </button>
      {/* {console.log(data)} */}
      {show ? (
        <div className="modal_me" onClick={(e) => handleOutsideClick(e)}>
          <div className="modal-content">
            <div className="img_container" id="img_container">
              <div className="big_img_container">
                <img className="big_img" src={""} alt="" />
              </div>
              <div className="side">
                <h3>Hình ảnh chi tiết về nội thất của phòng </h3>
                <div className="side_container"></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ModalInput;
