import { useEffect, useState } from "react";
import {
  fetchAllUser,
  deleteUser,
  updateUser,
} from "../../service/ManageService";
import { fetchCurrentUser } from "../../service/UserService";
import style from "../../styles/Managerment.modules.scss";
import ReactPaginate from "react-paginate";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal component
function ManagermentUser() {
  const [userData, setUserData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false); // Modal state
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchBill = async (id, currentPage) => {
      try {
        const res = await fetchAllUser(id, currentPage);
        // setBillData(res.data);
        console.log(res);
        setUserData(res.renterList);
        setTotalPages(res.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchBill(currentPage);
  }, [currentPage]);

  const handlePageClick = (event) => {
    const newCurrentPage = event.selected + 1;
    setCurrentPage(newCurrentPage);
  };
  const handleViewDetails = (id) => {
    setUser(id);
    setShow(!show);
  };

  useEffect(() => {
    console.log(user);
    const fetchUserById = async (user) => {
      if (user != null && user != undefined) {
        let res = await fetchCurrentUser(user);

        if (res.renter != null) {
          setUserData(Object.keys(res.renter));
          console.log("curentuser", userData);
        }
      }
    };
    fetchUserById(user);
  }, [show]);

  const handleEditUser = (id) => {
    setUser(id);
    setShow(!show);
  };
  const handleDeleteUser = (id) => {
    setUser(id);
  };

  const handleClose = () => {
    setShow(false);
    setUser("");
  }; // Close modal
  const handleConfirm = () => {
    // Call API with user data
    // onConfirm(user); // Pass user data to onConfirm function
    handleClose(); // Close modal after API call
  };

  return (
    <div className="UserInfo_Wrapper">
      <div className="UserInfo_Container">
        <>
          <h4 className="UserInfo_Item_Heading">Danh sách khách hàng</h4>
          <table className="UserInfo_Table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Ngày sinh</th>
                <th>Điện thoại</th>
                <th>CCCD</th>
                <th>Địa chỉ</th>
                <th>Khác</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.renterId}>
                  <td>{user.renterId}</td>
                  <td>{user.name === null ? "chưa nhập" : user.name}</td>
                  <td>{user.email === null ? "chưa nhập" : user.email}</td>
                  <td>
                    {user.dateOfBirth === null || user.dateOfBirth === undefined
                      ? "chưa nhập"
                      : user.dateOfBirth.slice(0, 10)}
                  </td>
                  <td>{user.phone === null ? "chưa nhập" : user.phone}</td>
                  <td>{user.cccd === null ? "chưa nhập" : user.cccd}</td>
                  <td>{user.address === null ? "chưa nhập" : user.address}</td>
                  <td>
                    <button
                      className=".view-details-btn"
                      onClick={() => handleViewDetails(user.renterId)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className=".edit-btn"
                      onClick={() => handleEditUser(user.renterId)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className=".delete-btn"
                      onClick={() => handleDeleteUser(user.renterId)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="paginate_container">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={totalPages} //tổng
              marginPagesDisplayed={2} //số page đầu cuối
              pageRangeDisplayed={5} //số page ở giữa
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              // forcePage={pageOffset}
            />
          </div>
          {show === true ? (
            <div>
              <Modal
                show="true"
                size="lg"
                aria-labelledby="userDetailsModalLabel"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="userDetailsModalLabel">
                    Chi tiết khách hàng
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <table>
                    <tbody>
                      {userData.map((user) => (
                        <tr key={user.renterId}>
                          <td>{user.renterId}</td>
                          <td>
                            {user.name === null ? "chưa nhập" : user.name}
                          </td>
                          <td>
                            {user.email === null ? "chưa nhập" : user.email}
                          </td>
                          <td>
                            {user.dateOfBirth === null ||
                            user.dateOfBirth === undefined
                              ? "chưa nhập"
                              : user.dateOfBirth.slice(0, 10)}
                          </td>
                          <td>
                            {user.phone === null ? "chưa nhập" : user.phone}
                          </td>
                          <td>
                            {user.cccd === null ? "chưa nhập" : user.cccd}
                          </td>
                          <td>
                            {user.address === null ? "chưa nhập" : user.address}
                          </td>
                          <td>
                            <button
                              className=".view-details-btn"
                              onClick={() => handleViewDetails(user.renterId)}
                            >
                              Xem chi tiết
                            </button>
                            <button
                              className=".edit-btn"
                              onClick={() => handleEditUser(user.renterId)}
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              className=".delete-btn"
                              onClick={() => handleDeleteUser(user.renterId)}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleConfirm();
                    }}
                  >
                    Xác nhận
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            ""
          )}
        </>
      </div>
    </div>
  );
}
export default ManagermentUser;
