import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Rooms from "./Pages/Rooms";
import RoomDetail from "./Pages/RoomDetail";
import Sign from "./Pages/Sign";
import Loggin from "./Pages/Loggin";
import Notification from "./Pages/Notification";
import UserHomePage from "./Pages/UserHomePage";
import UserComplainPage from "./Pages/UserComplainPage";
import UserContract from "./Pages/UserContract";
import { useSelector } from "react-redux";
import ManagerHeader from "./Components/ManagerHeader";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Category from "./Pages/Category";
import UserRoom from "./Pages/UserRoom";
import UserBillPage from "./Pages/UserBillPage";
import Deposit from "./Components/Deposit";
import Identify from "./Pages/Identify";
import RecoverInitiate from "./Pages/RecoverInitiatePage";
import RecoverCode from "./Pages/RecoverCodePage";
import RecoverPassword from "./Pages/RecoverPasswordPage";
import UserChangePass from "./Pages/UserChangePass";
import RoomPriceFilterPage from "./Pages/RoomPriceFilterPage";
import UserInfo from "./Components/UserInfo";
import ManagerTro from "./Pages/ManagerTro";
import ManageTb from "./Pages/ManageTb";
import ManageUser from "./Pages/ManagerUser";
import ManageHoadon from "./Pages/ManageHoadon";
import ManageHopDong from "./Pages/ManageHopdong";
import TableManageHoadon from "./Components/manageHoadon/TableManageHoadon";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.user.account.auth);
  if (!auth) {
    return <Navigate to="/loggin" replace />;
  }
  return children;
}
function SuperPrivateRoute({ children }) {
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  if (!isAdmin) {
    return <Navigate to="/loggin" replace />;
  }
  return children;
}

function App() {
  const id = useSelector((state) => state.user.account.id);
  const [socket, setSocket] = useState("");
  useEffect(() => {
    console.log("check", id);
    if (id) {
      console.log("userid first", id);
      setSocket(io("http://localhost:8080", { query: { userId: id } }));
      console.log("socket", socket);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header socket={socket}></Header>
        <Routes>
          <Route
            index
            path="/user/Room"
            element={
              <PrivateRoute>
                <UserRoom />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/Contract"
            element={
              <PrivateRoute>
                <UserContract />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/ChangePassword"
            element={
              <PrivateRoute>
                <UserChangePass />
              </PrivateRoute>
            }
          ></Route>{" "}
          <Route
            path="/user/Complain"
            element={
              <PrivateRoute>
                <UserComplainPage />
              </PrivateRoute>
            }
          ></Route>{" "}
          <Route
            path="/user/Profile"
            element={
              <PrivateRoute>
                <UserHomePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/Bill"
            element={
              <PrivateRoute>
                <UserBillPage></UserBillPage>
              </PrivateRoute>
            }
          ></Route>
          <Route
            index
            path="/Home"
            element={
              <SuperPrivateRoute>
                <ManageUser></ManageUser>
              </SuperPrivateRoute>
            }
          />
          <Route
            path="/pageQLPT"
            element={
              <SuperPrivateRoute>
                <ManagerTro></ManagerTro>
              </SuperPrivateRoute>
            }
          />
          <Route
            path="/pageQLTB"
            element={
              <SuperPrivateRoute>
                <ManageTb></ManageTb>
              </SuperPrivateRoute>
            }
          />
          <Route
            path="/pageHD"
            element={
              <SuperPrivateRoute>
                <ManageHopDong></ManageHopDong>
              </SuperPrivateRoute>
            }
          />
          <Route
            path="/PageQLHD"
            element={
              <SuperPrivateRoute>
                <ManageHoadon></ManageHoadon>
              </SuperPrivateRoute>
            }
          />
          <Route path="/" element={<Rooms />} />
          <Route path="/Notification" element={<Notification />}></Route>
          <Route path="/SignIn" element={<Sign />}></Route>
          <Route path="/Loggin" element={<Loggin />}></Route>
          <Route path="Rooms/:RoomId" element={<RoomDetail />} />
          <Route path="Room/:RoomId/Deposit" element={<Deposit />} />
          <Route path="/Identify" element={<Identify />}></Route>
          <Route
            path="/Recover/RecoverInitiate"
            element={<RecoverInitiate />}
          ></Route>
          <Route path="/Recover/Code" element={<RecoverCode />}></Route>
          <Route path="/Recover/Password" element={<RecoverPassword />}></Route>
          <Route path="/category/:categories" element={<Category />} />
          <Route
            path="/room/price/"
            element={<RoomPriceFilterPage></RoomPriceFilterPage>}
          ></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
