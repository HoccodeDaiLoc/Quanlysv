import Header from "../Components/ManagerHeader";
import ManagermentUser from "../Components/ManagermentUser/ManagermentUser";

import TableUser from "../Components/manageUser/TableUser";

function manageUser() {
  return (
    <>
      <div className="wrapper">
        <div className="main_container">
          <Header></Header>
          <TableUser></TableUser>
        </div>
      </div>
    </>
  );
}

export default manageUser;
