import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";
import UserRoom1 from "../Components/UserRoom";
import { useState } from "react";
function UserRoom() {
  return (
    <>
      <div className="background"></div>
      <div className="wrapper">
        <div className="main_container">
          <UserSideBar className="UserSideBar" />
          <UserRoom1 className="UserInfo"></UserRoom1>
        </div>
      </div>
    </>
  );
}

export default UserRoom;
