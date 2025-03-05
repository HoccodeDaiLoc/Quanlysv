import { Link, useNavigate } from "react-router-dom";
import style from "../styles/Identify.modules.scss";
import { useState } from "react";
import { postForgetPassWord } from "../service/UserService";
import { toast } from "react-toastify";

function UserIdentify() {
  const [ForgetEmail, setForgetEmail] = useState();
  const navigate = useNavigate();
  return (
    <>
      <div className="Identify_wrapper">
        <div className="sub_wrapper">
          <div className="header">
            <div className="header_title">Tìm tài khoản của bạn</div>
          </div>
          <div className="main">
            <div className="sub_main">Vui lòng nhập email</div>
            <input
              className="sub_main_input"
              onChange={(e) => setForgetEmail(e.target.value)}
              placeholder="email"
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
                navigate("/Recover/RecoverInitiate", { state: ForgetEmail });
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserIdentify;
