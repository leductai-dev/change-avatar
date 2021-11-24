import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import ImageCrop from "./ImageCrop";
import $ from "jquery";
const ModelChangeImage = (props) => {
  ModelChangeImage.propTypes = {
    src: PropTypes.string,
  };
  const {avatar} = props
  const [imgSrc, setImgSrc] = useState("");
  const [photo, setPhoto] = useState([]);
  const Container = styled.div`
    width: 400px;
    height: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 1px solid yellowgreen;
    padding: 15px;
    border-radius: 10px;
    box-shadow: #cccccc -2px 4px 2px -1px;
  `;


  const handleChangeFile = (e) => {
    var file = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var imageSrc = event.target.result;
      setImgSrc(imageSrc);
      setPhoto((photo) => [...photo, e.target.files[0]]);
    };
    fileReader.readAsDataURL(file);
  };
 
  const uploadPhoto = async (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:2001/upload-image", data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };
  const img = imgSrc? imgSrc : avatar
  return (
    <Container>
      <input
        name="photo"
        type="file"
        onChange={handleChangeFile}
        className="form-control mb-5"
      />
      <ImageCrop _handleSetAvatar={props._handleSetAvatar}_handleShowEdit={props._handleShowEdit} file={photo} src={img} />
    </Container>
  );
};

export default ModelChangeImage;
