import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserService";
function TableUsers(props) {
  const [listUsers, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState("");
  const [totalPage, setTotalPage] = useState("");
  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async () => {
    let res = await fetchAllUser();
    if (res && res.data) {
      setListUser(res.data);
      setTotalUser(res.total);
      setTotalPage(res.total_pages);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TableUsers;
