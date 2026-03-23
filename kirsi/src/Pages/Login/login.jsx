import React, { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [mode, setMode] = useState("otp"); // otp | password
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="container">

      {/* LEFT */}
      <div className="left">
        <div className="logo">
          <div className="logo-box">🌱</div>
          <h2>FarmConnect</h2>
        </div>

        <h1>Welcome Back 👨‍🌾</h1>
        <p>Empowering farmers with smart digital tools</p>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="card">
          <h2>Login to Your Account</h2>
          <p>Enter your details to continue</p>

          <input type="text" placeholder="Enter mobile number or email" />

          {/* Toggle (NO DARK ACTIVE) */}
          <div className="toggle-btns">
            <button onClick={() => {
              setMode("otp");
              setOtpSent(false);
            }}>
              Login with OTP
            </button>

            <button onClick={() => {
              setMode("password");
              setOtpSent(false);
            }}>
              Login with Password
            </button>
          </div>

          {/* OTP MODE */}
          {mode === "otp" && (
            <>
              {!otpSent ? (
                <button
                  className="primary-btn"
                  onClick={() => setOtpSent(true)}
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <div className="otp-box">
                    {[...Array(6)].map((_, i) => (
                      <input key={i} maxLength="1" />
                    ))}
                  </div>

                  <button className="primary-btn">
                    Verify & Login
                  </button>
                </>
              )}
            </>
          )}

          {/* PASSWORD MODE */}
          {mode === "password" && (
            <>
              <input type="password" placeholder="Enter password" />
              <p className="forgot">Forgot Password?</p>
              <button className="primary-btn">Login</button>
            </>
          )}

          <div className="divider">OR</div>

          <p className="signup">
            New user? <span onClick={() => (window.location.href = "/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
}