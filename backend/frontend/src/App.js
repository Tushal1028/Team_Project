import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Profileedit from './pages/Profileedit';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ContinueWithGoogle1 from './pages/ContinueWithGoogle1';
import ContinueWithGoogle2 from './pages/ContinueWithGoogle2';
import PageNotFound from './pages/PageNotFound';
import Edit from './pages/Edit';
import Home from './pages/Home';
import PaymentMethod from './pages/PaymentMethod';
import SubscribeInfo from './pages/SubscribeInfo';
import AuthContext from './content/AuthContext';

function App() {
  const { user } = useContext(AuthContext);  // Access the user from AuthContext
  // console.log('app')
  // console.log(user)
  return (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/home" />} />
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" />} />
          <Route path="/continue-with-google-1" element={<ContinueWithGoogle1 />} />
          <Route path="/continue-with-google-2" element={<ContinueWithGoogle2 />} />
          
          {/* Private Routes (only for logged-in users) */}
          <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/profileedit" element={user ? <Profileedit /> : <Navigate to="/signin" />} />
          <Route path="/edit" element={user ? <Edit /> : <Navigate to="/signin" />} />
          <Route path="/payment-method" element={user ? <PaymentMethod /> : <Navigate to="/signin" />} />
          <Route path="/subscribe-info" element={user ? <SubscribeInfo /> : <Navigate to="/signin" />} />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
  );
}

export default App;
