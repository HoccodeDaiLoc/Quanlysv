import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Loggin.modules.scss";
import { handleLoginRedux } from "../redux/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Loggin } from "../schemas/index";
import { useFormik } from "formik";
import imagethuetro from "../asset/image/imagethuetro.png";
<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.account.auth);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(handleLoginRedux(values.username, values.password));
    actions.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: Loggin,
      onSubmit,
    });

  useEffect(() => {
    if (localStorage.getItem("accessToken") != null) {
      account.auth = true;
    }
    if (isAdmin === true) {
      navigate("/Home");
    }
    if (auth === true && isAdmin === false) {
      navigate("/");
    }
  }, [account]);

  return (
    <section className="LogginWrapper">
      {/* <Link to={"/"} className="logo_container">
        <img className="logo" src={imagethuetro} alt="" srcSet="" />
      </Link> */}

      <form
        onSubmit={handleSubmit}
        className="LogginContainer"
        autoComplete="off"
      >
        <hr></hr>

        <div className="LogginRight">
          <div className="title">Đăng nhập</div>
          {/* <form //onSubmit={handleSubmit} */}
          <div className="LogginForm">
            <div className="username_container">
              <div className="user_text">Tài khoản</div>
              <input
                id="username"
                type="text"
                className={`user_username inputbox ${errors.username && touched.username ? "input-error" : ""}`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tài khoản"
                value={values.username}
              />
            </div>
            {errors.username && touched.username && (
              <p className="error">{errors.username}</p>
            )}
            <div className="pass_container">
              <div className="pass_text">Mật khẩu</div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                id="password"
                className={`pass inputbox ${errors.password && touched.password ? "input-error" : ""}`}
                value={values.password}
                onChange={handleChange}
              />

              <FontAwesomeIcon
                onClick={() => setShowPassword(!showPassword)}
                className="icon1"
                icon={showPassword ? faEye : faEyeSlash}
              />
            </div>
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
            <div className="forgetpass_container">
              <Link to={"/Identify"}>
                <h6 onClick={() => {}} className="forgetpass_text">
                  Bạn quên mật khẩu?
                </h6>
              </Link>
            </div>

            <hr></hr>
            <button className="submit_loggin active" type="submit">
              Đăng nhập
            </button>
            <h6
              onClick={() => {
                navigate("/SignIn");
              }}
              className="Loggin_text"
            >
              Bạn chưa có tài khoản?
            </h6>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
