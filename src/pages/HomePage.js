import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../hero_deepfake.png';

const stats = [
  { value: '91%', label: 'Test Accuracy' },
  { value: '3', label: 'SRM Filters' },
  { value: '299px', label: 'Input Resolution' },
  { value: 'FF++', label: 'Dataset' },
];

const features = [
  {
    icon: '🧠',
    title: 'XceptionNet Architecture',
    desc: 'Deep separable convolutions with transfer learning from ImageNet weights for superior feature extraction.',
  },
  {
    icon: '🔬',
    title: 'SRM Filter Preprocessing',
    desc: 'Spatial Rich Model filters expose invisible pixel-level noise patterns unique to AI-generated faces.',
  },
  {
    icon: '⚡',
    title: 'Real-Time Detection',
    desc: 'Inference in seconds — optimized for practical, deployment-ready deepfake forensics.',
  },
  {
    icon: '📊',
    title: 'Probabilistic Output',
    desc: 'Returns real & fake confidence scores with model certainty levels for every prediction.',
  },
  {
    icon: '🎯',
    title: 'Class-Balanced Training',
    desc: 'Weighted categorical cross-entropy handles class imbalance, improving minority class recall.',
  },
  {
    icon: '🛡️',
    title: 'Outperforms Baselines',
    desc: 'Beats VGG16, ResNet50 & EfficientNet-B0 on the FaceForensics++ benchmark dataset.',
  },
];

const HomePage = () => {
  return (
    <div className="page-wrapper">
      <div className="bg-dots" />

      {/* ── HERO ── */}
      <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: '5rem 0 4rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left */}
            <div style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
              <div className="badge" style={{ marginBottom: '1.5rem' }}>
                <span style={{ width: 7, height: 7, background: 'var(--accent-cyan)', borderRadius: '50%', display: 'inline-block', animation: 'pulse-glow 2s ease-in-out infinite' }} />
                B.Tech Final Year Project · 2026
              </div>

              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
              }}>
                Detect Deepfakes<br />
                <span className="text-gradient">With Confidence</span>
              </h1>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 480 }}>
                An AI-powered deepfake detection system combining <strong style={{ color: 'var(--text-primary)' }}>XceptionNet</strong> deep learning with <strong style={{ color: 'var(--text-primary)' }}>SRM filter preprocessing</strong> to expose subtle pixel-level forgeries invisible to the human eye.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/detect" className="btn btn-primary">
                  🔍 Analyze an Image
                </Link>
                <Link to="/research" className="btn btn-outline">
                  View Research
                </Link>
              </div>
            </div>

            {/* Right — Hero Image */}
            <div style={{ position: 'relative', animation: 'float 6s ease-in-out infinite' }}>
              <div style={{
                position: 'absolute', inset: '-20px',
                background: 'radial-gradient(circle at center, rgba(124,58,237,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(20px)',
              }} />
              <img
                src={heroImg}
                alt="Deepfake detection AI visualization"
                style={{
                  width: '100%',
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.1)',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              {/* Scan line effect */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: 20, overflow: 'hidden', zIndex: 2, pointerEvents: 'none',
              }}>
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)',
                  animation: 'scan-line 3s linear infinite',
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-sm" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(8,15,36,0.5)' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {stats.map(s => (
              <div key={s.label} className="stat-badge">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <div className="section-label">Capabilities</div>
            <h2 className="section-title">Why This System Works</h2>
            <div className="glow-line" />
            <p className="section-desc">
              A research-grade pipeline that goes beyond surface-level classification — analyzing noise residuals deep within pixel data.
            </p>
          </div>
          <div className="grid-3">
            {features.map(f => (
              <div key={f.title} className="card">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: '0.6rem', fontSize: '1.05rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ background: 'rgba(8,15,36,0.6)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Detect Deepfakes?</h2>
          <p className="section-desc" style={{ margin: '0 auto 2rem' }}>Upload any facial image and get instant AI-powered authenticity analysis.</p>
          <Link to="/detect" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '0.85rem 2.5rem' }}>
            🚀 Start Analyzing
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
