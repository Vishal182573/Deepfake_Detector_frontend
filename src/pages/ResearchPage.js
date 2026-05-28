import React from 'react';
import xceptionImg from '../xception_arch.png';
import srmImg from '../srm_filter.png';

const metrics = [
  { label: 'Test Accuracy', value: '91.2%', icon: '🎯' },
  { label: 'Precision', value: '90.8%', icon: '📐' },
  { label: 'Recall', value: '91.4%', icon: '🔎' },
  { label: 'F1-Score', value: '91.1%', icon: '⚖️' },
];

const baselines = [
  { model: 'VGG16', accuracy: '82.3%', bar: 82 },
  { model: 'ResNet50', accuracy: '85.1%', bar: 85 },
  { model: 'EfficientNet-B0', accuracy: '87.6%', bar: 87 },
  { model: 'XceptionNet + SRM (Ours)', accuracy: '91.2%', bar: 91, highlight: true },
];

const ResearchPage = () => {
  return (
    <div className="page-wrapper">
      <div className="bg-dots" />

      {/* ── HERO ── */}
      <section style={{ padding: '5rem 0 3rem', borderBottom: '1px solid var(--border)', background: 'rgba(8,15,36,0.5)' }}>
        <div className="container">
          <div className="section-label">Academic Research</div>
          <h1 className="section-title" style={{ maxWidth: 700 }}>
            DeepFake Detection Using <span className="text-gradient">XceptionNet + SRM</span>
          </h1>
          <div className="glow-line" />
          <p className="section-desc" style={{ maxWidth: 680 }}>
            A comprehensive deepfake detection framework combining Spatial Rich Model filtering with XceptionNet transfer learning, achieving state-of-the-art performance on the FaceForensics++ benchmark.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {['XceptionNet', 'SRM Filters', 'FaceForensics++', 'Transfer Learning', 'PyTorch', 'FastAPI'].map(t => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE METRICS ── */}
      <section className="section">
        <div className="container">
          <div className="section-label">Results</div>
          <h2 className="section-title">Performance Metrics</h2>
          <div className="glow-line" />
          <div className="grid-4" style={{ marginBottom: '4rem' }}>
            {metrics.map(m => (
              <div key={m.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{m.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>{m.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Baseline comparison */}
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.2rem' }}>Comparison with Baseline Models</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {baselines.map(b => (
                <div key={b.model} style={{
                  padding: '1.25rem 1.5rem', borderRadius: 12,
                  background: b.highlight ? 'rgba(0,212,255,0.06)' : 'var(--bg-card)',
                  border: `1px solid ${b.highlight ? 'rgba(0,212,255,0.25)' : 'var(--border)'}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: b.highlight ? 700 : 400, color: b.highlight ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {b.highlight && <span style={{ color: 'var(--accent-cyan)', marginRight: 6 }}>★</span>}
                      {b.model}
                    </span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: b.highlight ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{b.accuracy}</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${b.bar}%`,
                      background: b.highlight
                        ? 'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))'
                        : 'rgba(139,163,199,0.35)',
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="section" style={{ background: 'rgba(8,15,36,0.5)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">Methodology</div>
          <h2 className="section-title">How the System Is Built</h2>
          <div className="glow-line" />

          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.3rem', marginBottom: '1rem' }}>
                SRM Filter Preprocessing
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Spatial Rich Model (SRM) filters are applied to highlight subtle noise patterns and pixel-level inconsistencies that are invisible to the naked eye but characteristic of AI-generated faces.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Three distinct 5×5 convolution kernels extract high-frequency noise residuals. The absolute combined response is normalized and fed as a 3-channel input to the classifier.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge">3 SRM Kernels</span>
                <span className="badge">5×5 Convolution</span>
                <span className="badge">TF Conv2D</span>
              </div>
            </div>
            <div>
              <img src={srmImg} alt="SRM Filter visualization" style={{ width: '100%', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }} />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div>
              <img src={xceptionImg} alt="XceptionNet architecture" style={{ width: '100%', borderRadius: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.3rem', marginBottom: '1rem' }}>
                XceptionNet Architecture
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                XceptionNet leverages depthwise separable convolutions — fully replacing standard Inception modules — resulting in superior feature extraction with fewer parameters.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Transfer learning from ImageNet weights was used. The last three blocks were fine-tuned while the rest remained frozen, reducing training time and improving convergence.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge">Transfer Learning</span>
                <span className="badge">ImageNet Weights</span>
                <span className="badge">299×299 Input</span>
                <span className="badge">Fine-tuned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DATASET ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem' }}>
            <div>
              <div className="section-label">Dataset</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>FaceForensics++</h2>
              <div className="glow-line" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                The FaceForensics++ dataset contains real and manipulated video frames generated via multiple deepfake manipulation techniques — including DeepFakes, Face2Face, FaceSwap, and NeuralTextures.
              </p>
              <ul style={{ color: 'var(--text-muted)', lineHeight: 2, paddingLeft: '1.25rem', fontSize: '0.9rem' }}>
                <li>Multiple manipulation methods for diversity</li>
                <li>High and low compression variants</li>
                <li>Balanced train / val / test splits</li>
                <li>Used for international deepfake research</li>
              </ul>
            </div>
            <div>
              <div className="section-label">Training Details</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Optimization</h2>
              <div className="glow-line" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  ['Loss Function', 'Weighted Categorical Cross-Entropy'],
                  ['Regularization', 'Dropout (0.5 + 0.3)'],
                  ['Early Stopping', 'Enabled (prevents overfitting)'],
                  ['Optimizer', 'Adam with LR scheduling'],
                  ['Input Size', '299 × 299 pixels'],
                  ['Framework', 'PyTorch + timm'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{k}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUTURE WORK ── */}
      <section className="section" style={{ background: 'rgba(8,15,36,0.5)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">What's Next</div>
          <h2 className="section-title">Future Directions</h2>
          <div className="glow-line" />
          <div className="grid-3">
            {[
              { icon: '🎬', title: 'Temporal Video Analysis', desc: 'Extend detection to video sequences using LSTM or Transformer-based models for frame-level consistency checks.' },
              { icon: '🎙️', title: 'Multimodal Detection', desc: 'Incorporate audio-visual analysis to detect deepfakes through lip-sync inconsistencies and voice cloning artifacts.' },
              { icon: '🔭', title: 'Grad-CAM Visualization', desc: 'Add Gradient-weighted Class Activation Maps to highlight which facial regions are most suspicious to the model.' },
            ].map(item => (
              <div key={item.title} className="card">
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;
