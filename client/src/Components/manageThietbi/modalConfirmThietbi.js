import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteTb } from "../../service/ManageService";
import { toast } from "react-toastify";

const ModalConfirmTb = (props) => {
  const { show, handleCloseTb, handDeleteTbFromModal, dataTbDelete } = props;

  const confirmDelete = async () => {
    let res = await deleteTb(dataTbDelete.deviceId);
    if (res ) {
      toast.success("Xóa thành công");
      handleCloseTb();
      handDeleteTbFromModal(dataTbDelete);
    } else {
      toast.error("Xóa không thành công");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseTb}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xóa thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body_add_new">
          Xác nhận xóa!
          <br />
          <b>Tên thiết bị: {dataTbDelete.deviceName}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTb}>
          Đóng
        </Button>
        <Button variant="primary" onClick={confirmDelete}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmTb;
