import AuthContext from "../content/AuthContext";
import "../pages/Styles/profileedit.css";
import React, { useContext, useState, useEffect } from "react";
import Toast from "../plugins/Toast";
import { useNavigate } from "react-router-dom";


const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, authTokens, fetchProfileData } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    bio: "",
    subscribed: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username,
        full_name: user.full_name,
        bio: user.bio,
        image: user.image,
        subscribed: user.subscribed,
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const full_name = e.target.elements.full_name.value;
    const bio = e.target.elements.bio.value;
    const subscribed = e.target.elements.subscribed.value;



    try {
      const response = await fetch("http://127.0.0.1:8000/api/update-User/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          username,
          full_name,
          bio,
          subscribed,
        }),
      });
      console.log('r',response)
      if (response.status === 200) {
        Toast("success", "Profile updated successfully!");
        navigate('/')
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      Toast("error", "Failed to update profile");
      console.error('e',err)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-edit">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Profile Image</label>
        </div>
        <div className="form-group">
          <label htmlFor="subscribed">
            <input
              type="checkbox"
              id="subscribed"
              name="subscribed"
              checked={profile.subscribed}
              onChange={handleChange}
            />
            Subscribed to newsletter
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
