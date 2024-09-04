import React, { useState } from "react";
import './Styles/profileedit.css'
import { useNavigate } from "react-router-dom";
function Profileedit() {
  const navigate=useNavigate()
  function close(){
    navigate('/profile')
  }
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [timezone, setTimezone] = useState("Kolkata");
    const [language, setLanguage] = useState("English");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
  
    const handleSave = () => {
      // Handle save functionality
    };
  
    const handleChangePassword = () => {
      // Handle change password functionality
    };
  
    const handleDeleteAccount = () => {
      // Handle delete account functionality
    };
  
    return (
      <div className="account-container">
        <p style={{marginLeft:'20px',fontSize:'25px',marginBottom:'14px'
            ,marginTop:'3px'}}>Account</p>
        <div className="form-row">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your EMail"
          />
        </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>TimeZone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="Kolkata"
            />
          </div>
          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="English"
            />
          </div>
        </div>
        <button onClick={handleSave} className="save-button">
          SAVE
        </button>
        <hr style={{marginLeft:'30px',marginRight:'30px'}}/>
        <h4 style={{marginLeft:'20px'}}>Password</h4>
        <div className="form-row1">
        <div className="form-group1">
          <label>Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        
          <div className="form-group1">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group1">
            <label>ReType password</label>
            <input
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
        </div>

        <button onClick={handleChangePassword} className="change-password-button">
          Change Password
        </button>
        <h5 style={{marginLeft:'20px',marginTop:'5px'}}>Delete Account</h5>
        <div className="delete-warning">
          <p>
            If you delete your account, your personal information will be wiped
            from IntroVert's servers, all of your course activity will be
            anonymized and any certificates earned will be deleted. 
            This action
            cannot be undone! Cancel any active subscriptions before you delete
            your account.
          </p>
        </div>
        <button onClick={handleDeleteAccount} className="delete-account-button">
          Delete Account
        </button>
        <button onClick={close} className="close-button">
          Close
        </button>
      </div>
    );
}

export default Profileedit;
