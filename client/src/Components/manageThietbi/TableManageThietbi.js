import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllTb, fetchAllTro } from "../../service/ManageService";
import ModalEditTb from "./modalEditthietbi"; // Sửa tên thành component viết hoa
import ModalAddTb from "./modalAddThietbi"; // Sửa tên thành component viết hoa
import ModalConfirmTb from "./modalConfirmThietbi";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailTb from "./modalDetailThietBi";
import { TbDeviceIpadDollar } from "react-icons/tb";
import unidecode from "unidecode";  


const TableManageTb = (props) => {
  const [listTb, setListTb] = useState([]);
  const [totalTb, setTotalTb] = useState(0);
  const [totalPageTb, setTotalPageTb] = useState(0);
  const [isShowModalAddTb, setIsShowModalAddTb] = useState(false);
  const [isShowModalEditTb, setIsShowModalEditTb] = useState(false);
  const [dataTbedit, setDataTbEdit] = useState();

  const [isShowModalDeleteTb, setIsShowModalDeleteTb] = useState(false);
  const [dataTbDelete, setDataTbDelete] = useState({});

  const [keyword, setKeyWord] = useState("");

  const [isShowModalDetailTb, setIsShowModalDetailTb] = useState(false);
  const [dataDetailTb, setDataDetailTb] = useState({});

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
  


  const handleCloseTb = () => {
    setIsShowModalAddTb(false);
    setIsShowModalEditTb(false);
    setIsShowModalDeleteTb(false);
    setIsShowModalDetailTb(false);
  };

  const handUpdateTableTb = (tb) => {
    setListTb([tb, ...listTb]);
  };

  const handleEditTbfrommodal = (tb) => {
    let cloneListTb = _.cloneDeep(listTb);
    let index = listTb.findIndex((item) => item.deviceId === tb.deviceId);
    cloneListTb[index].deviceName = tb.deviceName;
    cloneListTb[index].devicePrice = tb.devicePrice;
    cloneListTb[index].roomId = tb.roomId;
    setListTb(cloneListTb);
  };

  useEffect(() => {
    // Call API
    getTb(1);
  }, []);

  const getTb = async (page) => {
    try {
        const resTb = await fetchAllTb(page); // Fetch device information
        if (resTb && resTb.data) {
            const { data, total_pages } = resTb.data;
            setTotalTb(resTb.total);
            const updatedTbList = resTb.data.map(tb => ({
                ...tb,
                roomNumber: roomNumbers.find(room => room.roomId === tb.roomId)?.roomNumber
            }));
            setListTb(updatedTbList);
            setTotalPageTb(resTb.total_pages);
        }
    } catch (error) {
        console.error("Error fetching tb data:", error);
    }
};


  const getDeviceName = (categoryId) => {
    switch (categoryId) {
      case 1:
        return "Máy lạnh";
      case 2:
        return "Tủ lạnh";
      case 3:
        return "Giường";
      case 4:
        return "Tivi";
      default:
        return "";
    }
  };

  const handlePageClick = (event) => {
    getTb(+event.selected + 1);
  };

  const handleEditTb = (tb) => {
    setDataTbEdit(tb);
    setIsShowModalEditTb(true);
  };

  const handDeleteTb = (tb) => {
    setIsShowModalDeleteTb(true);
    setDataTbDelete(tb);
  };

  const handDeleteTbFromModal = (tb) => {
    let cloneListTb = _.cloneDeep(listTb);
    cloneListTb = cloneListTb.filter((item) => item.deviceId !== tb.deviceId);
    setListTb(cloneListTb);
  };

  const handleDetailTbfrommodal = (tb) => {
    let cloneListtb = _.cloneDeep(listTb);
    let index = listTb.findIndex((item) => item.id == tb.id);
    cloneListtb[index].first_name = tb.first_name;
    setListTb(cloneListtb);
  };


  const handleSearchTb = debounce((event) => {
    const term = event.target.value.toLowerCase(); 
    if (term) {
        const filteredTb = listTb.filter((item) => {
            
            const roomNumberStr = item.roomNumber ? item.roomNumber.toString().toLowerCase() : "";
            return roomNumberStr.includes(term);
        });
        setListTb(filteredTb);
    } else {
        
        getTb(1);
    }
}, 200);




  const handDetailTb = (tb) => {
    setIsShowModalDetailTb(true);
    setDataDetailTb(tb);
  };

  return (
    <div
      className="UserInfo_Manager"
      style={{ width: "80%", margin: "0px 0px 0px auto" }}
    >
      <div className="my-3 add-new">
        <span>
          <b>Danh sách thiết bị:</b>
        </span>
        <button
          className="them btn btn-success" style={{  marginLeft: "700px" }}
          onClick={() => setIsShowModalAddTb(true)}
        >
          <TbDeviceIpadDollar    className="mr-2 mx-1" style={{ fontSize: "1.3em", marginTop: "-5px" }} />
           Thêm Thiết Bị
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Vui lòng nhập số phòng... "
          onChange={(event) => handleSearchTb(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>Loại thiết bị</th>
            <th style={{ whiteSpace: "nowrap" }}>Tên thiết bị</th>
            <th style={{ whiteSpace: "nowrap" }}>Giá thiết bị</th>
            <th style={{ whiteSpace: "nowrap" }}>Phòng sử dụng</th>
            <th style={{ whiteSpace: "nowrap" }}>Khác</th>
          </tr>
        </thead>
        <tbody>
          {listTb &&
            listTb.map((item, index) => (
              <tr key={`tb-${index}`}>
                <td>{getDeviceName(item.categoryId)}</td>
                <td
                  style={{
                    maxWidth: "400px",
                  }}
                >
                  <p id="text_table">{item.deviceName}</p>
                </td>
                <td>{item.devicePrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</td>

                <td>{roomNumbers.find(room => room.roomId === item.roomId)?.roomNumber}</td>

                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleEditTb(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handDeleteTb(item)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={() => handDetailTb(item)}
                  >
                   Chi tiết
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageTb}
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
      <ModalAddTb
        show={isShowModalAddTb}
        handleCloseTb={handleCloseTb}
        handUpdateTableTb={handUpdateTableTb}
      />
      <ModalEditTb
        show={isShowModalEditTb}
        dataTbedit={dataTbedit}
        handleCloseTb={handleCloseTb}
        handleEditTbfrommodal={handleEditTbfrommodal}
      />
      <ModalConfirmTb
        show={isShowModalDeleteTb}
        handleCloseTb={handleCloseTb}
        dataTbDelete={dataTbDelete}
        handDeleteTbFromModal={handDeleteTbFromModal}
      />
      <ModalDetailTb
        show={isShowModalDetailTb}
        dataDetailTb={dataDetailTb}
        handleCloseTb={handleCloseTb}
        handleDetailTbfrommodal={handleDetailTbfrommodal}
        roomNumbers={roomNumbers}
      />
    </div>
  );
};

export default TableManageTb;
