export default function ComparisonView({ original, updated }) {
  return (
    <div className="comparison-container">
      <div className="card article-card">
        <div className="card-header">
          <i className="bi bi-file-text me-2"></i>
          Original Content
        </div>
        <div className="card-body">
          <div className="article-content">
            {original.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card article-card">
        <div className="card-header">
          <i className="bi bi-stars me-2"></i>
          AI-Enhanced Content
        </div>
        <div className="card-body">
          <div className="article-content">
            {updated.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}