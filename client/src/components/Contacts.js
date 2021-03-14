import React, { useEffect, useState } from "react";
import ModelChangeImage from './ModelChangeImage';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
const Contacts = () => {
  const [show, setShow] = useState(false);
  const [avatar,setAvatar] = useState('');
  const [photo, setPhoto] = useState([]);

  useEffect(()=>{
    console.log("componentdidmount")
    const data = {userId:'123456'}
     axios
        .post("http://localhost:2001/get-user-info",data)
        .then((res) => setAvatar(res.data.user.avatar))
        .catch((err) =>console.log(err));
  },[])


  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setPhoto((photo) => [...photo, e.target.files[0]]);
  };

  const uploadPhoto = async (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:2001/upload-image", data)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };


  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("form submit");
    const data = new FormData();

    for (let pt of photo) {
      data.append("photo", pt);
    }

    uploadPhoto(data)
      .then((res) => console.log(res.result))
      .catch((err) => console.log(err));
  };
  const _handleSetAvatar=(url)=>{
    setAvatar(url)
  }
  const showEdit = ()=>{
    if(show){
      return (
        <ModelChangeImage _handleSetAvatar={_handleSetAvatar} _handleShowEdit={_handleShowEdit} avatar={avatar}/>
      )
    }
    return null
  }
  const _handleShowEdit=(state)=>{
    setShow(state)
  }


  return (
    <div>
      <div className="container">
      <div className="wrapper">

        <form onSubmit={handleSubmitForm}>
            <div className="form-group">
            <img src={avatar} alt="" />
              </div>
           
          <div className="form-group">
            <input
              type="button"
              className="btn btn-primary"
              name="submit"
              value="Change"
              onClick ={()=>{setShow(true)}}
            />
          </div>
        </form>
      </div>
    </div>
    {showEdit()}
    </div>
  );
};

export default Contacts;
