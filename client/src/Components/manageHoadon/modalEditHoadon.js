import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateHoadon } from "../../service/ManageService";
import { toast } from 'react-toastify';

const ModalEditHoadon = (props) => {
  const { show, handleCloseHoadon, dataHoadonedit, handleEditHoadonfrommodal } = props;
  const [status, setStatus] = useState("");

  const handleEditHoadon = async () => {
    if (status) {
      let res = await updateHoadon(dataHoadonedit.billId, status);
      if (res) {
        handleEditHoadonfrommodal({
          billId: dataHoadonedit.billId,
          status: status,
        });
        handleCloseHoadon();
        toast.success("Update thành công");
      } else {
        toast.error("Update thất bại");
      }
    } else {
      toast.error("Vui lòng nhập trạng thái trước khi lưu");
    }
  };

  useEffect(() => {
    if (show) {
      setStatus(dataHoadonedit.status);
    }
  }, [dataHoadonedit, show]);

  return (
    <Modal show={show} onHide={handleCloseHoadon} className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputType" className="form-label">
              Trạng thái thanh toán
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {status === "chưa thanh toán" && (
                <option value="chưa thanh toán">Chưa thanh toán</option>
              )}
              <option value="đã thanh toán">Đã thanh toán</option>
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseHoadon}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditHoadon}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditHoadon;
