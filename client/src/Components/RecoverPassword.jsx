import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../styles/Identify.modules.scss";
import { useState } from "react";
import { postResetPassWord } from "../service/UserService";
import { toast } from "react-toastify";
function RecoverPassword() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  return (
    <>
      <div className="Identify_wrapper">
        <div className="sub_wrapper">
          <div className="header">
            <div className="header_title">Chọn mật khẩu mới </div>
          </div>
          <div className="main">
            <div className="sub_main">
              Tạo mật khẩu mới có tối thiểu 6 ký tự. Mật khẩu mạnh là mật khẩu
              được kết hợp từ các ký tự, số và dấu câu.{" "}
            </div>
            <input
              className="sub_main_input"
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="code"
              type="text"
            ></input>
          </div>
          <div className="footer">
            <div className="cancle">
              <Link to={"/Loggin"}>Hủy</Link>
            </div>

            <button
              className="submit_btn"
              onClick={() => {
                postResetPassWord(data.email, data.token, newPass).then(
                  navigate("/Loggin")
                );
              }}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecoverPassword;
