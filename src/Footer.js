import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid-3" style={{ alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
              🔍 DeepShield
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
              AI-powered deepfake detection using XceptionNet and SRM filtering. B.Tech Final Year Project.
            </p>
          </div>

          <div>
            <div style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Navigation</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['Home', '/'], ['Detector', '/detect'], ['Research', '/research'], ['About', '/about']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-cyan)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tech Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['XceptionNet', 'SRM Filters', 'PyTorch', 'FastAPI', 'FaceForensics++', 'React'].map(tech => (
                <span key={tech} className="badge" style={{ fontSize: '0.75rem' }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 DeepShield — B.Tech Final Year Project &nbsp;·&nbsp; Built with XceptionNet + SRM Filtering</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
