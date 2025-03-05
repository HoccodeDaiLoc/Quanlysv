import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postCreateUser } from "../../service/ManageService";
import { toast } from 'react-toastify';
import FormSelect from 'react-bootstrap/FormSelect';
import ModalAddHd from './modalAddHd'; 

const ModalAddrenter = (props) => {
  const { show, handleCloseHd, handUpdateTable } = props;
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("@gmail.com");
  const [cccd, setCccd] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomMapping, setRoomMapping] = useState({});
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [renterId, setRenterId] = useState(""); 
  const [showHd, setShowHd] = useState(false); 

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/api/room/roomNumber?status=Phòng trống');
        const result = await response.json();
        if (response.ok) {
          const roomData = result.data.reduce((acc, room) => {
            acc[room.roomNumber] = room.roomId;
            return acc;
          }, {});
          setRoomMapping(roomData);
          setRoomNumbers(Object.keys(roomData));
        } else {
          toast.error("Lấy dữ liệu phòng thất bại");
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi lấy dữ liệu phòng");
      }
    };

    fetchRoomData();
  }, []);

  const handleSaveUser = async () => {
    if (!dateOfBirth || !phone || !cccd || !email || !address || !roomNumber || !name) {
      toast.error("Phải nhập đủ thông tin mới cho lưu");
      return;
    }

    if (isNaN(phone)) {
      toast.error("Số điện thoại phải là số");
      return;
    }

    if (isNaN(cccd)) {
      toast.error("CCCD phải là số");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Sai định dạng email");
      return;
    }

    const roomId = roomMapping[parseInt(roomNumber)];
    if (!roomId) {
      toast.error("Số phòng không hợp lệ");
      return;
    }

    const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];
    let res = await postCreateUser(
      name,
      formattedDateOfBirth,
      address,
      phone,
      email,
      cccd,
      roomId
    );

    if (res && res.newRenter) {
      const renterId = res.newRenter.renterId;
      handleCloseHd();
      setName("");
      setDateOfBirth(null);
      setAddress("");
      setPhone("");
      setEmail("");
      setCccd("");
      setRoomNumber("");
      toast.success("Lưu thông tin thành công");
      handUpdateTable({
        name: name,
        dateOfBirth: formattedDateOfBirth,
        address: address,
        phone: phone,
        email: email,
        cccd: cccd,
        roomId: roomId,
        roomNumber: parseInt(roomNumber),
      });
      // Lưu renterId vào state
      setRenterId(renterId);
      console.log("Renter ID:", renterId);
      // Hiển thị ModalAddHd
      setShowHd(true);
    } else {
      toast.error("Đã xảy ra lỗi");
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPhone(value);
    } else {
      toast.error("Số điện thoại phải là số");
    }
  };

  const handleCccdChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setCccd(value);
    } else {
      toast.error("CCCD phải là số");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseHd}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm danh sách khách hàng</Modal.Title>
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
                onChange={(event) => setName(event.target.value.replace(/\d+/g, ""))}
                placeholder="Nhập tên khách hàng..."
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRoomNumber" className="form-label">Phòng đang sử dụng</label>
              <FormSelect
                className="form-select"
                value={roomNumber}
                onChange={(event) => setRoomNumber(event.target.value)}
              >
                <option value="">Chọn phòng....</option>
                {roomNumbers.map((room) => (
                  <option key={room} value={room}>Phòng {room}</option>
                ))}
              </FormSelect>
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
                placeholder="Nhập địa chỉ..."
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputStatus" className="form-label">
                Số điện thoại
              </label>
              <input
                type="text"
                maxLength={10}
                className="form-control"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Nhập số điện thoại (10 số)..."
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
                placeholder="Nhập email..."
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputStatus" className="form-label">
                Số căn cước công dân :
              </label>
              <input
                type="text"
                maxLength={12}
                className="form-control"
                value={cccd}
                onChange={handleCccdChange}
                placeholder="Nhập số căn cước công dân (12 số)..."
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputDateOfBirth" className="form-label">
                Ngày sinh
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
          <Button variant="secondary" onClick={handleCloseHd}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Lưu thông tin
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Hiển thị ModalAddHd nếu showHd === true */}
      {showHd && <ModalAddHd show={showHd} handleCloseHd={() => setShowHd(false)} handUpdateTableHd={handUpdateTable} renterId={renterId} />}
    </>
  );
};

export default ModalAddrenter;
