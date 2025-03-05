import Header from "../Components/ManagerHeader";

import TableManageTro from "../Components/manageTro/TableManageTro";
function manageTro() {
  return (
    <div className="wrapper">
      <div className="main_container">
        <Header></Header>
        <TableManageTro></TableManageTro>
      </div>
    </div>
  );
}

export default manageTro;
