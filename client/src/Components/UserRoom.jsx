import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { fetchRoomByRenter } from "../service/RoomService";

function UserRoom() {
  const [roomData, setRoomData] = useState("");
  const [respone, setRespone] = useState();
  const id = useSelector((state) => state.user.account.renterId);
  useEffect(() => {
    const fetchRoomByID = async (id) => {
      let res = await fetchRoomByRenter(id);
      console.log(res);
      setRespone(res.status);
      setRoomData(res.room);
      console.log(respone);
      console.log(roomData);
    };
    fetchRoomByID(id);
  }, []);
  const [active, setActive] = useState();
  return (
    <div className="UserInfo_Wrapper">
      <div className="UserInfo_Container">
        {/* {respone === 404 ||
        respone === undefined ||
        respone === null ||
        roomData === undefined ||
        roomData === null ? (
          "Bạn chưa thuê phòng"
        ) : (
          <> */}
        <h4 className="UserInfo_Item_Heading">Phòng của tôi</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số phòng</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={roomData?.roomNumber || ""}
            className={"UserInfo_Item_Input"}
            disabled
          />
          {/* chưa có value, đang hard code */}
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Giá phòng</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={roomData?.price || ""}
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Diện tích</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={roomData?.roomArea || ""}
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số người tối đa cho phép</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={roomData?.maxOccupancy || ""}
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        {/* </>
        )} */}
      </div>
    </div>
  );
}

export default UserRoom;
