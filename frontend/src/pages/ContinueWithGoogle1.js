import React from 'react';
import './Styles/google.css'; // Link to the CSS file
import img from './Images/Google.png'
import img1 from './Images/user.png'
import img2 from './Images/back.png'
import { useNavigate } from 'react-router-dom';

function ContinueWithGoogle1() {
  const navigate=useNavigate()
  function back(){
    navigate('/signin')
  }
  function submit(){
    console.log("Home")
    navigate('/home')
  }
 
  return (
    <div className='body-google'>
        <img src={img2} alt="Back Logo" className="Back-logo" onClick={back}/>
    <div className="signin-container">
    <div className="signin-box">
        <div className="google-signin-header">
          <img src={img} alt="Google Logo" className="google-logo"/>
          <span style={{color:'black'}}>Sign in with Google</span>
        </div>
        <hr className='hr-1'/>
     <div className="container-google">
      <div className="left-align">
        <div className="account-selection">
          <img src={img1} alt="User Avatar" className="user-avatar"/>
          <div className="account-info">
            <p className="account-text">Sign In to InterioVirt</p>
          </div>
        </div>
        <div className="use-another-account">
          <img
            src={img1}
            alt="Use another account"
            className="other-account-icon"
          />
          <div className="account-info">
            <p className="account-email">Name@gmail.com</p>
          </div>
        </div>
      </div>
    
      <div className="right-align">
        <p className='introvert-privacy'>
        By continuing, Google will share your Name, email, address, language
         preference, and profile picture with Introvert. See IntroVert's <a href="#15" style={{color:'purple'}}>Privacy Policy </a>
          and Terms of Service. 
        </p>
      <p className="introvert-privacy">
      You can manage Sign in with Google in Your  
       <a href='#12' style={{color:'blue'}}> Google Account </a>
        </p>
      </div>
    </div>
    </div>
     <div className="button-container">
      <button className="button cancel-button" onClick={back}>Cancel</button>
      <button className="button continue-button" onClick={submit}>Continue</button>
    </div>
    </div>
   
    </div>
  );
}

export default ContinueWithGoogle1;
