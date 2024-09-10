import React from "react";
import "./Styles/Profile.css";
import img from "./Images/user.png";
import img1 from "./Images/setting white.png";
import img2 from "./Images/github.png";
import img3 from "./Images/Google.png";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate=useNavigate()
  function close(){
    navigate('/home')
  }
  function edit(){
    navigate('/profileedit')
  }
  return (
    <div className="profile-container">
      <img src={img1} alt="Setting Logo" className="setting-logo" onClick={edit}/>
      <div className="profile-card">
        <div className="profile-left">
          <div className="avatar">
            <img
              src={img}
              alt="Avatar"
            />
          </div>
          <h3 className="profile-name">Full Name</h3>
          <p className="subscription-status">Subscribed</p>
          <button className="close-button" onClick={close}>Close</button>
        </div>
        <div className="divider"></div>
        <div className="profile-right">
          <h3 className="profile-title">
            Profile Details
          </h3>
          <div className="profile-details">
            <p>
              <span className="label">Name :</span> Full Name
            </p>
            <p>
              <span className="label">Age :</span> 35
            </p>
            <p>
              <span className="label">Mobile :</span> +91 xxxxx xxxxx
            </p>
            <p>
              <span className="label">Email :</span> fullname@gmail.com
            </p>
            <p>
              <span className="label">Address :</span> 123 main St, anytown,
              USA
            </p>
          </div>
          <div style={{display:'inline'}}>
          <img src={img2} alt="Github Logo" className="google-logo2"/>
          <img src={img3} alt="Google Logo" className="google-logo2"/>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
