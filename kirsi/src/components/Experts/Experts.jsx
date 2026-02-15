import "./Experts.css";

const advisors = [
  {
    id: 1,
    name: "Rahul Patil",
    specialty: "Crop Disease Expert",
    experience: "12 years",
    distance: "6 km away",
    location: "Shirur",
    available: true,
  },
  {
    id: 2,
    name: "Amit Deshmukh",
    specialty: "Soil & Fertilizer Advisor",
    experience: "9 years",
    distance: "10 km away",
    location: "Kharadi",
    available: true,
  },
  {
    id: 3,
    name: "Sanjay Kulkarni",
    specialty: "Afim farming expert",
    experience: "15 years",
    distance: "4 km away",
    location: "Hadapsar",
    available: false,
  },
];

export default function CropAdvisor() {
  return (
    <div className="advisor-page">
      {/* HEADER */}
      <div className="advisor-header">
        <h1>Crop Advisors</h1>
        <p>Find trusted crop advisors near you</p>
      </div>

      {/* LOCATION BAR */}
      <div className="advisor-location">
        <span>📍 Showing results near <b>Pune</b> within 50 km</span>
        <button className="change-location">Change location</button>
      </div>

      {/* SECTION TITLE */}
      <div className="advisor-title">
        <h2>Advisor Services</h2>
        <p>Expert guidance for better crop yield</p>
      </div>

      {/* ADVISOR CARDS */}
      <div className="advisor-grid">
        {advisors.map((advisor) => (
          <div className="advisor-card" key={advisor.id}>
            <div className="advisor-avatar">
              {advisor.name.charAt(0)}
            </div>

            {advisor.available && (
              <span className="advisor-status available">
                Available Now
              </span>
            )}

            <h3>{advisor.name}</h3>
            <p className="advisor-specialty">🌱 {advisor.specialty}</p>
            <p>Experience: {advisor.experience}</p>
            <p className="advisor-location-text">
              📍 {advisor.distance} • {advisor.location}
            </p>

            <button className="advisor-btn">
              📞 Call Advisor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
