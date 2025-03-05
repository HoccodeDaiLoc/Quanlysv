import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../styles/Identify.modules.scss";
import { useState } from "react";
import { postForgetPassWord } from "../service/UserService";
import { toast } from "react-toastify";
function RecoverInitiate() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  return (
    <>
      <div className="Identify_wrapper">
        <div className="sub_wrapper">
          <div className="header">
            <div className="header_title">
              Chúng tôi sẽ gửi mã đến email của bạn
            </div>
          </div>
          <div className="main">
            <div className="sub_main">
              Chúng tôi có thể gửi mã đăng nhập đến:
            </div>
            <div className="sub_main">{data}</div>
          </div>
          <div className="footer">
            <div className="cancle">
              <Link to={"/Loggin"}>Hủy</Link>
            </div>

            <button
              className="submit_btn"
              onClick={() => {
                postForgetPassWord(data);
                navigate("/Recover/Code", { state: data });
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

export default RecoverInitiate;
