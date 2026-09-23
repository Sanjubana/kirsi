import React, { useState } from 'react';
import './CropInfo.css';
import { useLocation } from 'react-router-dom';
import { BackButton, Input, Card } from '../../components/ui';

const cropData = [
  {
    id: 'wheat',
    name: 'Wheat',
    emoji: '🌾',
    season: 'Rabi (Nov–Apr)',
    soil: 'Loamy, Well-drained',
    sowing: 'November – December',
    harvest: 'March – April',
    water: 'Moderate (4–6 irrigations)',
    fertilizer: 'NPK 120:60:40 kg/ha',
    stages: ['Germination (7–10 days)', 'Tillering (30–45 days)', 'Jointing', 'Heading', 'Grain Filling', 'Maturity'],
    tips: 'Use certified seeds and treat with fungicide before sowing. Irrigate at crown root initiation stage.',
  },
  {
    id: 'rice',
    name: 'Rice',
    emoji: '🌱',
    season: 'Kharif (Jun–Nov)',
    soil: 'Clayey, Water-retentive',
    sowing: 'June – July',
    harvest: 'October – November',
    water: 'High (flooded conditions)',
    fertilizer: 'NPK 100:50:50 kg/ha',
    stages: ['Germination', 'Seedling', 'Transplanting', 'Tillering', 'Panicle Initiation', 'Maturity'],
    tips: 'Maintain 2–5 cm standing water during tillering. Apply urea in split doses for better yield.',
  },
  {
    id: 'cotton',
    name: 'Cotton',
    emoji: '☁️',
    season: 'Kharif (Apr–Dec)',
    soil: 'Black cotton, Deep alluvial',
    sowing: 'April – June',
    harvest: 'October – December',
    water: 'Low–Moderate (drip preferred)',
    fertilizer: 'NPK 180:90:60 kg/ha',
    stages: ['Germination', 'Squaring', 'Flowering', 'Boll Development', 'Boll Opening'],
    tips: 'Space plants 60×30 cm. Monitor for bollworm. Drip irrigation increases yield by 30%.',
  },
  {
    id: 'tomato',
    name: 'Tomato',
    emoji: '🍅',
    season: 'Year-round (Rabi preferred)',
    soil: 'Sandy Loam, Well-drained',
    sowing: 'October – November',
    harvest: '70–90 days after transplanting',
    water: 'Frequent, avoid waterlogging',
    fertilizer: 'NPK 120:60:60 kg/ha + Micro-nutrients',
    stages: ['Nursery (25–30 days)', 'Transplanting', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest'],
    tips: 'Stake plants to support heavy fruiting. Spray calcium spray to prevent blossom end rot.',
  },
  {
    id: 'mustard',
    name: 'Mustard',
    emoji: '🌼',
    season: 'Rabi (Oct–Mar)',
    soil: 'Sandy Loam to Loamy',
    sowing: 'October – November',
    harvest: 'February – March',
    water: 'Low (1–2 irrigations)',
    fertilizer: 'NPK 80:40:40 kg/ha + Sulphur 40 kg/ha',
    stages: ['Germination', 'Vegetative', 'Flower Bud Initiation', 'Flowering', 'Pod Formation', 'Maturity'],
    tips: 'Sow at 3–4 cm depth. Sulphur application significantly boosts oil content. Avoid waterlogging.',
  },
];

const CropInfo = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const getInitialCrop = () => {
    const passedCropId = location.state?.cropId;
    if (passedCropId) {
      const crop = cropData.find((c) => c.id === passedCropId);
      if (crop) return crop;
    }
    return cropData[0];
  };

  const [selectedCrop, setSelectedCrop] = useState(getInitialCrop);

  const filteredCrops = cropData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crop-info-page fade-in">
      <div className="crop-info-header">
        <BackButton label="Back to Crops" to="/crops" />
        <div className="crop-info-title-section">
          <h2>Crop Information Guide</h2>
          <p>Sowing seasons, soil types, fertilizer recommendations and growth stages</p>
        </div>
      </div>

      <div className="crop-info-search">
        <Input
          placeholder="Search by crop name (Wheat, Rice, Cotton…)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<span>🔍</span>}
        />
      </div>

      <div className="crop-info-layout">
        {/* Crop List Panel */}
        <div className="crop-list-panel">
          {filteredCrops.length === 0 ? (
            <div className="crop-empty-state">
              <span>🌿</span>
              <p>No crops matched your search.</p>
            </div>
          ) : (
            filteredCrops.map((crop) => (
              <div
                key={crop.id}
                className={`crop-list-item ${selectedCrop?.id === crop.id ? 'active' : ''}`}
                onClick={() => setSelectedCrop(crop)}
              >
                <span className="crop-list-emoji">{crop.emoji}</span>
                <div>
                  <p className="crop-list-name">{crop.name}</p>
                  <p className="crop-list-season">{crop.season}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Crop Detail Panel */}
        <div className="crop-detail-panel">
          {selectedCrop ? (
            <Card className="crop-detail-card">
              <Card.Header className="crop-detail-header">
                <div className="crop-detail-title">
                  <span className="crop-detail-emoji">{selectedCrop.emoji}</span>
                  <div>
                    <h3>{selectedCrop.name}</h3>
                    <p className="crop-detail-season-tag">{selectedCrop.season}</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Body className="crop-detail-body">
                <div className="crop-info-grid">
                  <div className="crop-info-item">
                    <span className="info-icon">🌱</span>
                    <div>
                      <p className="info-label">Sowing Period</p>
                      <p className="info-value">{selectedCrop.sowing}</p>
                    </div>
                  </div>
                  <div className="crop-info-item">
                    <span className="info-icon">🌾</span>
                    <div>
                      <p className="info-label">Harvest Period</p>
                      <p className="info-value">{selectedCrop.harvest}</p>
                    </div>
                  </div>
                  <div className="crop-info-item">
                    <span className="info-icon">🪨</span>
                    <div>
                      <p className="info-label">Soil Type</p>
                      <p className="info-value">{selectedCrop.soil}</p>
                    </div>
                  </div>
                  <div className="crop-info-item">
                    <span className="info-icon">💧</span>
                    <div>
                      <p className="info-label">Water Needs</p>
                      <p className="info-value">{selectedCrop.water}</p>
                    </div>
                  </div>
                  <div className="crop-info-item info-item-full">
                    <span className="info-icon">🧪</span>
                    <div>
                      <p className="info-label">Fertilizer Guide</p>
                      <p className="info-value">{selectedCrop.fertilizer}</p>
                    </div>
                  </div>
                </div>

                <div className="crop-stages-section">
                  <h4>Growth Stages</h4>
                  <div className="crop-stages-track">
                    {selectedCrop.stages.map((stage, i) => (
                      <div key={i} className="stage-step">
                        <div className="stage-dot">{i + 1}</div>
                        {i < selectedCrop.stages.length - 1 && <div className="stage-connector" />}
                        <p className="stage-label">{stage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="crop-tips-section">
                  <h4>💡 Expert Tips</h4>
                  <p>{selectedCrop.tips}</p>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div className="crop-detail-empty">
              <span>📚</span>
              <h3>Select a crop to view details</h3>
              <p>Click any crop from the list on the left to view full information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropInfo;
