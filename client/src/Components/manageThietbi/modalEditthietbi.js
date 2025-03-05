import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateTb } from "../../service/ManageService";
import { toast } from "react-toastify";


const ModalEditTb = (props) => {
  const { show, handleCloseTb, dataTbedit, handleEditTbfrommodal } = props;
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleEditTb = async () => {
    if (deviceName) {
      console.log("Starting updateTb with:", {
        deviceId: dataTbedit.deviceId,
        deviceName,
        devicePrice,
        roomId,
      });

      let res = await updateTb(
        dataTbedit.deviceId,
        deviceName,
        devicePrice,
        roomId,
      );
      console.log("check res:", res);

      if (res) {
        handleEditTbfrommodal({
          deviceId: dataTbedit.deviceId,
          deviceName :deviceName,
          devicePrice :devicePrice,
          roomId :roomId,
        });
        handleCloseTb();
        toast.success("Update thành công");
      } else {
        toast.error("Update thất bại");
      }
    } else {
      toast.error("Vui lòng nhập tên trước khi lưu");
    }
  };

  useEffect(() => {
    if (show) {
      setDeviceName(dataTbedit.deviceName);
      setDevicePrice(dataTbedit.devicePrice);
      setRoomId(dataTbedit.roomId);
    }
  }, [dataTbedit]);

  return (
    <Modal show={show} onHide={handleCloseTb} backdrop="static" keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">

          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
              Tên thiết bị
            </label>
            <input
              type="text"
              className="form-control"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Giá thiết bị
            </label>
            <input
              type="text"
              className="form-control"
              value={devicePrice}
              onChange={(event) => setDevicePrice(event.target.value)}
            />
          </div>
       
    
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTb}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditTb}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditTb;
