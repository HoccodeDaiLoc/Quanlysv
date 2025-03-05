import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../../service/ManageService";
import { toast } from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, handDeleteUserFromModal, dataUserDelete } = props;

  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.renterId);
    if (res && res) {
      toast.success("Xoa thanh cong");
      handleClose();
      handDeleteUserFromModal(dataUserDelete);
    } else {
      toast.error("Xoa khong thanh cong");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa danh sách người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body_add_new">
          Xác nhận xóa!
          <br />
          <b>Ten = {dataUserDelete.name}</b>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={confirmDelete}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
