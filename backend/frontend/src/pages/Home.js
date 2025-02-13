import React, { useContext, useEffect } from "react";
import './Styles/Home.css';
import img1 from './Images/O1.png';
import img2 from './Images/O2.png';
import img3 from './Images/template.png';
import img5 from './Images/n1.png'
import img6 from './Images/th.jpeg'
import { useNavigate } from "react-router-dom";
import AuthContext from "../content/AuthContext";
import Toast from "../plugins/Toast";

function Home() {
    const navigate=useNavigate()

    const {logoutUser, user} = useContext(AuthContext)
    function subscribe(){
        navigate('/subscribe-info')
      }
      function logout(){
        logoutUser()
        Toast("success","You have been logged out...")
        navigate('/')
      }
      function edit(){
        navigate('/edit')
      }
      function profile(){
        navigate('/profile')
      }
  return (
    <div className="app">
      <header className="header">
        <div className="profile" onClick={profile}>
          <img src={user.image} alt="Profile" className="profile-image" />
          <h3 style={{display:'inline',marginLeft:'10px'}}>{ user.username }</h3>
        </div>
        <div className="header-buttons">
          {user.subscribed ? (<></>) : (<button className="subscribe-button" onClick={subscribe}>Subscribe</button>)}
          <button className="logout-button" onClick={logout}>Log out</button>
        </div>
      </header>
      <hr></hr>
      <div className="content-wrapper">
        {/* {JSON.stringify(user)} */}
        <aside className="sidebar">
          <div className="projects">
          <h2 style={{backgroundColor:'white',color:'black'}}>Project Names
                <img src={img5} height={'30px'} width={'30px'} style={{float:'right'}}></img>
            </h2>
            <ul>
              <li>Project 1</li>
              <li>Project 1</li>
              <li>Project 1</li>
              <li>Project 1</li>
              <li>Project 1</li>
            </ul>
            <br></br>
            <br></br>
            <br></br>
            <h2 style={{backgroundColor:'white',color:'black'}}>Team Projects
                <img src={img5} height={'30px'} width={'30px'} style={{float:'right'}}></img>
            </h2>
            <ul>
              <li>Project 1</li>
              <li>Project 1</li>
              <li>Project 1</li>
              <li>Project 1</li>
              <li>Project 1</li>
            </ul>
          </div>
        </aside>
        
        <main className="main-content">
          <div className="buttons">
            <button className="new-design" onClick={edit}>
              <img src={img1} style={{ height: '50px', width: '50px' }} alt="New Design" />
              New Design File
            </button>
            <button className="team-design" onClick={edit}>
              <img src={img2} style={{ height: '50px', width: '50px' }} alt="Team Design" />
              Team Design
            </button>
            <button className="template" onClick={edit}>
              <img src={img3} style={{ height: '50px', width: '50px' }} alt="Template" />
              Template
            </button>
          </div>
          
          <div className="projects-grid">
            <div className="project">
              <img src={img6} alt="Project Thumbnail" />
              <p>Project Name 1</p>
              <p>12/02/2024 06:30 PM</p>
            </div>
            <div className="project">
              <img src={img6} alt="Project Thumbnail" />
              <p>Project Name 1</p>
              <p>12/02/2024 06:30 PM</p>
            </div>
            <div className="project">
              <img src={img6} alt="Project Thumbnail" />
              <p>Project Name 1</p>
              <p>12/02/2024 06:30 PM</p>
            </div>
            <div className="project">
              <img src={img6} alt="Project Thumbnail" />
              <p>Project Name 1</p>
              <p>12/02/2024 06:30 PM</p>
            </div>
            <div className="project">
              <img src={img6} alt="Project Thumbnail" />
              <p>Project Name 1</p>
              <p>12/02/2024 06:30 PM</p>
            </div>
            <div className="project">
              <img src={img6} alt="Project Thumbnail" />
              <p>Project Name 1</p>
              <p>12/02/2024 06:30 PM</p>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}

export default Home;
