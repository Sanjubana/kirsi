import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [role, setRole] = useState("Farmer");
  const [showOTP, setShowOTP] = useState(false);

  return (
    <div className="signup-container">
      {/* LEFT SAME */}
      <div className="left-section">
        <div className="overlay">
          <div className="brand">🌱 FarmConnect</div>

          <h1>
            Join Our Farmer <br /> Community 👨‍🌾
          </h1>

          <p>
            Buy tools, get crop advice, and connect with experts
          </p>

          <ul className="features">
            <li>✔ Free crop advisory services</li>
            <li>✔ Connect with farming experts</li>
            <li>✔ Buy/rent tools at best prices</li>
            <li>✔ Real-time weather updates</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">
        <div className="form-box">

          {/* 🔥 CONDITIONAL RENDERING */}
          {!showOTP ? (
            <>
              <h2>Create Your Account</h2>
              <p className="sub-text">
                Join thousands of farmers in your community
              </p>

              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />

              <label>Mobile Number</label>
              <input type="text" placeholder="Enter mobile number" />

              <label>Village Name</label>
              <input type="text" placeholder="Enter village name" />

              <label>District</label>
              <select>
                <option>Select your district</option>
                <option>Jhalawar</option>
                <option>Kota</option>
              </select>

              <label>I am a</label>

              <div className="roles">
                {["Farmer", "Mechanic", "Shopkeeper", "Advisor"].map(
                  (item) => (
                    <div
                      key={item}
                      className={`role-card ${
                        role === item ? "active" : ""
                      }`}
                      onClick={() => setRole(item)}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              {/* 🔥 BUTTON */}
              <button
                className="otp-btn"
                onClick={() => setShowOTP(true)}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              {/* ✅ OTP SCREEN */}
              <h2>Verify Your Mobile Number</h2>
              <p className="sub-text">
                We've sent a 6-digit OTP to your mobile number
              </p>

              <label>Enter 6-Digit OTP</label>

              <div className="otp-box">
                {[...Array(6)].map((_, i) => (
                  <input key={i} maxLength="1" />
                ))}
              </div>

              <div className="otp-row">
                <span>Didn't receive OTP?</span>
                <span className="resend">Resend OTP</span>
              </div>

              <button className="otp-btn">
                Verify & Create Account
              </button>

              <p
                className="back"
                onClick={() => setShowOTP(false)}
              >
                ← Back to form
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;