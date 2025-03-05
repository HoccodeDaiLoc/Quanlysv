import Dropdown from "react-bootstrap/Dropdown";
import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function UserComplain() {
  const user = useSelector((state) => state.user.account);
  const token = useSelector((state) => state.user.account.token);
  useEffect(() => {});
  const [reason, setReason] = useState("Danh mục");
  const handleClick = (e) => {
    setReason(e);
  };
  return (
    <div className="UserInfo_Wrapper">
      <form className="UserInfo_Container">
        <h4 className="UserInfo_Item_Heading">Phòng của tôi</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Lý do</h6>
          <Dropdown
            style={{ border: "none" }}
            className={"UserInfo_Item_Input"}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {reason}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  handleClick("Điểm cần cải thiện");
                }}
              >
                Điểm cần cải thiện
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleClick("Thiết bị");
                }}
              >
                Thiết bị
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleClick("Tiếng ồn");
                }}
              >
                Tiếng ồn
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleClick("Khác");
                }}
              >
                Khác
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="UserInfo_Item_Complain">
          <h6 className="UserInfo_Item_Text">Cụ thể hơn</h6>
          <textarea
            type="text"
            maxLength={5000}
            style={{
              width: "800px",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
            // value={"Username"}
            className={"UserInfo_Item_Input_Complain"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Edit_Button_Container">
          <button
            className="UserInfo_Edit_Button"
            onClick={(e) => {
              // handleSubmit(e);
            }}
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserComplain;
