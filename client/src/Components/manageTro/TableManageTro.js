import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllTro } from "../../service/ManageService";
import ModalEditTro from "./modalEditTro"; // Sửa tên thành component viết hoa
import ModalAddTro from "./modalAddTro"; // Sửa tên thành component viết hoa
import ModalConfirmTro from "./ModalCofirmTro";
import { debounce } from "lodash";
import style from "../../styles/UserHomePage.modules.scss";
import _ from "lodash";
import ModalDetailTro from "../manageTro/modalDetailTro";
import { MdAddHomeWork } from "react-icons/md";

const TableManageTro = (props) => {
  const [listTro, setListTro] = useState([]);
  const [totalTro, setTotalTro] = useState(0);
  const [totalPageTro, setTotalPageTro] = useState(0);

  const [isShowModalAddTro, setIsShowModalAddTro] = useState(false);
  const [isShowModalEditTro, setIsShowModalEditTro] = useState(false);
  const [dataTroEdit, setDataTroEdit] = useState();

  const [isShowModalDeleteTro, setIsShowModalDeleteTro] = useState(false);
  const [dataTroDelete, setDataTroDelete] = useState({});

  const [keyword, setKeyWord] = useState("");

  const [isShowModalDetailTro, setIsShowModalDetailTro] = useState(false);
  const [dataDetailTro, setDataDetailTro] = useState({});

  const handleCloseTro = () => {
    setIsShowModalAddTro(false);
    setIsShowModalEditTro(false);
    setIsShowModalDeleteTro(false);
    setIsShowModalDetailTro(false);
  };

  const handUpdateTableTro = (tro) => {
    setListTro([tro, ...listTro]);
  };

  const handleEditTrofrommodal = (tro) => {
    let cloneListTro = _.cloneDeep(listTro);
    let index = listTro.findIndex((item) => item.roomId === tro.roomId);
    cloneListTro[index].roomNumber = tro.roomNumber;
    cloneListTro[index].roomStatus = tro.roomStatus;
    cloneListTro[index].roomArea = tro.roomArea;
    cloneListTro[index].description = tro.description;
    cloneListTro[index].price = tro.price;

    setListTro(cloneListTro);
  };
  

  useEffect(() => {
    // Call API
    getTro(1);
  }, []);

  const getTro = async (page) => {
    try {
      const res = await fetchAllTro(page);
      if (res && res.data) {
        const { data, total_pages } = res.data;
        setTotalTro(res.data.total);
        setListTro(res.data);
        setTotalPageTro(res.total_pages);
      }
    } catch (error) {
      console.error("Error fetching tro data:", error);
    }
  };

  const handlePageClick = (event) => {
    getTro(+event.selected + 1);
  };

  const handleEditTro = (tro) => {
    setDataTroEdit(tro);
    console.log("room before passing", tro);
    setIsShowModalEditTro(true);
  };

  const handDeleteTro = (tro) => {
    setIsShowModalDeleteTro(true);
    setDataTroDelete(tro);
  };

  const handDeleteTroFromModal = (tro) => {
    let cloneListTro = _.cloneDeep(listTro);
    cloneListTro = cloneListTro.filter((item) => item.roomId !== tro.roomId);
    setListTro(cloneListTro);
  };

  const handleDetailTrofrommodal = (tro) => {
    let cloneListTro = _.cloneDeep(listTro);
    let index = listTro.findIndex((item) => item.roomId == tro.roomId);
    cloneListTro[index].first_name = tro.first_name;
    setListTro(cloneListTro);
  };

  const handleSearchTro = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneListTro = _.cloneDeep(listTro);
      cloneListTro = cloneListTro.filter((item) =>
        item.roomNumber.toString().includes(term)
      );
      setListTro(cloneListTro);
    } else {
      getTro(1);
    }
  }, 100);

  const handDetailTro = (tro) => {
    setIsShowModalDetailTro(true);
    setDataDetailTro(tro);
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("vi-VN").format(price) + " VND";
  };

  return (
    <div className="UserInfo_Manager" style={{ width: "80%" }}>
      <div className="my-3 add-new">
        <span>

          <b>Danh sách phòng trọ:</b>
        </span>
        <button
          className=" them btn btn-success " style={{  marginLeft: "700px" }}
          onClick={() => setIsShowModalAddTro(true)}
        >
          <MdAddHomeWork
            className="mr-2 mx-1"
            style={{ fontSize: "1.3em", marginTop: "-5px" }}
          />
          Thêm Phòng
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm số phòng..."
          onChange={(event) => handleSearchTro(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Số Phòng</th>
            {/* <th>Loại phòng</th> */}
            <th>Giá phòng</th>
            <th>Tình trạng</th>
            <th>Diện tích</th>
            <th>Khác</th>
          </tr>
        </thead>
        <tbody>
          {listTro &&
            listTro.map((item, index) => (
              <tr key={`tro-${index}`}>
                <td>{item.roomNumber}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.roomStatus}</td>
                <td>{item.roomArea}m²</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleEditTro(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handDeleteTro(item)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={() => handDetailTro(item)}
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
        pageCount={totalPageTro}
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
      <ModalAddTro
        show={isShowModalAddTro}
        handleCloseTro={handleCloseTro}
        handUpdateTableTro={handUpdateTableTro}
      />
      <ModalEditTro
        show={isShowModalEditTro}
        dataTroEdit={dataTroEdit}
        handleCloseTro={handleCloseTro}
        handleEditTrofrommodal={handleEditTrofrommodal}
      />
      <ModalConfirmTro
        show={isShowModalDeleteTro}
        handleCloseTro={handleCloseTro}
        dataTroDelete={dataTroDelete}
        handDeleteTroFromModal={handDeleteTroFromModal}
      />
      <ModalDetailTro
        show={isShowModalDetailTro}
        dataDetailTro={dataDetailTro}
        handleCloseTro={handleCloseTro}
        handleDetailTrofrommodal={handleDetailTrofrommodal}
      />
    </div>
  );
};

export default TableManageTro;
