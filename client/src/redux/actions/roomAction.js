import { useDispatch } from "react-redux";

export const GetCategory = "GetCategory_SUCCESS";
export const handleCategorySelectRedux = (deviceCategoryId) => {
  return async (dispatch, getState) => {
    dispatch({ type: GetCategory });
    {
    }
  };
};
