import React, { useContext, useEffect } from "react";
import "./Styles/Profile.css";
// import img from "./Images/user.png";
import img1 from "./Images/setting white.png";
import img2 from "./Images/github.png";
import img3 from "./Images/Google.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../content/AuthContext";
import { jwtDecode } from "jwt-decode";
import MyAxios from "../utils/MyAxios";

function Profile() {
  const navigate=useNavigate()
  const { user} = useContext(AuthContext);  // Access the user from AuthContext

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
              src={user.image}
              alt="Avatar"
            />
          </div>
          <h3 className="profile-name">{user.username}</h3>
          <p className="subscription-status">{user.subscribed ? 'Subscribed' : 'Not Subscribed'}</p>
          <button className="close-button" onClick={close}>Close</button>
        </div>
        <div className="divider"></div>
        <div className="profile-right">
          {/* {JSON.stringify(user)} */}
          <h3 className="profile-title">
            Profile Details
          </h3>
          <div className="profile-details">
            <p>
              <span className="label">Name :</span>{user.full_name}
            </p>
            <p>
              <span className="label">Email :</span> {user.email}
            </p>
            <p>
              <span className="label">Bio :</span> {user.bio}
            </p>
          </div>
          <div style={{display:'inline'}}>
            {/* <div onClick={()=>{window.location.href='https://github.com/Tusha '}}> */}
          {/* <img src={img2} alt="Github Logo" className="google-logo2"/> */}
            </div>
          {/* <img src={img3} alt="Google Logo" className="google-logo2"/> */}
          </div>
          
        {/* </div> */}
      </div>
    </div>
  );
}

export default Profile;
