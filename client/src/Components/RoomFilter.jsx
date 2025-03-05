import { useEffect, useState } from "react";
import style from "../styles/RoomFilter.modules.scss";
import { fetchRoomByFeature } from "../service/RoomService";
import RoomsContent from "./RoomsContent";
function RoomFilter({ options, value, onChange }) {
  const [filter, setFilter] = useState();

  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   const getData = async (index) => {
  //     console.log("imhere");
  //     let res = await fetchRoomByFeature(index);
  //     console.log(res);
  //     // setFilter()
  //   };
  //   getData();
  // });

  return (
    <div className="RoomFilterWrapper">
      <div className="RoomFilterContainer">
        <div className="RoomFilter">
          <select name="Filter" id="Filter">
            <option className="" value="Price">
              Giá tiền
            </option>
            <option value="Area">Diện tích</option>
            <option value="Opacity">Số người ở</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default RoomFilter;
