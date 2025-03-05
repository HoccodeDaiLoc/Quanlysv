import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");
const PaymentByMomo = (billId, rederedirectUrl) => {
  return axios.post(
    `/api/payment/momo`,
    {
      billId,
      rederedirectUrl,
    },
    {
      headers: {
        Authorization: `Bearer${accessToken}`,
      },
    }
  );
};
export { PaymentByMomo };
