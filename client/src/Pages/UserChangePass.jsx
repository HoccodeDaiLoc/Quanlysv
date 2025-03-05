import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";
import UserChangePassComponent from "../Components/UserChangePass";
function UserChangePass() {
  return (
    <>
      <div className="background"></div>
      <div className="wrapper">
        <div className="main_container">
          <UserSideBar />
          <UserChangePassComponent className="UserInfo"></UserChangePassComponent>
        </div>
      </div>
    </>
  );
}

export default UserChangePass;
