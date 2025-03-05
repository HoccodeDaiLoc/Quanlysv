import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllUser } from "../../service/ManageService";
import style from "../../Components/ManagerApp.modules.scss";
import ModalAdd from "./modalAdd";
import ModalEdit from "./modalEdit";
import ModalConfirm from "./ModalConfirm"; // Kiểm tra lại tên component ModalConfirm
import _ from "lodash";
import { debounce } from "lodash";
import ModalDetailUser from "./modalDetailUser";
import style1 from "../../styles/UserHomePage.modules.scss";
import { FaUserPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { useSelector } from "react-redux";
import unidecode from "unidecode";  

const roomMapping = {
  1: 100,
  2: 101,
  3: 102, 4: 103,
  5: 104, 6: 105, 7: 106,
  8: 107,9: 108, 10: 109,11: 110,12: 111, 13: 112,14: 113,
  15: 118,
  16: 119,
  17: 130,
  18: 131,
  20: 132,
  21: 133,
  22: 134,
  23: 135,
  24: 136,
  25: 137,
  26: 138,
  27: 139,
};


const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  console.log("check admin", isAdmin);
  const auth = useSelector((state) => state.user.account.auth);
  console.log(auth);

  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);

  const [dataUseredit, setDataUserEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserDelete, setDataUserDelete] = useState({});
  const [keyword, setKeyWord] = useState("");

  const [isShowModalDetail, setIsShowModalDetail] = useState(false);
  const [dataDetailUser, setDataDetailUser] = useState({});

  const [roomNumbers, setRoomNumbers] = useState([]);

  useEffect(() => {
    fetchRoomNumbers();
  }, []);
  

  const fetchRoomNumbers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/room/roomNumber');
      const data = await response.json();
      if (data && data.data) {
        setRoomNumbers(data.data);
      }
    } catch (error) {
      console.error('Error fetching room numbers:', error);
    }
  };

  
  const handleClose = () => {
    setIsShowModalAdd(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
    setIsShowModalDetail(false);
  };
  const handUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleEditUserfrommodal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.renterId === user.renterId);
    cloneListuser[index].name = user.name;
    cloneListuser[index].dateOfBirth = user.dateOfBirth;
    cloneListuser[index].address = user.address;
    cloneListuser[index].phone = user.phone;
    cloneListuser[index].email = user.email;
    cloneListuser[index].cccd = user.cccd;
    setListUser(cloneListuser);
  };
  const handleDetailUserfrommodal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListuser[index].first_name = user.first_name;
    setListUser(cloneListuser);
  };
  useEffect(() => {
    getUser(1);
  }, []);
  const getUser = async (page) => {
    try {
      const res = await fetchAllUser(page); // Lấy thông tin các thiết bị
      if (res && res.renterList) {
        const { data, total_pages } = res.renterList;
        setTotalUser(res.total);
        const updatedUserList = res.renterList.map(user => ({
          ...user,
          roomNumber: roomMapping[user.roomId] || user.roomId // Map roomId to roomNumber
        }));
        setListUser(updatedUserList);
        setTotalPage(res.total_pages);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const handDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  const handDeleteUserFromModal = (user) => {
    let cloneListuser = _.cloneDeep(listUser);
    cloneListuser = cloneListuser.filter(
      (item) => item.renterId !== user.renterId
    );
    setListUser(cloneListuser);
  };
  const confirmDelete = (user) => {
    console.log("Xác nhận xóa:", user);
    handleClose();
  };
  const handleSearch = debounce((event) => {
    const term = event.target.value;
    if (term) {
      const searchTerm = unidecode(term.toLowerCase()); // Chuyển từ khóa tìm kiếm thành không dấu và chuyển sang chữ thường
      const cloneListuser = _.cloneDeep(listUser);
      const filteredUsers = cloneListuser.filter(
        (item) => item.name && unidecode(item.name.toLowerCase()).includes(searchTerm) // So sánh từ không dấu của tên người dùng với từ khóa tìm kiếm
      );
      setListUser(filteredUsers);
    } else {
      getUser(1);
    }
  }, 100);
  
  const handDetailUser = (user) => {
    setIsShowModalDetail(true);
    setDataDetailUser(user);
  };
  // Format ngày tháng năm
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="UserInfo_Manager" style={{ width: "80%" }}>
      <div className="my-3 add-new">
        <span>
          <b>Danh sách khách hàng:</b>
        </span>
        <button
          className=" them btn btn-success " 
          style={{  marginLeft: "680px" }}
          onClick={() => setIsShowModalAdd(true)}
        >
          <FaUserPlus
            className="mr-2 mx-1"
            style={{ fontSize: "1.3em", marginTop: "-5px" }}
          />
          Thêm danh sách
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm tên khách hàng ..."
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <div className="header-red">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ whiteSpace: "nowrap" }}>Tên khách hàng</th>
              <th style={{ whiteSpace: "nowrap" }}>Ngày sinh </th>
              <th style={{ whiteSpace: "nowrap" }}>Số điện thoại</th>
              <th style={{ whiteSpace: "nowrap" }}>Số CCCD</th>
              <th style={{ whiteSpace: "nowrap" }}>Khác</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.map((item, index) => (
                <tr key={`user-${index}`}>
                  <td>{item.name}</td>
                  <td>{formatDate(item.dateOfBirth)}</td>
                  <td>{item.phone}</td>
                  <td>{item.cccd}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handDeleteUser(item)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success mx-2"
                      onClick={() => handDetailUser(item)}
                    >
                      Chi Tiết
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={totalPage}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAdd
        show={isShowModalAdd}
        handleClose={handleClose}
        handUpdateTable={handUpdateTable}
      />
      <ModalEdit
        show={isShowModalEdit}
        dataUseredit={dataUseredit}
        handleClose={handleClose}
        handleEditUserfrommodal={handleEditUserfrommodal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handDeleteUserFromModal={handDeleteUserFromModal}
      />
      <ModalDetailUser
        show={isShowModalDetail}
        dataDetailUser={dataDetailUser}
        handleClose={handleClose}
        handleDetailUserfrommodal={handleDetailUserfrommodal}
      />
    </div>
  );
};
export default TableUser;
