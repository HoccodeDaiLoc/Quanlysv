import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDetailUser = (props) => {
  const { show, handleClose, dataDetailUser } = props;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
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
              <label htmlFor="inputName" className="form-label">
                Tên
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={dataDetailUser?.name || ""}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputDateOfBirth" className="form-label">
                Ngày sinh
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDateOfBirth"
                value={dataDetailUser?.dateOfBirth ? formatDate(dataDetailUser.dateOfBirth) : ""}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputAddress" className="form-label my-3">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                value={dataDetailUser?.address || ""}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPhone" className="form-label my-3">
                Số điện thoại
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                value={dataDetailUser?.phone || ""}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label my-3">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                value={dataDetailUser?.email || ""}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputCCCD" className="form-label my-3">
                Số CCCD
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCCCD"
                value={dataDetailUser?.cccd || ""}
                readOnly
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDetailUser;
