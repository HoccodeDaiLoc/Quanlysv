import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";

import { useState } from "react";
import UserContract from "../Components/UserContract";
function UserComplain() {
  return (
    <>
      <div className="background"></div>
      <div className="wrapper">
        <div className="main_container">
          <UserSideBar />
          <UserContract className="UserInfo"></UserContract>
        </div>
      </div>
    </>
  );
}

export default UserComplain;
