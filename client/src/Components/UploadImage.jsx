/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../utils/firebase";
import style from "../styles/Upload.modules.scss";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
const metadata = {
  contentType: "image/jpeg",
};

const UploadImage = () => {
  const [image, setImage] = useState(null); // state lưu ảnh sau khi chọn
  const [progress, setProgress] = useState(0); // state hiển thị phần trăm tải ảnh lên store
  const [uploadedImages, setUploadedImages] = useState([]); // state hiển thị danh sách ảnh đã tải lên store

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedImages([downloadURL, ...uploadedImages]);
          toast.success(downloadURL, {
            position: "top-center",
          });
          setImage(null);
          setProgress(0);
        });
      }
    );
  };

  const getLatestImage = async () => {
    try {
      const listRef = ref(storage, "images");

      // List all items (up to 1 result) ordered by creation time (descending)
      const result = await listAll(listRef, {
        orderBy: storage.refField("metadata.creationTime"),
        limit: 1,
        startAfter: null, // Include all items
        endBefore: null, // Include all items
      });

      if (result.items.length > 0) {
        const latestItemRef = result.items[0];
        const latestImageUrl = await getDownloadURL(latestItemRef);
        setUploadedImages([latestImageUrl]); // Update state with single URL
      } else {
        console.log("No images found in Firebase Storage");
        // Optionally handle the case where no images are found
      }
    } catch (error) {
      console.error("Error getting download URL:", error);
    }
  };

  // useEffect(() => {
  //   getLatestImage();
  // }, []);
  return (
    <div className="Upload_container">
      <div className="Upload_sub ">
        <div className="image-input-container">
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            id="imageInput"
          />
          <label htmlFor="imageInput" className="InputText">
            Select Image
          </label>
          {image && (
            <p className="image_preview_title">Selected: {image.name}</p>
          )}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="image_preview_item"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        {progress > 0 && (
          <progress
            value={progress}
            max="progress-bar"
            className="progress-bar"
          />
        )}
        {image && (
          <button onClick={handleUpload} className="btn_upload">
            Upload
          </button>
        )}
      </div>
      {uploadedImages.length > 0 && (
        <div className="uploaded_images_container">
          <h2 className="uploaded_images_title">Uploaded Images</h2>
          <div className="uploaded-images">
            {uploadedImages.map((url, index) => (
              <div key={index} className="">
                <img src={url} alt={`Uploaded ${index}`} className="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
