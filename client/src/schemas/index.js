import * as yup from "yup";
const basicSchema = yup.object().shape({
  username: yup.string().required("Hãy nhập tài khoản"),
  email: yup
    .string()
    .email("cần nhập email đúng định dạng")
    .required("cần nhập email đúng định dạng"),
  password: yup.string().required("Hãy nhập mật khẩu"),
});

const Loggin = yup.object().shape({
  username: yup.string().required("Hãy nhập tài khoản"),
  password: yup.string().required("Hãy nhập mật khẩu"),
});

const ChangeInfo = yup.object().shape({
  name: yup.string().required("Hãy nhập họ và tên"),
  email: yup.string().email().required("cần nhập email đúng định dạng"),
  CCCD: yup.string().min(12).max(12).required("Hãy nhập đúng số căn cước"),
  address: yup.string().min(10).max(500).required("Hãy nhập đúng số địa chỉ"),
  phone: yup.string().min(10).max(10).required("Hãy nhập đúng số điện thoại"),
});

const UpdatePass = yup.object().shape({
  password: yup.string().min(5).required("Required"),
  newPassword: yup
    .string()
    .min(5)
    .required("Required")
    .notOneOf(
      [yup.ref("password")],
      "New password cannot be the same as current password"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

export { basicSchema, Loggin, UpdatePass, ChangeInfo };
