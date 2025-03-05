import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateTro } from "../../service/ManageService";
import { toast } from "react-toastify";
import { storage } from '../../utils/firebase';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const metadata = {
  contentType: "image/jpeg",
};

const ModalAddTro = (props) => {
  const { show, handleCloseTro, handUpdateTableTro } = props;
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [roomStatus, setRoomStatus] = useState("Phòng trống");
  const [roomArea, setRoomArea] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [roomImage, setRoomImage] = useState([]);

  const handUpdateImagesTro = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);
    }
  };

  const handUpdateTro = async () => {
    if (isNaN(price) || isNaN(roomNumber) || isNaN(roomArea)) {
      toast.error("Giá phòng, số phòng và diện tích phải là số");
      return;
    }

    if (images.length === 0) {
      toast.error("Vui lòng thêm ít nhất một ảnh");
      return;
    }

    const imageUrlArray = [];
    images.forEach((image) => {
      const storageRef = ref(storage, `image/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            imageUrlArray.push(downloadURL);
            if (imageUrlArray.length === images.length) {
              postCreateTro(roomNumber, description, price, roomStatus, roomArea, imageUrlArray)
                .then(res => {
                  if (res) {
                    setRoomNumber("");
                    setDescription("");
                    setPrice("");
                    setRoomStatus("Phòng trống");
                    setRoomArea("");
                    setImages([]);
                    setUploadedImages([]);
                    setProgress(0);
                    handleCloseTro();
                    toast.success("Đã lưu thành công");
                    handUpdateTableTro({
                      roomNumber: roomNumber,
                      description: description,
                      price: price,
                      roomStatus: roomStatus,
                      roomArea: roomArea,
                      roomImage: imageUrlArray
                    });
                  } else {
                    toast.error("Đã xảy ra lỗi");
                  }
                })
                .catch(error => {
                  console.error("Error creating tro:", error);
                  toast.error("Đã xảy ra lỗi khi tạo phòng trọ");
                });
            }
          });
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseTro}
      backdrop="static"
      keyboard={false}
      dialogClassName="large-modal"
      size="xl"
      className="modal-add-tro"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm vào danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputRoomNumber" className="form-label">
              Số Phòng
            </label>
            <input
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
              placeholder="Nhập số phòng..."
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">
              Giá Thuê
            </label>
            <input
              type="text"
              className="form-control"
              value={price }
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Nhập giá thuê..."
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
              Diện Tích
            </label>
            <input
              type="text"
              className="form-control"
              value={roomArea}
              onChange={(event) => setRoomArea(event.target.value)}
              placeholder="Nhập diện tích..."
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Tình Trạng
            </label>
            <input
              type="text"
              className="form-control"
              value={roomStatus}
              onChange={(event) => setRoomStatus(event.target.value)}
              placeholder="Nhập tình trạng..."
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputDescription" className="form-label">
              Mô Tả
            </label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Nhập mô tả..."
            />
          </div>
          <div className="col-md-12">
            <label className="label-upload-anhtro" htmlFor="labelUploadTro">
              Thêm Ảnh
            </label>
            <input
              type="file"
              multiple
              hidden
              id="labelUploadTro"
              onChange={(event) => handUpdateImagesTro(event)}
            />
          </div>
          <div className="img_tro">
            {images.map((img, index) => (
              <img key={index} src={URL.createObjectURL(img)} alt={`Preview ${index}`} />
            ))}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTro}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handUpdateTro}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddTro;
