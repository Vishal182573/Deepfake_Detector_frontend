import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const DetectPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload only PNG, JPG, GIF or WEBP images');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10 MB limit');
      return;
    }
    setSelectedFile(file);
    setResult(null);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => handleFile(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const handleUpload = async () => {
    if (!selectedFile) { setError('Please select an image first'); return; }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post(`${BACKEND_URL}/predict`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.status === 'success') {
        setResult(response.data);
      } else {
        setError(response.data.message || 'Prediction failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not connect to the detection server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isFake = result?.prediction === 'FAKE';
  const confidenceColor = isFake ? '#ef4444' : '#22c55e';
  const confidencePct = result ? Math.max(result.real_probability, result.fake_probability) : 0;

  return (
    <div className="page-wrapper">
      <div className="bg-dots" />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>AI-Powered Analysis</div>
            <h1 className="section-title" style={{ textAlign: 'center' }}>
              Deepfake <span className="text-gradient">Detector</span>
            </h1>
            <div className="glow-line" style={{ margin: '1rem auto 1.5rem' }} />
            <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
              Upload a facial image and our XceptionNet model will analyze pixel-level noise patterns to determine authenticity.
            </p>
          </div>

          {/* Upload Area */}
          {!result && (
            <div style={{ animation: 'fadeInUp 0.6s ease forwards' }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  border: `2px dashed ${dragging ? 'var(--accent-cyan)' : preview ? 'var(--accent-violet)' : 'var(--border-hover)'}`,
                  borderRadius: 20,
                  background: dragging ? 'rgba(0,212,255,0.05)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  overflow: 'hidden',
                  position: 'relative',
                  minHeight: preview ? 'auto' : 280,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {preview ? (
                  <div style={{ position: 'relative', width: '100%' }}>
                    <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: 420, objectFit: 'contain', display: 'block', borderRadius: 18 }} />
                    {/* Scan overlay */}
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', pointerEvents: 'none' }}>
                      <div style={{
                        position: 'absolute', left: 0, right: 0, height: 2,
                        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.7), transparent)',
                        animation: 'scan-line 2.5s linear infinite',
                      }} />
                    </div>
                    <div style={{
                      position: 'absolute', bottom: 12, right: 12,
                      background: 'rgba(5,10,24,0.85)', backdropFilter: 'blur(8px)',
                      border: '1px solid var(--border)', borderRadius: 8,
                      padding: '6px 12px', fontSize: '0.78rem', color: 'var(--text-muted)',
                    }}>
                      Click to change
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
                    <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                      Drop your image here
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      or click to browse — PNG, JPG, GIF, WEBP up to 10 MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  id="file-input"
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif,.webp"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              {/* File info + Analyze button */}
              {selectedFile && (
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>📎</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{selectedFile.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{(selectedFile.size / 1024).toFixed(1)} KB</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={handleReset} className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.88rem' }}>
                      Clear
                    </button>
                    <button onClick={handleUpload} disabled={loading} className="btn btn-primary" style={{ minWidth: 160 }}>
                      {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white', borderRadius: '50%',
                            animation: 'spin 0.7s linear infinite', display: 'inline-block'
                          }} />
                          Analyzing…
                        </span>
                      ) : '🔍 Detect Deepfake'}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div style={{
                  marginTop: '1rem', padding: '1rem 1.25rem', borderRadius: 12,
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                  color: '#fca5a5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  ⚠️ {error}
                </div>
              )}
            </div>
          )}

          {/* ── RESULT ── */}
          {result && (
            <div style={{ animation: 'fadeInUp 0.6s ease forwards' }}>
              <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                {/* Verdict */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                  padding: '1rem 2.5rem', borderRadius: 14,
                  background: isFake ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
                  border: `1px solid ${isFake ? 'rgba(239,68,68,0.35)' : 'rgba(34,197,94,0.35)'}`,
                  marginBottom: '1.75rem',
                }}>
                  <span style={{ fontSize: '2rem' }}>{isFake ? '⚠️' : '✅'}</span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '2rem', fontWeight: 800,
                    color: confidenceColor,
                    letterSpacing: '-0.02em',
                  }}>{result.prediction}</span>
                </div>

                {/* Confidence bar */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Confidence</span>
                    <span style={{ fontWeight: 600, color: confidenceColor }}>{confidencePct.toFixed(1)}%</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${confidencePct}%`,
                      background: `linear-gradient(90deg, ${confidenceColor}99, ${confidenceColor})`,
                      borderRadius: 4, transition: 'width 1s ease',
                    }} />
                  </div>
                </div>

                {/* Probability breakdown */}
                <div className="grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    padding: '1.5rem', borderRadius: 12,
                    background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)',
                  }}>
                    <div style={{ color: '#86efac', fontSize: '0.8rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Real Probability</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#22c55e' }}>
                      {result.real_probability.toFixed(1)}%
                    </div>
                  </div>
                  <div style={{
                    padding: '1.5rem', borderRadius: 12,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                  }}>
                    <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fake Probability</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#ef4444' }}>
                      {result.fake_probability.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Model confidence badge */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <span className="badge">
                    Model Certainty: <strong style={{ marginLeft: 4 }}>{result.model_confidence?.toUpperCase()}</strong>
                  </span>
                </div>

                {/* Preview thumbnail */}
                {preview && (
                  <div style={{ marginBottom: '2rem' }}>
                    <img src={preview} alt="Analyzed" style={{ maxHeight: 220, borderRadius: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }} />
                  </div>
                )}

                <button onClick={handleReset} className="btn btn-primary">
                  🔄 Analyze Another Image
                </button>
              </div>

              {/* Disclaimer */}
              <div style={{ marginTop: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                Results are probabilistic and should be used alongside human review. Model accuracy: ~91% on FaceForensics++ dataset.
              </div>
            </div>
          )}

          {/* How it works */}
          <div style={{ marginTop: '4rem' }}>
            <div className="divider" />
            <div style={{ marginTop: '3rem' }}>
              <div className="section-label">Under the Hood</div>
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>How Detection Works</h2>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                {[
                  { n: '01', t: 'Upload', d: 'Your image is sent to the FastAPI backend server.' },
                  { n: '02', t: 'SRM Filter', d: 'Spatial Rich Model filters extract pixel-level noise residuals.' },
                  { n: '03', t: 'XceptionNet', d: 'Pre-trained model analyzes the SRM-enhanced image.' },
                  { n: '04', t: 'Result', d: 'Confidence scores for REAL vs FAKE are returned instantly.' },
                ].map(step => (
                  <div key={step.n} style={{ flex: '1 1 180px', padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', opacity: 0.4, lineHeight: 1 }}>{step.n}</div>
                    <div style={{ fontWeight: 600, margin: '0.5rem 0 0.3rem' }}>{step.t}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{step.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DetectPage;
