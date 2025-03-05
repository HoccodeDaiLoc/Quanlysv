import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postCreateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';
import FormSelect from 'react-bootstrap/FormSelect';

const ModalAddHd = (props) => {
  const { show, handleCloseHd, handUpdateTableHd, renterId } = props;
  const [startDay, setStartDay] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rentAmount, setRentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomMapping, setRoomMapping] = useState({});
  const [roomNumbers, setRoomNumbers] = useState("");

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

  const handUpdateHd = async () => {

    if (!startDay || !depositAmount || !roomNumber) {
  
      toast.error("Vui lòng nhập đầy đủ thông tin trước khi lưu.");
  
      return;
    }
  
    const roomId = roomMapping[parseInt(roomNumber)];
    if (!roomId) {
      toast.error("Số phòng không hợp lệ");
      return;
    }
    const formattedStartDay = startDay.toISOString().split('T')[0];
    const formattedEndDay = endDate ? endDate.toISOString().split('T')[0] : null;
    
    
    if (isNaN(depositAmount)) {
      toast.error("Số tiền đặt cọc phải là một số");
      return;
    }

    let res = await postCreateHd(formattedStartDay, rentAmount, roomId, renterId, formattedEndDay, depositAmount);
    if (res) {
      setStartDay(null);
      setRentAmount('');
      setRoomNumber('');
      setDepositAmount('');
      setEndDate(null);
      handleCloseHd();
      toast.success("Lưu thông tin thành công");
      console.log(res.data);

      console.log("Thông tin gửi lên server:");
      console.log("startDay:", formattedStartDay);
      console.log("endDate:", formattedEndDay);
      console.log("rentAmount:", rentAmount);
      console.log("roomId:", roomId);
      console.log("renterId:", renterId);
      console.log("depositAmount:", depositAmount);
    
      

      handUpdateTableHd({
        startDay: formattedStartDay,
        rentAmount: rentAmount,
        renterId: renterId,
        depositAmount: depositAmount,
        endDate: formattedEndDay,
        roomId: roomId,
        roomNumber: parseInt(roomNumber),
      });

      console.log(res.data);
    } else {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseHd}
      backdrop="static"
      keyboard={false}
      dialogClassName="large-modal"
      size='lg'
      className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Thêm hợp đồng </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">

          <div className="col-md-12">
            <label htmlFor="inputRoomNumber" className="form-label">Thuê phòng số</label>
            <FormSelect
              className="form-select"
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
            >
              <option value="">Chọn phòng....</option>
              {Array.isArray(roomNumbers) && roomNumbers.map((room) => (
         <option key={room} value={room}>Phòng {room}</option>
          ))}
            </FormSelect>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputRoomId" className="form-label">Số tiền đặt cọc</label>
            <input
              type="text"
              className="form-control"
              value={depositAmount}
              onChange={(event) => setDepositAmount(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          {/* <div className="col-md-12">
            <label htmlFor="inputRenterId" className="form-label">Mã hợp đồng</label>
            <input
         type="text"
           className="form-control"
       value={renterId}
          placeholder="Mã hợp đồng..."
              disabled // Đã có renterId từ props
                  />   
          </div> */}
          <div className="row">
            <div className="col-md-6 my-3">
              <label htmlFor="inputStartDay" className="form-label">Ngày bắt đầu</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={startDay}
                  onChange={(date) => setStartDay(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Chọn ngày bắt đầu"
                />
              </div>
            </div>

            <div className="col-md-6 my-3">
              <label htmlFor="inputStartDay" className="form-label">Ngày hết hạn</label>
              <div className="date-picker-container">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                  placeholderText="Chọn ngày kết thúc"
                />
              </div>
            </div>
          </div>

        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseHd}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handUpdateHd}>
          Lưu
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddHd;
