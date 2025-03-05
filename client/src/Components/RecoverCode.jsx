import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "../styles/Identify.modules.scss";
import { useState } from "react";
import { postchecktoken } from "../service/UserService";
import { toast } from "react-toastify";
function RecoverCode() {
  const location = useLocation();
  const data = location.state;
  const [code, setCode] = useState();
  const authData = { email: data, token: code };

  const navigate = useNavigate();
  return (
    <>
      <div className="Identify_wrapper">
        <div className="sub_wrapper">
          <div className="header">
            <div className="header_title">Nhập mã bảo mật</div>
          </div>
          <div className="main">
            <div className="sub_main">
              Vui lòng kiểm tra mã trong email của bạn.
            </div>
            <input
              className="sub_main_input"
              onChange={(e) => setCode(e.target.value)}
              placeholder="code"
              type="text"
            ></input>
            <div className="sub_main">
              Chúng tôi đã gửi cho bạn mã đến:
              {data}
            </div>
          </div>
          <div className="footer">
            <div className="cancle">
              <Link to={"/Loggin"}>Hủy</Link>
            </div>

            <button
              className="submit_btn"
              onClick={async () => {
                let res = await postchecktoken(data, code);
                if (res.result === true) {
                  navigate("/Recover/Password", { state: authData });
                } else {
                }
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

export default RecoverCode;
