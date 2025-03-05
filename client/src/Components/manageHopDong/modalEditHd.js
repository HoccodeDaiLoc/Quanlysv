import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import FormSelect from 'react-bootstrap/FormSelect';

const ModalEditHd = (props) => {
    const { show, handleCloseHd, dataHdedit, handleEditHdfrommodal } = props;
    const [startDay, setStartDay] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rentAmount, setRentAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [roomId, setRoomId] = useState("");
    const [renterId, setRenterId] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [roomMapping, setRoomMapping] = useState({});

    useEffect(() => {
        const fetchRoomData = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8080/api/room/roomNumber');
            const result = await response.json();
            if (response.ok) {
              const roomData = result.data.reduce((acc, room) => {
                acc[room.roomNumber] = room.roomId;
                return acc;
              }, {});
              setRoomMapping(roomData);
              setRoomNumber(Object.keys(roomData));
            } else {
              toast.error("Lấy dữ liệu phòng thất bại");
            }
          } catch (error) {
            toast.error("Đã xảy ra lỗi khi lấy dữ liệu phòng");
          }
        };
    
        fetchRoomData();
      }, []);
    const roomNumbers = Object.keys(roomMapping);
    const handleEditHd = async () => {
        if (renterId) {
            const formattedStartDay = startDay ? moment(startDay).format('YYYY-MM-DD') : null;
            const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : null;

            const mappedRoomId = roomMapping[parseInt(roomNumber)];
            
            if (!mappedRoomId) {
                toast.error("Số phòng không hợp lệ");
                return;
            }

            if (isNaN(depositAmount)) {
                toast.error("Tiền cọc phải là một số");
                return;
            }

            let res = await updateHd(dataHdedit.contractId, formattedStartDay, formattedEndDate,  depositAmount, mappedRoomId, renterId);
            
            if (res) {
                handleEditHdfrommodal({
                    contractId: dataHdedit.contractId,
                    startDay: formattedStartDay,
                    endDate: formattedEndDate,
                    
                    depositAmount,
                    roomId: mappedRoomId,
                    roomNumber: parseInt(roomNumber),
                    renterId
                });
                handleCloseHd();
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
            setStartDay(new Date(dataHdedit.startDay));
            setEndDate(new Date(dataHdedit.endDate));
            setDepositAmount(dataHdedit.depositAmount);
            setRoomNumber(dataHdedit.roomNumber);
            setRenterId(dataHdedit.renterId);
        }
    }, [dataHdedit, show]);

    return (
        <Modal show={show} onHide={handleCloseHd} size='lg' className='modal-add-tro'>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body_add_new">
                <form className="row g-3">
                <div className="col-md-6">
                        <label htmlFor="inputRoomNumber" className="form-label">Thuê phòng số</label>
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
                        <label htmlFor="depositAmount" className="form-label">Tiền cọc</label>
                        <input type="text" className="form-control" value={depositAmount} onChange={(event) => setDepositAmount(event.target.value)} />
                    </div>
                    
                   
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
                            <label htmlFor="inputEndDate" className="form-label">Ngày hết hạn</label>
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
                <Button variant="primary" onClick={handleEditHd}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditHd;
