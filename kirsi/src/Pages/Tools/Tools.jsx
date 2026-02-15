import './Tools.css'
import { useNavigate } from 'react-router-dom'
import Selltools from '../../components/Selltools/Selltools'

const Tools = () => {
  const navigate = useNavigate()

  return (
    <div className="tools-page">
      <div className="tools-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>←</span>
        <div>
          <h2>Tools & Equipment</h2>
          <p>Choose a service below</p>
        </div>
      </div>

      <div className="tools-grid">
        <div className="tool-card" onClick={() => navigate('/buy-tools')}>
          <div className="icon buy">🛒</div>
          <h3>Buy Tools</h3>
          <p>Buy tools from nearby farmers</p>
        </div>

        <div className="tool-card" onClick={() => navigate('/Selltools')}>
          <div className="icon sell">⬆️</div>
          <h3>Sell Tools</h3>
          <p>Sell your old or unused tools</p>
        </div>

        <div className="tool-card" onClick={() => navigate('/rent-tools')}>
          <div className="icon rent">📅</div>
          <h3>Rent Tools</h3>
          <p>Rent tools for short-term use</p>
        </div>

        <div className="tool-card" onClick={() => navigate('/Mechanic')}>
          <div className="icon mechanic">🔧</div>
          <h3>Mechanic Services</h3>
          <p>Find nearby mechanics</p>
        </div>
      </div>
    </div>
  )
}

export default Tools
