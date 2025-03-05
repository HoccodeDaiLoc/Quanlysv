import { useState } from "react";
import Style from "../styles/Modal.modules.scss";
function RoomDetailModal({ data, roomNumber }) {
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
  const imgArray = data;
  const [bigImage, setBigImage] = useState(0);
  check();
  return (
    <div>
      <button className="button_modal" onClick={handleShow}>
        Xem chi tiết
      </button>
      {show ? (
        <div className="modal_me" onClick={(e) => handleOutsideClick(e)}>
          <div className="modal-content">
            <div className="img_container" id="img_container">
              <div className="big_img_container">
                <img
                  className="big_img"
                  src={imgArray[bigImage].image.imageUrl}
                  alt=""
                />
              </div>
              <div className="side">
                <h3>Hình ảnh chi tiết về nội thất của phòng {roomNumber}</h3>
                <div className="side_container">
                  {imgArray.slice(1, 10).map(
                    (
                      img,
                      index //array.slice(index) => tạo mảng mới từ index đó trở về sau
                    ) => (
                      <div key={index} className="small_img_container">
                        <img
                          src={img.image.imageUrl}
                          onClick={() => {
                            setBigImage(index + 1);
                          }}
                          className="small_img"
                          alt=""
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RoomDetailModal;
