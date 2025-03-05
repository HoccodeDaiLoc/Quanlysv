import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteHd } from "../../service/ManageService";
import { toast } from 'react-toastify';

const ModalConfirmHd = ({ show, handleCloseHd, handDeleteHdFromModal, dataHdDelete }) => {
  const confirmDeleteHd = async () => {
    try {
      const res = await deleteHd(dataHdDelete.contractId);
      if (res && res) {
        toast.success("Xóa thành công");
        handleCloseHd();
        handDeleteHdFromModal(dataHdDelete);
      } else {
        toast.error("Xóa không thành công");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa phòng");
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={show} 
    onHide={handleCloseHd}
     backdrop="static" 
     keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Xóa phòng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Xác nhận xóa phòng có số: <b>{dataHdDelete.roomNumber}</b>?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseHd}>
          Hủy
        </Button>
        <Button variant="primary" onClick={confirmDeleteHd}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmHd;
