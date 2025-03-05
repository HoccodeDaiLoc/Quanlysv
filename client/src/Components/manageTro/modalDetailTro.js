import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { fetchAllDetailRoom, fetchAllDetailRenter } from "../../service/ManageService";
import "./ManagerModalDetailTro.modules.scss"; 

const ModalDetailTro = (props) => {
  const { show, handleCloseTro, dataDetailTro } = props;

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);
  const [roomDetails, setRoomDetails] = useState(null);
  const [renterDetails, setRenterDetails] = useState([]);
  const [roomId, setRoomId] = useState(null);

  const handleImageClick = (images) => {
    setSelectedRoomImages(images || []);
    setShowImageModal(true);
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("vi-VN").format(price) + " VND";
  };

  useEffect(() => {
    if (dataDetailTro) {
      getDetailTro(dataDetailTro.roomId);
    }
  }, [dataDetailTro]);

  const getDetailTro = async (roomId) => {
    try {
      const res = await fetchAllDetailRoom(roomId);
      if (res && res.room) {
        setRoomDetails(res.room);
      }
    } catch (error) {
      console.error("Error fetching tro data:", error);
    }
  };

  useEffect(() => {
    if (dataDetailTro) {
      getDetailRenter(dataDetailTro.roomId); 
    }
  }, [dataDetailTro]);

  const getDetailRenter = async (roomId) => {
    try {
      const res = await fetchAllDetailRenter(roomId);
      if (res && res.data) {
        setRenterDetails(res.data);
      }
    } catch (error) {
      console.error("Error fetching renter data:", error);
    }
  };

  const handleShowDetail = (roomId) => {
    setRoomId(roomId);
  };

  const renterNames = Array.isArray(renterDetails)
    ? renterDetails.map((renter, index) =>  ` Khách hàng ${index + 1}: ${renter.name}`).join('\n')
    : "";

  console.log('fetchalldetail', renterDetails);

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseTro}
        backdrop="static"
        keyboard={false}
        dialogClassName="large-modal"
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết phòng trọ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body_add_new">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputID" className="form-label">
                Số Phòng
              </label>
              <input
                type="text"
                className="form-control"
                id="inputID"
                value={dataDetailTro?.roomNumber || ""}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputArea" className="form-label">
                Diện tích
              </label>
              <input
                type="text"
                className="form-control"
                id="inputArea"
                value={dataDetailTro?.roomArea ? `${dataDetailTro.roomArea} m²` : ""}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPrice" className="form-label my-3">
                Giá phòng
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputPrice"
                  value={formatPrice(dataDetailTro?.price)}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputStatus" className="form-label my-3">
                Tình trạng
              </label>
              <input
                type="text"
                className="form-control"
                id="inputStatus"
                value={dataDetailTro?.roomStatus || ""}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRenter" className="form-label my-3">
                Khách đang thuê : ***
              </label>
              <textarea
                className="form-control same-height"
                id="inputRenter"
                value={renterNames}
                readOnly
                rows={Array.isArray(renterDetails) ? renterDetails.length : 5}
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="inputDescription" className="form-label my-3">
                Tiện ích gồm có : ***
              </label>
              <textarea
                className="form-control same-height"
                id="inputDescription"
                value={roomDetails?.device?.map(device => device.deviceName).join('\n') || ""}
                readOnly
                rows={roomDetails?.device?.length || 5}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputDescription" className="form-label my-3">
                Mô tả
              </label>
              <textarea
                className="form-control"
                id="inputDescription"
                value={dataDetailTro?.description || ""}
                readOnly
                rows="5"
              />
            </div>

            <div className="col-md-12 my-3 text-center">
              <Button
                variant="danger"
                onClick={() => handleImageClick(dataDetailTro?.roomImage)}
              >
                Xem ảnh chi tiết phòng
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTro}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ảnh chi tiết phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoomImages.length > 0 ? (
            <Carousel interval={null}>
              {selectedRoomImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.image.imageUrl}
                    alt={`Slide ${index + 1}`}
                    style={{ maxHeight: "600px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Không có hình ảnh để hiển thị</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDetailTro;
