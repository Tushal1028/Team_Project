import React from 'react';
import './Styles/sign.css'
import img1 from './Images/chire.png'
import img2 from './Images/Google.png'
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate=useNavigate()
  function createone(){
    navigate('/signin')
  }
  function submit(){
    navigate('/home')
  }
  function google(){
    navigate('/continue-with-google-2')
  }
  return (
    <div className='body-sign'>
      <div className="login-container">
        <img src={img1} alt="Chair" className="chair-image" />
        <h2 className='h2'>Sign Up</h2>
        <form>
          <input type="text" placeholder="Enter User Name" className="input-field" />
          <input type="password" placeholder="Enter Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />
          <div className="create-account">
            <span>I Have Account !</span>
            <a href="#1" onClick={createone}> Log In</a>
          </div>
          <button type="submit" className="submit-btn" onClick={submit}>Submit</button>
        </form>
        <button className="google-btn" onClick={google}>
        <img src={img2} alt="Google icon" className="google-icon"/>
        <span className="google-text">Continue with Google</span>
        </button>

      </div>
    </div>
  );
}

export default SignUp;
