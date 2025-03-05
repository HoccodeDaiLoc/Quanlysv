import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteTro } from "../../service/ManageService";
import { toast } from "react-toastify";

const ModalConfirmTro = ({
  show,
  handleCloseTro,
  handDeleteTroFromModal,
  dataTroDelete,
}) => {
  const confirmDeleteTro = async () => {
    try {
      const res = await deleteTro(dataTroDelete.roomId);
      if (res && res) {
        toast.success("Xóa thành công");
        handleCloseTro();
        handDeleteTroFromModal(dataTroDelete);
      } else {
        toast.error("Xóa không thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa phòng");
      console.error("Error:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseTro}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xóa phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Xác nhận xóa phòng có số: <b>{dataTroDelete.roomNumber}</b>?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTro}>
          Hủy
        </Button>
        <Button variant="primary" onClick={confirmDeleteTro}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmTro;
