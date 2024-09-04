import React from 'react';
import './Styles/google.css'; // Link to the CSS file
import img from './Images/Google.png'
import img1 from './Images/user.png'
import img2 from './Images/back.png'
import img3 from './Images/template.png'
import { useNavigate } from 'react-router-dom';
function ContinueWithGoogle2() {
  const navigate=useNavigate()
  function back(){
    navigate('/signin')
  }
  function google(){
    navigate('/continue-with-google-1')
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
        <hr className='hr-2'/>
     <div className="container-google">
      <div className="left-align">
        <div className="account-selection">
          <img src={img1} alt="User Avatar" className="user-avatar"/>
          <div className="account-info">
            <p className="account-text">Choose an account</p>
            <p style={{color:'black'}}> to continue to <a href='#13' style={{color:'purple',textDecoration:'none'}}> InterioVirt </a></p>
          </div>
        </div>
      </div>
    
      <div className="right-align">
      <div className="use-another-account" onClick={google}>
          <img src={img1} alt="Use another account" className="other-account-icon"/>
          <div className="account-info">
          <p className="account-name">Name LastName</p>
            <p className="account-email">Name@gmail.com</p>
          </div>
        </div>
        <hr className='hr-3'/>
        <div className="use-another-account">
          <img src={img3} alt="Use another account" className="other-account-icon"/>
          <div className="account-info">
            <p className="another-text">Use another account</p>
          </div>
        </div>
        <hr className='hr-3'/>
      <p className="introvert-privacy">
          Before using this app, you can review InterioVirt's <a href="#14" style={{color:'purple'}}> 
            Privacy Policy </a> and terms of service.
        </p>
      </div>
    </div>
    </div>
    
    </div>
   
    </div>
  );
}

export default ContinueWithGoogle2;
