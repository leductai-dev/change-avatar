import React, { useEffect, useState, useRef } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import "./ImageCrop.css";
import axios from 'axios'

const ImageCrop = (props) => {
  const [imgDestination, setimgDestination] = useState("");
  const [photo, setPhoto] = useState([]);
  const refImage = useRef(null);
  const {_handleShowEdit,_handleSetAvatar,src} = props
  useEffect(() => {
    console.log("cpn didmount");
    const cropper = new Cropper(document.getElementById("image"), {
      aspectRatio: 1,
      zoomable: false,
      scalable: false,
      crop: () => {
        const canvas = cropper.getCroppedCanvas();
       /*  let base64Image = canvas.toDataURL("image/png").split(';base64,').pop();
        console.log(base64Image) */
        let base64Image = canvas.toDataURL("image/png")
        setimgDestination(base64Image);
      },
    });
  });
  const uploadPhoto = async (data) => {
    const _data ={value:imgDestination}
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:2001/upload-image",_data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const {file} = props
    console.log("form submit");
    const data = new FormData();
    for (let pt of file) {
      data.append("photo", pt);
    }
    uploadPhoto(data)
      .then((res) => {
        _handleShowEdit(false)
        _handleSetAvatar(imgDestination)
        console.log(res)}
        )
      .catch((err) => console.log(err));
  };

  return (
    <div className="cropimg-container">
      <div className="wraper">
        <div className="croper-img">
          <img className="croper" id="image" ref={refImage} src={src} />
        </div>
        <div className="pre-img">
          <img className="pre" ref={refImage} src={imgDestination} />
        </div>
      </div>
      <button onClick={handleSubmitForm} className="btn btn-primary btn_save " >
        Save change
      </button>
    </div>
  );
};

export default ImageCrop;
