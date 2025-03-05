import axios from "./customize-axios";

const fetchAllRoom = (page) => {
  return axios.get(`/api/room`);
};
const fetchRoom = (index) => {
  return axios.get(`/api/room/${index}`);
};
const fetchRoomByDevice = (index) => {
  return axios.get(`/api/room/device?category_id=${index}`);
};
const fetchRoomByFeature = (index) => {
  return axios.get(`/api/room/device?category_id=${index}`);
};
const fetchRoomByPage = (currentPage) => {
  return axios.get(`/api/room?limit=12&page=${currentPage}`);
};
// api/room/price?lp=0&rp=1000000&limit=12&page=1
const fetchRoomByPrice = (lowerPrice, higherPrice, currentPage) => {
  return axios.get(
    `/api/room/price?lp=${lowerPrice}&rp=${higherPrice}&limit=12&page=${currentPage}`
  );
};
const fetchRoomByRenter = (index) => {
  return axios.get(`/api/room/renter/${index}`);
};
export {
  fetchAllRoom,
  fetchRoom,
  fetchRoomByDevice,
  fetchRoomByFeature,
  fetchRoomByPrice,
  fetchRoomByPage,
  fetchRoomByRenter,
};
