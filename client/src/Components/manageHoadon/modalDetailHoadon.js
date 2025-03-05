import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { IoIosPrint } from 'react-icons/io';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FcHome } from "react-icons/fc";
import { FiMapPin } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';





const ModalDetailHoadon = (props) => {
  const { show, handleCloseHoadon, dataDetailHoadon,roomNumbers } = props;

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Modal show={show} onHide={handleCloseHoadon} backdrop="static" keyboard={false} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hóa đơn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBContainer className="py-5">
          <MDBCard className="p-4">
            <MDBCardBody>
              <MDBContainer className="mb-2 mt-3">
                <MDBRow className="d-flex align-items-baseline">
                <MDBCol xl="9">
             <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
             <strong>Ngày lập hóa đơn: {formatDate(dataDetailHoadon?.billEndDate) || ''}</strong>
             </p>
            </MDBCol>
                  <MDBCol xl="3" className="float-end">
                    <MDBBtn
                      color="light"
                      ripple="dark"
                      className="text-capitalize border-0"
                    >
                      <MDBIcon color="primary" className="me-1" />
                      <FontAwesomeIcon icon={faPrint} style={{ color: 'blue' }} className="me-1" />
                      Hóa đơn đã được xuất.
                    </MDBBtn>
                    
                    <hr />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              <MDBContainer>
                <MDBCol md="12" className="text-center">
                <span className="ms-0"
                 style={{ color: "#5d9fc5", fontSize: "4rem" }}>
                  
                 HÓA ĐƠN 
                 
                  </span>
                  <p  className="pt-0">Thuê trọ xin chào !</p>
                  <p className="pt-0"></p>
                </MDBCol>
              </MDBContainer>
              <MDBRow>
                <MDBCol xl="8">
                  <MDBTypography listUnStyled>
                    <li className="text-muted">
                      To: <span style={{ color: "#5d9fc5" }}>Phòng số {roomNumbers.find(room => room.roomId === dataDetailHoadon?.roomId)?.roomNumber || ""}</span>
                    </li>
                    <li className="text-muted"><FiMapPin />
                    Hòa Khánh Bắc ,</li>
                    <li className="text-muted">
                      <MDBIcon/> Thành phố Đà Nẵng
                    </li>
                  </MDBTypography>
                </MDBCol>
                <MDBCol xl="4">
                  <p className="text-muted">Hóa đơn tiền trọ</p>
                  <MDBTypography listUnStyled>
                    <li className="text-muted">
                      <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                      <span className="fw-bold ms-1">Phương thức thanh toán: {dataDetailHoadon?.paymentMethod || ''}</span>
                    </li>
                    <li className="text-muted">
                      <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                      <span className="fw-bold ms-1">Ngày lập: </span>
                   Ngày {formatDate(dataDetailHoadon?.billEndDate) || ''}
                    </li>
                    <li className="text-muted">
                      <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                      <span className="fw-bold ms-1">Tình trạng:</span>
                      <span className="badge bg-warning text-black fw-bold ms-1">
                      {dataDetailHoadon?.status || ''}
                      </span>
                    </li>
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-2 mx-1 justify-content-center">
                <MDBTable striped borderless>
                  <MDBTableHead
                    className="text-white"
                    style={{ backgroundColor: "#84B0CA" }}
                  >
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Dịch vụ</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Đơn giá</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {dataDetailHoadon?.billItem && dataDetailHoadon.billItem.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.itemName || ''}</td>
                        <td>{item.quantity || ''}</td>
                        <td>{formatCurrency(item.unitPrice) || ''}</td>
                 <td>{formatCurrency(item.totalAmont) || ''}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBRow>
              <MDBRow>
                <MDBCol xl="8">
                  <p className="ms-3">
                    Ghi chú hóa đơn :**
                  </p>
                </MDBCol>
                <MDBCol xl="3">
                  <MDBTypography listUnStyled>
                    <li className="text-muted ms-3">
                      <span class="text-black me-4">Tạm tính {formatCurrency(dataDetailHoadon?.total || '')}</span> 
                    </li>
                    <li className="text-muted ms-3 mt-2">
                      <span class="text-black me-4">Giảm giá(0%)</span>0 đ
                    </li>
                  </MDBTypography>
                  <p className="text-black float-start">
                    <span className="text-black me-3"> Tổng tiền cần thanh toán   </span>
                    <span style={{ fontSize: "25px", marginLeft: "20px" }}>
                     {formatCurrency(dataDetailHoadon?.total || '')}
                   </span>

                  </p>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol xl="10">
                  <p>Cảm ơn đã đọc !!</p>
                </MDBCol>
                <MDBCol xl="2">
                  <MDBBtn
                    className="text-capitalize"
                    style={{ backgroundColor: "#60bdf3" }}
                  >
                    Đã xác nhận                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter className="bg-dark">
              
              <Button variant="secondary" onClick={handleCloseHoadon}>Đóng</Button>
              <Button className="text-capitalize"
                 
                    style={{ backgroundColor: "#60bdf3", marginLeft: "20px" }}
                    variant="secondary" onClick={''}>Gửi hóa</Button>
            </MDBCardFooter>
          </MDBCard>
        </MDBContainer>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailHoadon;

