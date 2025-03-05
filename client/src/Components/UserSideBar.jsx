import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import TableUsers from "./TableUsers";
import style from "../styles/UserSideBar.modules.scss";
import ava from "../asset/image/ava.svg";
import room from "../asset/image/room.svg";
import password from "../asset/image/password.svg";
import bill from "../asset/image/bill.svg";
import contract from "../asset/image/contract.svg";
import contact from "../asset/image/contact.svg";

const UserSideBar = () => {
  const [activeItem, setActiveItem] = useState("indexpage");
  const handleClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="UserSideBar_wrapper">
      <div className="UserSideBar_container">
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Profile"}
            onClick={() => {
              handleClick("indexpage");
            }}
            className={`UserSideBar_Detail `}
          >
            <img src={ava} className="icon" alt="" />

            <div className={`UserSideBar_text `}>Thông tin cá nhân</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Room"}
            onClick={() => {
              handleClick("Room");
            }}
            className={`UserSideBar_Detail`}
          >
            <img src={room} className="icon" alt="" />
            <div className={`UserSideBar_text `}>Phòng của tôi</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/ChangePassword"}
            onClick={() => {
              handleClick("ChangePassword");
            }}
            className={`UserSideBar_Detail `}
          >
            <img src={password} className="icon" alt="" />
            <div className={`UserSideBar_text`}>Thay đổi mật khẩu</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Complain"}
            onClick={() => {
              handleClick("Complain");
            }}
            className={`UserSideBar_Detail `}
          >
            <img src={contact} className="icon" alt="" />
            <div className={`UserSideBar_text`}>Phản ánh</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Contract"}
            onClick={() => {
              handleClick("Contract");
            }}
            className={`UserSideBar_Detail ${activeItem === "Contract" ? "active" : ""}`}
          >
            <img src={contract} className="icon" alt="" />
            <div
              className={`UserSideBar_text ${activeItem === "Contract" ? "active" : ""}`}
            >
              Thông tin hợp đồng
            </div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Bill"}
            onClick={() => {
              handleClick("Bill");
            }}
            className={`UserSideBar_Detail ${activeItem === "Bill" ? "active" : ""}`}
          >
            <img src={bill} className="icon" alt="" />
            <div
              className={`UserSideBar_text ${activeItem === "Bill" ? "active" : ""}`}
            >
              Xem hóa đơn
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
