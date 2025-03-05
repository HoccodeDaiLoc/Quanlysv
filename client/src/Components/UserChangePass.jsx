import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { putChangePass } from "../service/UserService";
import { toast } from "react-toastify";
import { UpdatePass } from "../schemas/index";
import { useFormik } from "formik";
function UserChangePassComponent() {
  const mk = useSelector((state) => state.user.account.password);
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let res = await putChangePass(values.password, values.newPassword).then(
      () =>
        toast.success("Đã đổi mật khẩu thành công", {
          position: "top-center",
        })
    );
    res();
    console.log("check res", res);
    console.log(values, actions);
    actions.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: UpdatePass,
      onSubmit,
    });

  return (
    <div className="UserInfo_Wrapper">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="UserInfo_Container"
      >
        <h4 className="UserInfo_Item_Heading">Thay đổi mật khẩu</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Nhập mật khẩu cũ</h6>
          <div className="SubItem">
            <input
              maxLength={50}
              type="text"
              className={`UserInfo_Item_Input inputbox ${errors.password && touched.password ? "input-error" : ""}`}
              onChange={handleChange}
              value={values.password}
              id="password"
              placeholder="Mật khẩu"
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Mật khẩu mới</h6>
          <div className="SubItem">
            <input
              type="text"
              maxLength={50}
              className={`UserInfo_Item_Input inputbox ${errors.newPassword && touched.newPassword ? "input-error" : ""}`}
              onChange={handleChange}
              value={values.newPassword}
              id="newPassword"
              placeholder="Mật khẩu"
              onBlur={handleBlur}
            />
            {errors.newPassword && touched.newPassword && (
              <p className="error">{errors.newPassword}</p>
            )}
          </div>
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Nhập lại mật khẩu mới</h6>
          <div className="SubItem">
            <input
              id="confirmPassword"
              type="text"
              placeholder="Nhập lại mật khẩu mới"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`UserInfo_Item_Input inputbox ${errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}`}
              maxLength={50}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        <div className="UserInfo_Edit_Button_Container">
          <button
            className="UserInfo_Edit_Button"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserChangePassComponent;
