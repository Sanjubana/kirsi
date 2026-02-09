import React from 'react'
import './Section.css'


function Section() {
  return (
    <div className ='section'>
        <div className='section-heading'>

        <h1>Our Services</h1>
        </div>
        <div className='section-content'>
            <h4> Everything you need to grow and succeed</h4>
      </div>
      <div className='section-container'>
        <div className='card'>
            <div className='icon'>🚜</div>
            <h2>Tools & Equipment</h2>
            <p> Buy, sell,rent farming and find mechanics</p>
            <button>Explore Tool </button>
            <span className='info'>Services available near you <br /> within 30 km </span>
        </div>
         <div className='card'>
            <div className='icon'>🌾</div>
            <h2>Crop Advisory</h2>
            <p> Crop information, pesticide guidance,disease help from experts</p>
            <button>View Crops </button>
            <span className='info'>Services available near you <br /> within 50 km </span>
        </div>
         <div className='card'>
            <div className='icon'>☀️</div>
            <h2>Animal Care</h2>
            <p> Animal health, vet support,care guidance & buy &sell animals</p>
            <button>Animal Services </button>
            <span className='info'>Services available near you <br /> within 30 km </span>
        </div>

      </div>
    </div>
  )
}

export default Section
