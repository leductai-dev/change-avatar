import React, { useEffect, useState } from "react";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import  * as Essentials from '@ckeditor/ckeditor5-essentials';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
console.log(ClassicEditor.builtinPlugins.map((plugin) => plugin.pluginName));
const Contacts = () => {
  const [state, setState] = useState({
    username: "",
    email: "",
    phone: "",
    content: "",
  });

  const [photo, setPhoto] = useState([]);

  const handleStateChanges = (event) => {
    const target = event.target;

    const { name, value } = target;

    setState((val) => ({ ...val, [name]: value }));
  };

  const ckeditorstate = (event, editor) => {
    const data = editor.getData();
    setState((val) => ({ ...val, content: data }));
    console.log("STATE", { data });
  };

  const handleChangeFile = (e) => {
    console.log(e.target.files[0]);
    setPhoto((photo) => [...photo, e.target.files[0]]);
  };

  const uploadPhoto = async (data) => {
    try {
      const res = await axios.post("http://192.168.100.24:2001/uploads", data);

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let pt of photo) {
      data.append("photo", pt);
    }

    uploadPhoto(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  console.log("STATE _", state);
  return (
    <div className="container">
      <div className="wrapper">
        <h1>Contacts Form</h1>

        <form onSubmit={handleSubmitForm}>
          <div className="form-group">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={state.usermame}
                onChange={handleStateChanges}
                placeholder=" Enter Username"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={state.email}
                onChange={handleStateChanges}
                placeholder=" Enter Email"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={state.phone}
                onChange={handleStateChanges}
                name="phone"
                placeholder=" Enter Phone"
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                onChange={handleChangeFile}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Text Content</label>
              <CKEditor
                editor={ClassicEditor}
                onInit={(editor) => {
                  //// Here the editor is ready to be used
                }}
                onChange={ckeditorstate}
                config={{
                  // plugins: [ Essentials ],
                  ckfinder: {
                    // The URL that the images are uploaded to.
                    uploadUrl: "http://192.168.100.24:2001/uploads",

                    // Enable the XMLHttpRequest.withCredentials property.
                    withCredentials: true,

                    // Headers sent along with the XMLHttpRequest to the upload server.
                    headers: {
                      "X-CSRF-TOKEN": "CSFR-Token",
                      Authorization: "Bearer <JSON Web Token>",
                    },
                  },
                }}
              />

              {/* <textarea type="text"  cols="30" rows="15" value={state.content}   onChange={handleStateChanges} className="form-control" name="content" placeholder=" Enter Phone" /> */}
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              name="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
