import React, { useState } from 'react';
import { Button, Card, BackButton, Input, Loader } from '../../components/ui';
import './UIShowcase.css';

const UIShowcase = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
  });

  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors on type
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!formData.username) errors.username = 'Username is required.';
    if (!formData.email.includes('@')) errors.email = 'Please enter a valid email address.';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setIsLoadingDemo(true);
      setTimeout(() => {
        setIsLoadingDemo(false);
        alert('Form submitted successfully!');
      }, 2000);
    }
  };

  return (
    <div className="ui-showcase-container fade-in">
      <header className="ui-showcase-header">
        <BackButton label="Home" to="/" />
        <h1 className="ui-showcase-title">Design System & Foundation Components</h1>
        <p className="ui-showcase-subtitle">
          Phase 1 component assets, design tokens, and style guide for the Kirsi farming app.
        </p>
      </header>

      {/* --- DESIGN TOKENS --- */}
      <section className="ui-showcase-section">
        <h2 className="section-title">Design Tokens (Colors)</h2>
        <div className="color-grid">
          <div className="color-token-card" style={{ backgroundColor: 'var(--color-primary)' }}>
            <span className="token-label">Primary</span>
            <span className="token-value">#2D6A4F</span>
          </div>
          <div className="color-token-card" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <span className="token-label">Secondary</span>
            <span className="token-value">#52B788</span>
          </div>
          <div className="color-token-card" style={{ backgroundColor: 'var(--color-accent)' }}>
            <span className="token-label">Accent (Amber)</span>
            <span className="token-value">#D97706</span>
          </div>
          <div className="color-token-card" style={{ backgroundColor: 'var(--color-bg-main)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }}>
            <span className="token-label" style={{ color: 'var(--color-text-main)' }}>BG Main</span>
            <span className="token-value" style={{ color: 'var(--color-text-muted)' }}>#F8FAF7</span>
          </div>
          <div className="color-token-card" style={{ backgroundColor: 'var(--color-text-main)' }}>
            <span className="token-label" style={{ color: '#ffffff' }}>Text Main</span>
            <span className="token-value" style={{ color: '#e0e5db' }}>#1B261C</span>
          </div>
          <div className="color-token-card" style={{ backgroundColor: 'var(--color-danger)' }}>
            <span className="token-label">Danger</span>
            <span className="token-value">#EF4444</span>
          </div>
        </div>
      </section>

      {/* --- BUTTONS --- */}
      <section className="ui-showcase-section">
        <h2 className="section-title">Buttons</h2>
        <Card>
          <Card.Body className="showcase-card-body">
            <div className="component-row">
              <h4>Variants</h4>
              <div className="flex-wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="text">Text Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </div>

            <div className="component-row">
              <h4>Sizes</h4>
              <div className="flex-wrap align-center">
                <Button variant="primary" size="sm">Small (sm)</Button>
                <Button variant="primary" size="md">Medium (md)</Button>
                <Button variant="primary" size="lg">Large (lg)</Button>
              </div>
            </div>

            <div className="component-row">
              <h4>States & Icons</h4>
              <div className="flex-wrap">
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="primary" isDisabled>Disabled</Button>
                <Button variant="outline" leftIcon={<span>🌱</span>}>Left Icon</Button>
                <Button variant="secondary" rightIcon={<span>🚜</span>}>Right Icon</Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </section>

      {/* --- CARDS --- */}
      <section className="ui-showcase-section">
        <h2 className="section-title">Cards</h2>
        <div className="card-grid">
          <Card>
            <Card.Header>
              <h3>Standard Card</h3>
              <span>Tag</span>
            </Card.Header>
            <Card.Body>
              <p>This is a standard card component. It features subtle padding, rounded corners, and a light shadow following our design tokens.</p>
            </Card.Body>
            <Card.Footer>
              <Button variant="text" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Apply</Button>
            </Card.Footer>
          </Card>

          <Card hoverLift>
            <Card.Header>
              <h3>Card with Hover Lift</h3>
              <span>⭐ Featured</span>
            </Card.Header>
            <Card.Body>
              <p>This card has the <strong>hoverLift</strong> prop enabled. Try hovering over it to see it translate upwards and increase its depth shadow with smooth transitions.</p>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" size="sm">Explore</Button>
            </Card.Footer>
          </Card>
        </div>
      </section>

      {/* --- BACK BUTTON --- */}
      <section className="ui-showcase-section">
        <h2 className="section-title">Back Button</h2>
        <Card>
          <Card.Body>
            <p className="margin-bottom-sm">This specialized back button triggers router navigation and features a hover animation where the arrow slides slightly to the left.</p>
            <div className="flex-wrap align-center">
              <BackButton label="Go Back to Home" to="/" />
              <BackButton label="Back (Default Action)" />
            </div>
          </Card.Body>
        </Card>
      </section>

      {/* --- INPUTS --- */}
      <section className="ui-showcase-section">
        <h2 className="section-title">Inputs & Form Elements</h2>
        <div className="grid-2-col">
          <Card>
            <Card.Header>
              <h3>Input Variations</h3>
            </Card.Header>
            <Card.Body className="flex-col gap-md">
              <Input 
                label="Standard Input" 
                placeholder="Enter some text..." 
              />
              <Input 
                label="With Helper Text" 
                placeholder="Enter username" 
                helperText="Username must be unique." 
              />
              <Input 
                label="With Error State" 
                placeholder="Email address" 
                error="Invalid email format"
                defaultValue="invalid-email" 
              />
              <Input 
                label="Disabled Input" 
                placeholder="Cannot edit this" 
                disabled 
                defaultValue="Locked value"
              />
              <Input 
                label="With Left Icon" 
                placeholder="Search tools..." 
                leftIcon={<span>🔍</span>} 
              />
              <Input 
                label="With Right Icon" 
                placeholder="Enter price" 
                rightIcon={<span>INR</span>} 
              />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h3>Interactive Form Demo</h3>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleFormSubmit} className="flex-col gap-md">
                <Input
                  label="Username *"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  error={formErrors.username}
                  placeholder="johndoe"
                  leftIcon={<span>👤</span>}
                />
                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  placeholder="john@example.com"
                  leftIcon={<span>📧</span>}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  leftIcon={<span>🔒</span>}
                  helperText="Keep your credentials secure."
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  isLoading={isLoadingDemo}
                  className="margin-top-sm"
                >
                  Register Profile
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* --- LOADERS --- */}
      <section className="ui-showcase-section">
        <h2 className="section-title">Loaders</h2>
        <div className="grid-2-col">
          <Card>
            <Card.Header>
              <h3>Spinner Loaders</h3>
            </Card.Header>
            <Card.Body className="flex-col gap-md">
              <div className="component-row">
                <h4>Sizes</h4>
                <div className="flex-wrap align-center">
                  <Loader variant="spinner" size="sm" />
                  <Loader variant="spinner" size="md" />
                  <Loader variant="spinner" size="lg" />
                  <Loader variant="spinner" size="xl" />
                </div>
              </div>
              <div className="component-row">
                <h4>Colors</h4>
                <div className="flex-wrap">
                  <Loader variant="spinner" size="md" color="primary" />
                  <Loader variant="spinner" size="md" color="secondary" />
                  <Loader variant="spinner" size="md" color="accent" />
                  <div style={{ backgroundColor: 'var(--color-primary)', padding: '4px 8px', borderRadius: '4px' }}>
                    <Loader variant="spinner" size="sm" color="light" />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h3>Skeleton Placeholder Loaders</h3>
            </Card.Header>
            <Card.Body className="flex-col gap-md">
              <p className="margin-bottom-2xs">Skeletons simulate content loading to improve perceived app speed.</p>
              
              <div className="flex-col gap-sm">
                {/* Circle + Text skeleton (e.g. Profile loading) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Loader variant="skeleton" shape="circle" width="48px" height="48px" />
                  <div style={{ flexGrow: 1 }}>
                    <Loader variant="skeleton" shape="text" width="60%" height="16px" />
                    <Loader variant="skeleton" shape="text" width="40%" height="12px" />
                  </div>
                </div>

                {/* Box skeleton (e.g. Image loading) */}
                <Loader variant="skeleton" shape="rect" height="100px" />
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default UIShowcase;
