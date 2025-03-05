import style from "../styles/UserInfo.modules.scss";
import DatePicker from "react-datepicker";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  fetchCurrentUser,
  putUpdateAvatar,
  putUpdateUser,
} from "../service/UserService";
import { toast } from "react-toastify";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

import { storage } from "../utils/firebase";
import style1 from "../styles/Upload.modules.scss";
import defaultava from "../asset/image/person-button-svgrepo-com.svg";
const metadata = {
  contentType: "image/jpeg",
};
//hết trôn
function UserInfo() {
  const accessToken = localStorage.getItem("accesstoken");
  const id = useSelector((state) => state.user.account.renterId);
  const username = useSelector((state) => state.user.account.username);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [CCCD, setCCCD] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
  const [uploadedImages, setUploadedImages] = useState([]); // state hiển thị danh sách ảnh đã tải lên store
  const [avatarLink, setAvatarLink] = useState("");
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${id}/${image.name}`);

    const uploadTask = uploadBytesResumable(storageRef, image, metadata);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setUploadedImages([downloadURL, ...uploadedImages]);
          let res = await putUpdateAvatar(downloadURL, id);
          setAvatarLink(downloadURL);
          setImage(null);
          setProgress(0);
        });
      }
    );
  };

  useEffect(() => {
    const getCurrentUser = async (id) => {
      let res = await fetchCurrentUser(id);
      // let ava =await
      let data = res.renter;
      console.log(data);
      setEmail(data.email);
      setName(data.name);
      setDateOfBirth(data.dateOfBirth);
      setAddress(data.address);
      setPhoneNumber(data.phone);
      setCCCD(data.cccd);
      setAvatarLink(data.account.avatar);
    };
    getCurrentUser(id);
  }, []);

  const validate = () => {
    if (
      name === "" ||
      name === null ||
      dateOfBirth === "" ||
      dateOfBirth === null ||
      address === "" ||
      address === null ||
      phone === "" ||
      phone === null ||
      CCCD === "" ||
      CCCD === null
    ) {
      setErrorMessage("Hãy nhập đầy đủ thông tin");
      return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setErrorMessage("Số điện thoại phải có 10 chữ số");
      return false;
    }

    if (CCCD.length !== 12 || isNaN(CCCD)) {
      setErrorMessage("Số CCCD phải có 12 chữ số");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error(errorMessage, { position: "top-center" });
      return;
    }

    try {
      await putUpdateUser(id, name, dateOfBirth, address, phone, email, CCCD);
      setName(name);
      setDateOfBirth(dateOfBirth);
      setAddress(address);
      setPhoneNumber(phone);
      setEmail(email);
      setCCCD(CCCD);
      setAvatarLink(avatarLink);
      localStorage.setItem("avatar", avatarLink);
      console.log(" check local", localStorage.getItem("avatar"));
      toast.success("Đã thay đổi thông tin thành công", {
        position: "top-center",
      });
      window.scrollBy({ top: -10000, behavior: "smooth" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  return (
    <div className="UserInfo_Wrapper">
      <form className="UserInfo_Container" onSubmit={handleSubmit}>
        <h4 className="UserInfo_Item_Heading">Thông tin cá nhân</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Tên đăng nhập</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={username}
            disabled
            className={"UserInfo_Item_Input"}
          />
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Họ tên</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Họ tên của bạn"
            defaultValue={name}
            disabled
            className={"UserInfo_Item_Input"}
          />
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Email</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Email của bạn"
            defaultValue={email}
            disabled
            className={"UserInfo_Item_Input"}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">CCCD</h6>
          <input
            type="text"
            maxLength={12}
            placeholder="CCCD của bạn"
            disabled
            defaultValue={CCCD}
            className={"UserInfo_Item_Input"}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <div className="sub_dob_container">
            <h6 className="UserInfo_Item_Text">Ngày sinh</h6>
            <DatePicker
              disabled
              className="UserInfo_Item_Input"
              selected={dateOfBirth}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Địa chỉ</h6>
          <input
            type="text"
            maxLength={100}
            disabled
            defaultValue={address}
            placeholder="Địa chỉ của bạn"
            className={"UserInfo_Item_Input"}
          />
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số điện thoại</h6>
          <input
            type="text"
            maxLength={10}
            disabled
            defaultValue={phone}
            placeholder="Số điện thoại của bạn"
            className={"UserInfo_Item_Input"}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Ảnh hồ sơ</h6>
          <div className="Upload_container">
            <div className="uploaded_images_container">
              <img
                src={avatarLink != null ? avatarLink : defaultava}
                className="uploaded-images"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  minHeight: "150px",
                  minWidth: "150px",
                  borderRadius: "50%",
                }}
              ></img>
            </div>
            <div className="Upload_sub ">
              <div className="image-input-container">
                <input
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                  id="imageInput"
                />

                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="image_preview_item"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      minHeight: "150px",
                      minWidth: "150px",
                      margin: "0px 20px 0px 20px",
                    }}
                  />
                )}
                <div className="btn_container">
                  <label
                    htmlFor="imageInput"
                    className="InputText"
                    style={{
                      whiteSpace: "nowrap",
                      margin: "0px 20px 0px 20px",
                    }}
                  >
                    Chọn ảnh mới
                  </label>
                  {image && (
                    <div
                      onClick={() => {
                        handleUpload();
                      }}
                      className="btn_upload"
                    >
                      Upload
                    </div>
                  )}
                </div>
              </div>
              {progress > 0 && (
                <progress
                  value={progress}
                  max="progress-bar"
                  className="progress-bar"
                />
              )}
            </div>
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

export default UserInfo;
