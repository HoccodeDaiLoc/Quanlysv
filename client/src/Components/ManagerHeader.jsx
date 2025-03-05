import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logoApp from "../asset/image/imagethuetro.png";
import "./ManagerHeader.modules.scss";
import { FaUserFriends } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { PiDevicesFill } from "react-icons/pi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
// import style from "../styles/UserHomePage.modules.scss";

const Header = () => {
  const location = useLocation();
  const getLinkClass = (path) =>
    location.pathname === path ? "active-link" : "";

  const [showSidebar, setShowSidebar] = useState(false); // Set initial value to false
  const [currentPage, setCurrentPage] = useState("Danh Sách Mục Quản lý"); // Initialize with default label

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const updateCurrentPage = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <>
      <Container
        fluid
        className="UserSideBar"
        style={{ padding: "0px", margin: "0px" }}
      >
        <Row>
          <Col
            xs={2}
            className={`bg-light p-3 sidebar ${showSidebar ? "show" : "hide"} `}
          >
            <Nav
              className={`flex-column ${showSidebar ? "show" : "hide"} `}
              style={{ width: "100%" }}
            >
              <Nav.Link
                as={Link}
                to="/Home"
                style={{ whiteSpace: "nowrap" }}
                className={`my-2 ${getLinkClass("/Home")} `}
                onClick={() => {
                  updateCurrentPage("Quản lý khách hàng");
                  toggleSidebar();
                }}
              >
                 <FaUserFriends className="mr-2 mx-1" style={{ fontSize: "1.5em", marginTop: "-8px" }} />
                Quản lý khách hàng
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLPT"
                style={{ whiteSpace: "nowrap" }}
                className={`my-2  ${getLinkClass("/pageQLPT")}`}
                onClick={() => {
                  
                  updateCurrentPage("Quản lý phòng trọ");
                  toggleSidebar();
                }}
              >
                <FaHome className="mr-2 mx-1" style={{ fontSize: "1.5em", marginTop: "-8px" }} />
                Quản lý phòng trọ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLTB"
                style={{ whiteSpace: "nowrap" }}
                className={`update my-2 ${getLinkClass("/pageQLTB")}`}
                onClick={() => {
                  updateCurrentPage("Quản lý thiết bị");
                  toggleSidebar();
                }}
              >
                <PiDevicesFill  className="mr-2 mx-1" style={{ fontSize: "1.5em", marginTop: "-8px" }} />
                Quản lý thiết bị
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLHD"
                style={{ whiteSpace: "nowrap" }}
                className={`my-2 ${getLinkClass("/pageQLHD")}`}
                onClick={() => {
                  updateCurrentPage("Quản lý hóa đơn");
                  toggleSidebar();
                }}
              >
                <FaMoneyCheckDollar  className="mr-2 mx-1" style={{ fontSize: "1.5em", marginTop: "-8px" }} />
                Quản lý hóa đơn
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageHD"
                style={{ whiteSpace: "nowrap" }}
                className={`update my-2 ${getLinkClass("/pageHD")}`}
                onClick={() => {
                  updateCurrentPage("Quản lý hợp đồng");
                  toggleSidebar();
                }}
              >
                <FaBook   className="mr-2 mx-1" style={{ fontSize: "1.5em", marginTop: "-8px" }} />
                Quản lý hợp đồng
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
