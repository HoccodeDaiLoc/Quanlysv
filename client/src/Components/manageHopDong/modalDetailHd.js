import  { useState ,useEffect } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { fetchAllContractRenter } from "../../service/ManageService";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCardHeader,
} from 'mdb-react-ui-kit';

const ModalDetailHd = (props) => {
  const { show, handleCloseHd, dataDetailHd, roomNumbers } = props;
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);
  const [renterDetail, setRenterDetail] = useState([]);

  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  useEffect(() => {
    if (dataDetailHd) {
      getDetailTro(dataDetailHd?.contractId);
    }
  }, [dataDetailHd]);

  const getDetailTro = async (contractId) => {
    try {
      const res = await fetchAllContractRenter(contractId);
      if (res && res.contract) {
        setRenterDetail(res.contract);
      }
    } catch (error) {
      console.error("Error fetching tro data:", error);
    }
  };

  const handleShowDetail = async (contractId) => {
    try {
      const res = await fetchAllContractRenter(contractId);
      if (res && res.contract) {
        setRenterDetail(res.contract);
      }
    } catch (error) {
      console.error("Error fetching tro data:", error);
    }
  };

  console.log('fetchalldetail', renterDetail);
  return (
    <Modal show={show} onHide={handleCloseHd} backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hợp đồng thuê trọ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBContainer className="py-5">
          <MDBCard>
            <MDBCardHeader className="bg-dark text-white text-center">
              HỢP ĐỒNG THUÊ TRỌ
            </MDBCardHeader>
            <MDBCardBody>
              <MDBContainer>
                <MDBRow>
                  <MDBCol xl="12">
                    <ul className="right-align" >
                      <li style={{ marginRight: '180px', padding: '0', listStyle: 'none', textAlign: 'right', fontWeight: 'bold' }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</li>
                      <li style={{ marginRight: '240px', padding: '0', listStyle: 'none', textAlign: 'right', fontWeight: 'bold' }}>Độc lập - Tự do - Hạnh phúc</li>
                    </ul>
                    
                  </MDBCol>
                </MDBRow>
                <MDBRow className="text-center">
                  <h3 className="text-uppercase text-center mt-3" style={{ fontSize: '40px' ,color:"red" }}>
                    HỢP ĐỒNG THUÊ TRỌ
                  </h3>
                  <p>Kính gửi: {dataDetailHd.tenantName}</p>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6" style={{ padding: '20px' }}>
                    <p>
                      <strong>Bên A (Bên cho thuê):</strong>
                    </p>
                    <p>Họ và tên: Phòng trọ sinh viên</p>
                    <p>Địa chỉ: Hòa Khánh Bắc, Đà Nẵng</p>
                    <p>Số điện thoại: 0222.211.133</p>
                  </MDBCol>
                  <MDBCol md="6" style={{ padding: '30px',marginTop: '-15px',marginRight: '-50px' }}>
               <p>
             <strong style={{marginRight: '50px' }} >Bên B (Bên thuê):</strong>
             </p>
             <p style={{ margin: '5px 0' }}>Họ và tên(Ông/bà ...): {renterDetail?.renter?.name || ""}             </p>
             <p style={{ margin: '5px 0' }}>Số căn cước công dân: {renterDetail?.renter?.cccd || ""}     </p>
             <p style={{ margin: '5px 0' }}>Địa chỉ: {renterDetail?.renter?.address || ""}             </p>
             <p style={{ margin: '5px 0' }}>Số điện thoại:{renterDetail?.renter?.phone || ""}             </p>
                  </MDBCol>

                </MDBRow>
                <MDBRow className="mt-4">
                  <p>
                    <strong>Điều 1: Đối tượng hợp đồng</strong>
                  </p>
                  <p>
              Bên A đồng ý cho bên B thuê các phòng số:{' '}
              {roomNumbers.find(room => room.roomId === dataDetailHd?.roomId)?.roomNumber || ""}

             </p>

                </MDBRow>
                <MDBRow className="mt-4">
                  <p>
                    <strong>Điều 2: Thời hạn hợp đồng</strong>
                  </p>
                  <p>Thời hạn thuê:  Bắt đầu từ ngày {new Date(dataDetailHd?.startDay).toLocaleDateString('vi-VN') || ''} đến ngày {new Date(dataDetailHd?.endDate).toLocaleDateString('vi-VN') || ''}
                  .</p>
                </MDBRow>
                <MDBRow className="mt-4">
                  <p>
                    <strong>Điều 3: Giá thuê và phương thức thanh toán</strong>
                  </p>
                  <p>Giá thuê: {formatPrice(dataDetailHd?.rentAmount)}
                    
     mỗi tháng.</p>
       <p>Tiền đặt cọc: {formatPrice(dataDetailHd?.depositAmount)}
       </p>
                  <p>Phương thức thanh toán:Chuyển khoản hoặc tiền mặt</p>
                </MDBRow>
                <MDBRow className="mt-4">
                  <p>
                    <strong>Điều 4: Quyền và nghĩa vụ của các bên</strong>
                  </p>
                  <p>
                    <strong>Bên A:</strong>
                    <br />
                    - Đảm bảo căn phòng trong tình trạng tốt.
                    <br />
                    - Cung cấp các dịch vụ kèm theo (nếu có).
                  </p>
                  <p>
                    <strong>Bên B:</strong>
                    <br />
                    - Thanh toán tiền thuê đúng hạn.
                    <br />
                    - Sử dụng căn phòng đúng mục đích và bảo quản tốt tài sản.
                  </p>
                </MDBRow>
                <MDBRow className="mt-4">
                  <p>
                    <strong>Điều 5: Điều khoản chung</strong>
                  </p>
                  <p>Hợp đồng được lập thành hai bản, mỗi bên giữ một bản có giá trị pháp lý như nhau.</p>
                </MDBRow>
                <MDBRow className="mt-4">
                  <MDBCol xl="6">
                    <p className="fw-bold">Ngày ký: {new Date(dataDetailHd?.startDay).toLocaleDateString('vi-VN') || ''}
                    </p>
                    <p className="fw-bold mt-3">Bên A (Bên cho thuê)</p>
                    <p className="mt-5">{dataDetailHd.landlordName}</p>
                  </MDBCol>
                  <MDBCol xl="6" className="text-end">
                    <p className="fw-bold mt-3">Bên B (Bên thuê)</p>
                    <p className="mt-5">{dataDetailHd.tenantName}</p>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBCardBody>
            <MDBCardFooter className="bg-dark"></MDBCardFooter>
            <Button variant="secondary" onClick={handleCloseHd}>Đóng</Button>
          </MDBCard>
        </MDBContainer>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetailHd;
