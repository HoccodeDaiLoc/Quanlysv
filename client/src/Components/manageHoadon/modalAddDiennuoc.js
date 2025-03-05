import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormSelect from 'react-bootstrap/FormSelect';

const formatDate = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
};

const ModalAddDiennuoc = (props) => {
    const { show, handleCloseHoadon } = props;
    const [roomNumber, setRoomNumber] = useState('');
    const [waterNumber, setWaterNumber] = useState('');
    const [waterRecordDate, setWaterRecordDate] = useState(new Date()); 
    const [electricNumber, setElectricNumber] = useState('');
    const [electricRecordDate, setElectricRecordDate] = useState(new Date());
    const [roomMapping, setRoomMapping] = useState({});
    const [roomNumbers, setRoomNumbers] = useState([]);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/room/roomNumber');
                const result = response.data;
                if (response.status === 200) {
                    const roomData = result.data.reduce((acc, room) => {
                        acc[room.roomId] = room.roomNumber;
                        return acc;
                    }, {});
                    setRoomMapping(roomData);
                    setRoomNumbers(Object.values(roomData));
                } else {
                    toast.error("Lấy dữ liệu phòng thất bại");
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi lấy dữ liệu phòng");
            }
        };

        fetchRoomData();
    }, []);

    const addWaterReading = async () => {
        try {
            const roomId = Object.keys(roomMapping).find(key => roomMapping[key] === parseInt(roomNumber));
            if (!roomId) {
                toast.error("Số phòng không hợp lệ");
                return;
            }
            const response = await axios.post(`http://127.0.0.1:8080/api/waterReading/room/${roomId}`, {
                waterNumber: waterNumber,
                waterRecordDate: formatDate(waterRecordDate)
            });
            console.log(response.data);
            toast.success("Đã thêm dữ liệu nước thành công");
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi thêm dữ liệu nước");
        }
    };

    const addElectricReading = async () => {
        try {
            const roomId = Object.keys(roomMapping).find(key => roomMapping[key] === parseInt(roomNumber));
            if (!roomId) {
                toast.error("Số phòng không hợp lệ");
                return;
            }
            const response = await axios.post(`http://127.0.0.1:8080/api/electricReading/room/${roomId}`, {
                electricNumber: electricNumber,
                electricRecordDate: formatDate(electricRecordDate)
            });
            console.log(response.data);
            toast.success("Đã thêm dữ liệu điện thành công");
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi thêm dữ liệu điện");
        }
    };

    const handUpdateHoadon = async () => {
        try {
            await addWaterReading();
            await addElectricReading();
            handleCloseHoadon();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleCloseHoadon}
            className="modal-add-tro"
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm vào danh sách</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body_add_new">
                <div className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputRoomNumber" className="form-label">Số phòng</label>
                        <FormSelect 
                            className="form-select" 
                            value={roomNumber} 
                            onChange={(event) => setRoomNumber(event.target.value)}
                        >
                            <option value="">Chọn phòng có số điện mới...</option>
                            {roomNumbers.map((room) => (
                                <option key={room} value={room}>Phòng {room}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputWaterNumber" className="form-label">Số nước</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={waterNumber} 
                            onChange={(event) => setWaterNumber(event.target.value)} 
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputWaterRecordDate" className="form-label">Ngày ghi nước</label>
                        <DatePicker 
                            className="form-control" 
                            selected={waterRecordDate} 
                            onChange={date => setWaterRecordDate(date)} 
                            dateFormat="dd/MM/yyyy" 
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputElectricNumber" className="form-label">Số điện</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={electricNumber} 
                            onChange={(event) => setElectricNumber(event.target.value)} 
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputElectricRecordDate" className="form-label">Ngày ghi điện</label>
                        <DatePicker 
                            className="form-control" 
                            selected={electricRecordDate} 
                            onChange={date => setElectricRecordDate(date)} 
                            dateFormat="dd/MM/yyyy" 
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseHoadon}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handUpdateHoadon}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddDiennuoc;
