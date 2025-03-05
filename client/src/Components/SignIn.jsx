import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/SignIn.modules.scss";
import { handleSignInRedux } from "../redux/actions/userAction";
import { useFormik } from "formik";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { basicSchema } from "../schemas/index";
import logo from "../asset/image/imagethuetro.png";

<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function SignIn() {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(handleSignInRedux(values.username, values.email, values.password));
    navigate("/Loggin");
    actions.resetForm();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  return (
    <form onSubmit={handleSubmit} className="SignWrapper" autoComplete="off">
      {/* <Link to={"/"} className="logo_container">
        <img className="logo" src={logo} alt="" srcSet="" />
      </Link> */}
      <div className="SignContainer">
        <div className="SubSignContainer">
          <hr></hr>
          <div className="text_container">
            <h3 className="title">Tạo tài khoản mới</h3>
            <h6 className="desc">Nhanh chóng và dễ dàng</h6>
          </div>
          <div className="SignForm">
            <div className="name_container">
              <input
                id="username"
                type="text"
                className={`inputbox ${errors.username && touched.username ? "input-error" : ""}`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Username"
                value={values.username}
              />
            </div>
            {errors.username && touched.username && (
              <p className="error">{errors.username}</p>
            )}
            <div className="email_container">
              <input
                value={values.email}
                id="email"
                type="email"
                className={`inputbox ${errors.email && touched.email ? "input-error" : ""}`}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
            <div className="pass_container">
              <input
                id="password"
                className={`pass inputbox ${errors.password && touched.password ? "input-error" : ""}`}
                type="password"
                value={values.password}
                placeholder="Mật khẩu"
                onChange={handleChange}
              />
            </div>
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}

            <hr></hr>
            <button className={"submit_Sign active"} type="submit">
              Đăng ký
            </button>
            <h6
              onClick={() => {
                navigate("/Loggin");
              }}
              className="sign_text"
            >
              Bạn đã có tài khoản?
            </h6>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
