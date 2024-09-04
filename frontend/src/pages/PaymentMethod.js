import React, { useState } from "react";
import "./Styles/payment.css";
import img from './Images/Visa-Logo-PNG7.png';

function PaymentMethod() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    monthYear: "",
    cvv: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handlePay = () => {
    alert("Payment Submitted!");
    // Here you can handle the form submission logic
  };

  return (
    <div className="App-payment">
      <div className="container">
        <div className="card-info">
          <h2>Card Information</h2>
          <p>Indicate details of the card from which money will be debited</p>
          
          <div className="card">
            <img src={img} alt="Visa Card" className="card-logo" />
            <div className="cardnumber">
              <label className="pay-label">Card Number</label>
              <input 
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                placeholder="0000  0000  0000  0000"
                maxLength="16"
              />
            </div>
            <div className="card-details">
              <div className="card-details2">
                <label className="pay-label">Month and Year</label>
                <input
                  type="text"
                  name="monthYear"
                  value={cardDetails.monthYear}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div className="card-details2">
                <label className="pay-label">CVV Code</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="****"
                  maxLength="4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="personal-info">
          <h2>Personal information</h2>
          <div className="personal-form">
            <div className="inline-input">
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInputChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInputChange}
                placeholder="Last Name"
              />
            </div>
            <input
              type="text"
              name="country"
              value={personalInfo.country}
              onChange={handlePersonalInputChange}
              placeholder="Country"
            />
            <div className="inline-input">
              <input
                type="text"
                name="city"
                value={personalInfo.city}
                onChange={handlePersonalInputChange}
                placeholder="City"
              />
              <input
                type="text"
                name="zipCode"
                value={personalInfo.zipCode}
                onChange={handlePersonalInputChange}
                placeholder="Zip Code"
              />
            </div>
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInputChange}
              placeholder="E-mail"
            />
            <br></br>
            <input
              type="tel"
              name="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={handlePersonalInputChange}
              placeholder="Phone Number"
            />
          </div>
        </div>
      </div>
      <button className="pay-button" onClick={handlePay}>Pay</button>
    </div>
  );
}

export default PaymentMethod;
