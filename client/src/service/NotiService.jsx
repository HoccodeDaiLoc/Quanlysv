import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");
const userid = localStorage.getItem("id");
const renter = localStorage.getItem("renterId");

const getNotification = (id) => {
  return axios.get(`/api/notification/user/${id}`, {
    headers: {
      Authorization: `Bearer${accessToken}`,
    },
  });
};

const postNotification = (id) => {
  return axios.post(
    `api/notification/changeread/${id}`,
    {
      userId: renter,
    },
    {
      headers: {
        Authorization: `Bearer${accessToken}`,
      },
    }
  );
};

export { getNotification, postNotification };
