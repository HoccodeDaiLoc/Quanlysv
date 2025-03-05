import { useSelector } from "react-redux";
import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const fetchCurrentUser = (id) => {
  return axios.get(`/api/renter/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const postForgetPassWord = (email) => {
  return axios.post(
    `/api/user/forgotpassword`,
    {
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const postResetPassWord = (email, token, newPassword) => {
  return axios.post(
    `/api/user/resetpassword`,
    {
      email,
      token,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const postCreateUser = (
  username,
  email,
  password
  //,  dob
) => {
  return axios.post(
    `/api/user/register`,
    {
      username: username,
      email: email,
      password: password,
      // date_of_birth: dob,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const postchecktoken = (email, tokenpass) => {
  return axios.post(
    "/api/user/checkresetpasswordtoken",
    {
      token: tokenpass,
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const putChangePass = (passwordCurrent, newPassword) => {
  console.log(passwordCurrent, newPassword);
  return axios.put(
    `/api/user/updatePassword`,
    {
      passwordCurrent: passwordCurrent,
      password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const putUpdateAvatar = (avatar, id) => {
  return axios.put(
    `/api/user/updateAvatar/${id}`,
    {
      avatar: avatar,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const fetchBillByRenter = (id, currentPage) => {
  // return axios.get(`/api/bill/renter/${id}?limit=12&page=${currentPage}`, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  return axios.get(`/api/bill/renter/${id}?limit=10&page=${currentPage}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const putUpdateUser = (id, name, dateOfBirth, address, phone, email, cccd) => {
  return axios.put(
    `api/renter/${id}`,
    {
      name,
      dateOfBirth,
      address,
      phone,
      email,
      cccd,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const loginApi = (username, password) => {
  return axios.post(
    `/api/user/login`,
    { username, password },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const fetchContractByRenter = (id) => {
  return axios.get(`/api/contract/renter/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export {
  fetchAllUser,
  postForgetPassWord,
  fetchCurrentUser,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  loginApi,
  postResetPassWord,
  putChangePass,
  postchecktoken,
  fetchBillByRenter,
  putUpdateAvatar,
  fetchContractByRenter,
};
