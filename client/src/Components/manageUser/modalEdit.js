import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser } from "../../service/ManageService";
import { toast } from "react-toastify";
import "./ModalEdit.scss";

const ModalEdit = (props) => {
  const { show, handleClose, dataUseredit, handleEditUserfrommodal } = props;
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cccd, setCccd] = useState("");

  const handleEditUser = async () => {
    if (!name) {
      toast.error("Vui lòng nhập tên trước khi lưu");
      return;
    }

    // Kiểm tra email có đúng định dạng không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    // Kiểm tra CCCD có phải là số không
    if (isNaN(cccd)) {
      toast.error("CCCD phải là số");
      return;
    }

    // Kiểm tra số điện thoại có phải là số không
    if (isNaN(phone)) {
      toast.error("Số điện thoại phải là số");
      return;
    }

    const formattedDateOfBirth = dateOfBirth
      ? dateOfBirth.toISOString().split("T")[0]
      : null;
    let res = await updateUser(
      dataUseredit.renterId,
      name,
      formattedDateOfBirth,
      address,
      phone,
      email,
      cccd
    );

    if (res) {
      handleEditUserfrommodal({
        renterId: dataUseredit.renterId,
        name,
        dateOfBirth: formattedDateOfBirth,
        address,
        phone,
        email,
        cccd,
      });
      handleClose();
      toast.success("Update thành công");
    } else {
      toast.error("Update thất bại");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUseredit.name);
      setAddress(dataUseredit.address);
      setEmail(dataUseredit.email);
      setDateOfBirth(
        dataUseredit.dateOfBirth ? new Date(dataUseredit.dateOfBirth) : null
      );
      setPhone(dataUseredit.phone);
      setCccd(dataUseredit.cccd);
    }
  }, [dataUseredit, show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">
              Tên khách hàng
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              className="form-control"
              value={phone}
              maxLength={10}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Số căn cước công dân :
            </label>
            <input
              type="text"
              className="form-control"
              value={cccd}
              maxLength={12}
              onChange={(event) => setCccd(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Ngày sinh :
            </label>
            <div className="date-picker-container">
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Chọn ngày sinh"
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdit;
