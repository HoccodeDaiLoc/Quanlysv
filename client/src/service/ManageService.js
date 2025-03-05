import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/renter?page=${page}&limit=8`);
};

const fetchAllTro = (page) => {
  return axios.get(`/api/room?page=${page}&limit=8`);
};

const fetchAllIdroom = () => {
  return axios.get(`/api/room/roomNumber/`,); // Sử dụng dấu nháy kép để bao quanh chuỗi
};

const fetchAllTb = (page) => {
  return axios.get(`/api/device?page=${page}&limit=8`);
};

const fetchAllHoadon = (page) => {
  return axios.get(`/api/bill?page=${page}&limit=8`); // Sử dụng dấu nháy kép để bao quanh chuỗi
};

const fetchAllstatusHd = (status) => {
  return axios.get(`/api/bill?status=${status}`); // Sử dụng dấu nháy kép để bao quanh chuỗi/api/room/${roomId}`
};
const fetchAllHd = (page) => {
  return axios.get(`/api/contract?page=${page}&limit=8`);
};

const fetchAllDetailRoom = (roomId) => {
  return axios.get(`/api/room/${roomId}`,);
};

const fetchAllDetailRenter = (roomId) => {
  return axios.get(`/api/renter/room/${roomId}`,);
};


const fetchAllContractRenter = (contractId) => {
  return axios.get(`/api/contract/${contractId}`,);
};



const postCreateUser = (name, dateOfBirth, address, phone, email, cccd,roomId) => {
  const renterList = new FormData();
  renterList.append("name", name);
  renterList.append("dateOfBirth", dateOfBirth);
  renterList.append("address", address);
  renterList.append("phone", phone);
  renterList.append("email", email);
  renterList.append("cccd", cccd);

  return axios.post(
    `/api/renter`,
    { name, dateOfBirth, address, phone, email, cccd ,roomId},
    renterList
  );
};

const postCreateTro = (
  roomNumber,
  description,
  price,
  roomStatus,
  roomArea,roomImage
) => {
  return axios.post( `/api/room`,
    { roomNumber, description, price, roomStatus, roomArea,roomImage},
  
  ); };


const postCreateTb = (deviceName, devicePrice, roomId,categoryId,) => {
  return axios.post("/api/device", { deviceName, devicePrice, roomId,categoryId });
};

const postCreateHoadon = (
  billStartDate,
  billEndDate,
  payMethod,
  billStatus,
  waterPrice,
  electricPrice,
  roomId
) => {
  return axios.post("/api/bill/", {
    billStartDate,
    billEndDate,
    payMethod,
    billStatus,
    waterPrice,
    electricPrice,
    roomId,
  });
};

const postCreateHd = (
  startDay,
  rentAmount,
  roomId,
  renterId,
  endDate,
  depositAmount
) => {
  return axios.post("/api/contract", {
    startDay,
    rentAmount,
    roomId,
    renterId,
    endDate,
    depositAmount,
  });
};
const updateUser = (
  renterId,
  name,
  dateOfBirth,
  address,
  phone,
  email,
  cccd
) => {
  console.log("renterId", renterId);
  return axios.put(`/api/renter/${renterId}`, {
    name,
    dateOfBirth,
    address,
    phone,
    email,
    cccd,
  });
};

const updateTro = (
  roomId,
  roomNumber,
  description,
  price,
  roomStatus,
  roomArea,
  maxOccupancy
) => {
  console.log("roomid", roomId);
  return axios.put(`/api/room/${roomId}`, {
    roomNumber,
    description,
    price,
    roomStatus,
    roomArea,
    maxOccupancy,
  });
};

const updateTb = (deviceId, deviceName, devicePrice, roomId, categoryId) => {
  return axios.put(`/api/device/${deviceId}`, {
    deviceName,
    devicePrice,
    roomId,
    categoryId,
  });
};

const updateHoadon = (billId, status, paymentMethod) => {
  return axios.put(`/api/bill/${billId}`, { status, paymentMethod });
};

const updateHd = (
  contractId,
  startDay,
  endDate,
  rentAmount,
  depositAmount,
  roomId,
  renterId
) => {
  return axios.put(`api/contract/${contractId}`, {
    startDay,
    endDate,
    rentAmount,
    depositAmount,
    roomId,
    renterId,
  });
};

const deleteUser = (renterId) => {
  return axios.delete(`/api/renter/${renterId}`);
};

const deleteTro = (roomId) => {
  return axios.delete(`/api/room/${roomId}`);
};

const deleteTb = (deviceId) => {
  return axios.delete(`/api/device/${deviceId}`);
};

const deleteHoadon = (billId) => {
  return axios.delete(`/api/bill/${billId}`);
};
const deleteHd = (contractId) => {
  return axios.delete(`/api/contract/${contractId}`);
};

export {
  fetchAllUser,
  postCreateUser,
  updateUser,
  fetchAllTro,
  updateTro,
  postCreateTro,
  fetchAllIdroom,
  deleteUser,
  deleteTro,
  fetchAllTb,
  postCreateTb,
  updateTb,
  deleteTb,
  fetchAllHoadon,
  updateHoadon,
  deleteHoadon,
  postCreateHoadon,
  fetchAllstatusHd,
  fetchAllHd,
  postCreateHd,
  updateHd,
  deleteHd,
  fetchAllDetailRoom,
  fetchAllDetailRenter,
  fetchAllContractRenter
};
