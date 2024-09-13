import React, { useContext } from 'react';
import './Styles/sign.css';
import img1 from './Images/chire.png';
import img2 from './Images/Google.png';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../content/AuthContext';
import Toast from '../plugins/Toast';

function SignIn() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  function createone() {
    navigate('/signup');
  }

  function submit(e) {
    e.preventDefault();
    
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    // Check if email and password are defined and not empty
    if (email && email.length > 0 && password && password.length > 0) {
      loginUser(email, password);
      navigate('/home')
    } else {
      // Handle empty email or password (optional)
      Toast("error","Email or password is empty","top");
    }
    
    // console.log(email, password);
    
  }

  function google() {
    navigate('/continue-with-google-2');
  }

  return (
    <div className='body-sign'>
      <div className="login-container">
        <img src={img1} alt="Chair" className="chair-image-signin" />
        <h2 className='h2'>Sign In</h2>
        <form onSubmit={submit}>
          <input type="email" name='email' placeholder="Enter Email" className="input-field" />
          <input type="password" name='password' placeholder="Enter Password" className="input-field"/>
          <div className="create-account">
            <span>Don't Have an Account?</span>
            <a href="" onClick={createone}>Create One</a>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        <button className="google-btn" onClick={google}>
          <img src={img2} alt="Google icon" className="google-icon"/>
          <span className="google-text">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default SignIn;
