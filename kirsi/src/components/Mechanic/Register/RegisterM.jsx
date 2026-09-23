import React, { useState } from "react";
import { FaScrewdriverWrench, FaUser, FaPhone, FaTractor, FaClock, FaLocationDot, FaCircleCheck, FaUserPlus } from "react-icons/fa6";
import { BackButton } from "../../ui";
import "./RegisterM.css";

export default function RegisterM() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialty: "",
    experience: "",
    location: "",
    availability: "Available",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mechanic Registered:", formData);
    alert("Mechanic Registered Successfully!");
  };

  return (
    <div className="register-container fade-in">
      <div className="register-card">
        <BackButton label="Back to Mechanics" to="/mechanic" className="register-back-btn" />
        <h2>
          <FaScrewdriverWrench />
          Register as Mechanic
        </h2>
        <p>Join our platform and connect with nearby farmers</p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>
              <FaPhone /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Specialty */}
          <div className="form-group">
            <label>
              <FaTractor /> Specialty
            </label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialty</option>
              <option value="Tractor & Heavy Equipment">
                Tractor & Heavy Equipment
              </option>
              <option value="Water Pump Specialist">
                Water Pump Specialist
              </option>
              <option value="All Farm Equipment">
                All Farm Equipment
              </option>
            </select>
          </div>

          {/* Experience */}
          <div className="form-group">
            <label>
              <FaClock /> Experience (Years)
            </label>
            <input
              type="number"
              name="experience"
              placeholder="Enter years of experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label>
              <FaLocationDot /> Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter your area"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Availability */}
          <div className="form-group">
            <label>
              <FaCircleCheck /> Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
            >
              <option value="Available">Available Now</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            <FaUserPlus />
            Register Mechanic
          </button>
        </form>
      </div>
    </div>
  );
}
