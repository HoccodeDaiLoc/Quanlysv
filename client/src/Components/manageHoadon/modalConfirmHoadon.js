import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteHoadon} from"../../service/ManageService";
import { toast } from 'react-toastify';

const ModalConfirmHoadon = (props) => {
    const { show, handleCloseHoadon, handDeleteHoadonFromModal, dataHoadonDelete } = props;
  
    const confirmDelete = async () => {
      let res = await deleteHoadon(dataHoadonDelete.billId);
      if (res && res) {
        toast.success("Xóa thành công");
        handleCloseHoadon();
        handDeleteHoadonFromModal(dataHoadonDelete);
      } else {
        toast.error("Xóa không thành công");
      }
    };
  
    return (
      <Modal show={show} 
      onHide={handleCloseHoadon} 
      backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa thiết bị</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body_add_new'>
            Xác nhận xóa!
            <br />
            <b>Hóa đơn phòng : {dataHoadonDelete.roomId}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHoadon}>
            Đóng
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default ModalConfirmHoadon;