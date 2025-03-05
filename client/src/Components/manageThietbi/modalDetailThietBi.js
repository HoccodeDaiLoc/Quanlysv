import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalDetailTb = ({ show, handleCloseTb, dataDetailTb,roomNumbers  }) => {
  const getDeviceName = (categoryId) => {
    switch (categoryId) {
      case 1:
        return "Máy lạnh";
      case 2:
        return "Tủ lạnh";
      case 3:
        return "Giường";
      case 4:
        return "Tivi";
      default:
        return "";
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseTb}
        backdrop="static"
        keyboard={false}
        dialogClassName="large-modal"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body_add_new">
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label my-3">
                Loại thiết bị
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                value={getDeviceName(dataDetailTb?.categoryId)}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputName" className="form-label">
                Tên thiết bị
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={dataDetailTb?.deviceName || ""}
                readOnly
              />
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputAddress" className="form-label my-3">
              Giá thiết bị
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              value={dataDetailTb?.devicePrice || ""}
              readOnly
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPhone" className="form-label my-3">
              Số phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              value={roomNumbers.find(room => room.roomId === dataDetailTb?.roomId)?.roomNumber || ""}
              readOnly
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTb}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDetailTb;
