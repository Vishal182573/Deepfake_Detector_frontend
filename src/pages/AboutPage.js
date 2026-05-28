import React from 'react';
import aboutImg from '../about_research.png';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="page-wrapper">
      <div className="bg-dots" />

      {/* ── HERO ── */}
      <section style={{ padding: '5rem 0 3rem', borderBottom: '1px solid var(--border)', background: 'rgba(8,15,36,0.5)' }}>
        <div className="container">
          <div className="section-label">About This Project</div>
          <h1 className="section-title" style={{ maxWidth: 700 }}>
            Building the Future of <span className="text-gradient">Digital Trust</span>
          </h1>
          <div className="glow-line" />
          <p className="section-desc" style={{ maxWidth: 640 }}>
            DeepShield is a B.Tech Final Year Research Project focused on combating the growing threat of AI-generated synthetic media through advanced deep learning and forensic analysis techniques.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="section-label">Mission</div>
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Why This Matters</h2>
              <div className="glow-line" />
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Deepfakes — hyper-realistic AI-generated synthetic media — pose unprecedented threats to democratic processes, journalism, personal reputation, and national security. As generative AI models become more accessible, the need for reliable detection tools becomes critical.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                This research directly addresses that challenge by combining the power of XceptionNet's deep feature extraction with SRM-based preprocessing — achieving high accuracy while remaining computationally efficient enough for real-world deployment.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                Our goal is not just academic contribution — it is to build a system that can practically be deployed by journalists, law enforcement, and content platforms to safeguard digital authenticity.
              </p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: '-15px',
                background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent 70%)',
                filter: 'blur(20px)',
              }} />
              <img src={aboutImg} alt="AI research visualization" style={{ width: '100%', borderRadius: 18, border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', position: 'relative', zIndex: 1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="section" style={{ background: 'rgba(8,15,36,0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>The Problem</div>
            <h2 className="section-title">The Deepfake Threat Landscape</h2>
          </div>
          <div className="grid-3">
            {[
              { icon: '🗳️', title: 'Political Disinformation', desc: 'Synthetic videos of public figures spread false narratives and undermine democratic processes and elections.' },
              { icon: '⚖️', title: 'Legal & Identity Fraud', desc: 'AI-generated images are increasingly used to fabricate evidence, commit identity theft, and fraud.' },
              { icon: '📰', title: 'Journalistic Integrity', desc: 'Deepfakes erode trust in authentic media, making it harder for audiences to believe verified news content.' },
              { icon: '🔒', title: 'Privacy Violations', desc: 'Non-consensual synthetic media exploits individuals by superimposing their likeness onto inappropriate content.' },
              { icon: '🏛️', title: 'National Security', desc: 'State-level actors deploy deepfakes for psychological operations, espionage, and social manipulation at scale.' },
              { icon: '💼', title: 'Corporate Risk', desc: 'Voice and video deepfakes enable sophisticated CEO fraud and social engineering attacks on enterprises.' },
            ].map(item => (
              <div key={item.title} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT DETAILS ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '3rem' }}>
            <div>
              <div className="section-label">Project Info</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Academic Context</h2>
              <div className="glow-line" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  ['Type', 'B.Tech Final Year Project'],
                  ['Domain', 'Deep Learning / Computer Vision'],
                  ['Dataset', 'FaceForensics++'],
                  ['Architecture', 'XceptionNet (legacy_xception via timm)'],
                  ['Preprocessing', 'SRM Filters (3 kernels, 5×5)'],
                  ['Backend', 'FastAPI + PyTorch + TensorFlow'],
                  ['Frontend', 'React + React Router'],
                  ['Model Accuracy', '~91% on test set'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{k}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', textAlign: 'right', maxWidth: '55%' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label">Tech Stack</div>
              <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Built With</h2>
              <div className="glow-line" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { category: 'Deep Learning', items: ['PyTorch', 'timm (XceptionNet)', 'TensorFlow (SRM)'] },
                  { category: 'Data & Training', items: ['FaceForensics++', 'Weighted Cross-Entropy', 'Dropout + Early Stopping'] },
                  { category: 'Backend', items: ['FastAPI', 'Python 3.10+', 'OpenCV', 'Pillow'] },
                  { category: 'Frontend', items: ['React 18', 'React Router v6', 'Axios', 'CSS3 Animations'] },
                ].map(group => (
                  <div key={group.category} style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.6rem', color: 'var(--accent-cyan)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group.category}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {group.items.map(item => (
                        <span key={item} className="badge" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ background: 'rgba(8,15,36,0.6)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Explore the Research</h2>
          <p className="section-desc" style={{ margin: '0 auto 2rem' }}>
            Dive into the methodology, results, and architecture behind DeepShield.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/research" className="btn btn-primary">📄 Read Research</Link>
            <Link to="/detect" className="btn btn-outline">🔍 Try Detector</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
