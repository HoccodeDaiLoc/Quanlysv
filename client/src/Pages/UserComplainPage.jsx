import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";
import { useState } from "react";
import UserComplainComponent from "../Components/UserComplain";
function UserComplainPage() {
  return (
    <>
      <div className="background"></div>
      <div className="wrapper">
        <div className="main_container">
          <UserSideBar />
          <UserComplainComponent className="UserInfo"></UserComplainComponent>
        </div>
      </div>
    </>
  );
}

export default UserComplainPage;
