import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";
import UserInfo from "../Components/UserInfo";

import { useState } from "react";

function UserHomePage() {
  return (
    <>
      <div className="background"></div>
      <div className="wrapper">
        <div className="main_container">
          <UserSideBar className="UserSideBar" />
          <UserInfo className="UserInfo"></UserInfo>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
