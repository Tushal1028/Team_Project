import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Profileedit from './pages/Profileedit';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ContinueWithGoogle1 from './pages/ContinueWithGoogle1';
import ContinueWithGoogle2 from './pages/ContinueWithGoogle2';
import PageNotFound from './pages/PageNotFound';
import Edit from './pages/Edit';
import Home from './pages/Home'
import PaymentMethod from './pages/PaymentMethod';
import SubscribeInfo from './pages/SubscribeInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileedit" element={<Profileedit />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/continue-with-google-1" element={<ContinueWithGoogle1 />} />
        <Route path="/continue-with-google-2" element={<ContinueWithGoogle2 />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment-method" element={<PaymentMethod />} />
        <Route path="/subscribe-info" element={<SubscribeInfo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
