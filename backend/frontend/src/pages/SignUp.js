import React, { useContext } from 'react';
import './Styles/sign.css';
import img1 from './Images/chire.png';
import img2 from './Images/Google.png';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../content/AuthContext';
import Toast from '../plugins/Toast';

function SignUp() {
  const navigate = useNavigate();
  
  function createone() {
    navigate('/signin');
  }
  
  const { registerUser } = useContext(AuthContext);
  function submit(e) {
    e.preventDefault();
    
    const username = e.target.elements.uname.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const password2 = e.target.elements.password2.value;

    // console.log(email, username, password, password2);

    // Check if email, password and username are defined and not empty
    if (username && username.length > 0 && email && email.length > 0 && password && password2 && password.length > 0) {
      registerUser(email, username, password, password2);
    } else {
      Toast("error","Username, email, or password is empty","top");
    }
  }

  function google() {
    navigate('/continue-with-google-2');
  }

  return (
    <div className='body-sign'>
      <div className="login-container">
        <img src={img1} alt="Chair" className="chair-image" />
        <h2 className='h2'>Sign Up</h2>
        <form onSubmit={submit}>
          <input type="text" name="uname" placeholder="Enter User Name" className="input-field"   />
          <input type="email" name="email" placeholder="Enter Email" className="input-field"   />
          <input type="password" name="password" placeholder="Enter Password" className="input-field"   />
          <input type="password" name="password2" placeholder="Confirm Password" className="input-field"   />
          <div className="create-account">
            <span>I Have Account!</span>
            <a href="" onClick={createone}> Log In</a>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <button className="google-btn" onClick={google}>
          <img src={img2} alt="Google icon" className="google-icon" />
          <span className="google-text">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
