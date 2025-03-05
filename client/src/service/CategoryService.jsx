import axios from "./customize-axios";
const fecthAllCategory = () => {
  return axios.get(`/api/category`);
};
export { fecthAllCategory };
