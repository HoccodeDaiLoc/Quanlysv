import UserBill from "../Components/UserBill";
import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";

function UserBillPage() {
  return (
    <>
      <div className="background"></div>
      <div className="wrapper">
        <div className="main_container">
          <UserSideBar />
          <UserBill className="UserInfo"></UserBill>
        </div>
      </div>
    </>
  );
}

export default UserBillPage;
