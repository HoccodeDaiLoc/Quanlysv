import Header from "../Components/ManagerHeader";
import style from "../styles/UserHomePage.modules.scss";

import TableManageTb from "../Components/manageThietbi/TableManageThietbi";
function manageThietbi() {
  return (
        <div className="wrapper">
      <div className="main_container">
    <Header className="UserSide Bar" ></Header>
      <TableManageTb className="UserInfo"></TableManageTb>    
        </div>
    </div>
  );
}

export default manageThietbi;
