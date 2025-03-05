import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchContractByRenter } from "../service/UserService";

function UserContract() {
  const [contractData, setContractData] = useState("");
  const [respone, setRespone] = useState();
  const id = useSelector((state) => state.user.account.renterId);
  useEffect(() => {
    const fetchContract = async (id) => {
      let res = await fetchContractByRenter(id);
      setRespone(res);
      setContractData(res.contract);
    };
    fetchContract(id);
  }, []);
  const [active, setActive] = useState();
  return (
    <div className="UserInfo_Wrapper">
      <div className="UserInfo_Container">
        {respone === 404 ||
        respone === undefined ||
        respone === null ||
        contractData === undefined ||
        contractData === null ? (
          "Bạn chưa có hợp đồng nào"
        ) : (
          <>
            <h4 className="UserInfo_Item_Heading">Hợp đồng hiện tại</h4>
            <div className="UserInfo_Item">
              <h6 className="UserInfo_Item_Text">Mã hợp đồng</h6>
              <input
                type="text"
                placeholder={
                  contractData.contractId != null ? contractData.contractId : ""
                }
                className={"UserInfo_Item_Input"}
                disabled
              />
            </div>
            <div className="UserInfo_Item">
              <h6 className="UserInfo_Item_Text">Ngày bắt đầu</h6>
              <input
                type="text"
                maxLength={50}
                placeholder={
                  contractData.startDay != null
                    ? contractData.startDay.slice(0, 10)
                    : ""
                }
                disabled
                className={"UserInfo_Item_Input"}
              />
            </div>{" "}
            <div className="UserInfo_Item">
              <h6 className="UserInfo_Item_Text">Ngày kết thúc</h6>
              <input
                type="text"
                maxLength={50}
                placeholder={
                  contractData.endDate != null
                    ? contractData.endDate.slice(0, 10)
                    : ""
                }
                disabled
                className={"UserInfo_Item_Input"}
              />
            </div>{" "}
            <div className="UserInfo_Item">
              <h6 className="UserInfo_Item_Text">Số người thuê</h6>
              <input
                type="text"
                maxLength={50}
                placeholder={
                  contractData.rentAmount != null ? contractData.rentAmount : ""
                }
                disabled
                className={"UserInfo_Item_Input"}
              />
            </div>{" "}
            <div className="UserInfo_Item">
              <h6 className="UserInfo_Item_Text">Tiền cọc</h6>
              <input
                type="text"
                maxLength={50}
                placeholder={
                  contractData.depositAmount != null
                    ? contractData.depositAmount
                    : ""
                }
                disabled
                className={"UserInfo_Item_Input"}
              />
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default UserContract;
