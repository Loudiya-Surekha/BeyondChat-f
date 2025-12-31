import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const hasUpdatedContent = article.updatedContent && article.updatedContent.trim() !== '';
  
  return (
    <div className="col-md-6 col-lg-4 mb-4 fade-in">
      <div className="card article-card h-100">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="text-truncate me-2">{article.title}</span>
          {hasUpdatedContent && (
            <i className="bi bi-check-circle-fill text-success"></i>
          )}
        </div>
        
        <div className="card-body d-flex flex-column">
          <div className="mb-3">
            {hasUpdatedContent ? (
              <span className="badge badge-custom badge-updated">
                <i className="bi bi-stars me-1"></i>
                AI Enhanced
              </span>
            ) : (
              <span className="badge badge-custom badge-original">
                <i className="bi bi-file-text me-1"></i>
                Original
              </span>
            )}
          </div>
          
          <p className="card-text flex-grow-1 text-muted">
            {(hasUpdatedContent ? article.updatedContent : article.content)
              .substring(0, 150)}...
          </p>
          
          <div className="d-flex gap-2 mt-3">
            <Link 
              to={`/article/${article._id}`} 
              className="btn btn-primary-custom btn-custom flex-grow-1"
            >
              <i className="bi bi-eye me-2"></i>
              View Details
            </Link>
            
            {/* {article.originalUrl && (
              <a 
                href={article.originalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline-custom btn-custom"
                title="View Original"
              >
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
            )} */}
          </div>
          
          {article.references && article.references.length > 0 && (
            <div className="mt-3 pt-3 border-top">
              <small className="text-muted">
                <i className="bi bi-link-45deg me-1"></i>
                {article.references.length} reference{article.references.length > 1 ? 's' : ''}
              </small>
            </div>
          )}
        </div>
        
        <div className="card-footer bg-transparent border-top-0 pt-0 pb-3 px-3">
          <small className="text-muted">
            <i className="bi bi-clock me-1"></i>
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </small>
        </div>
      </div>
    </div>
  );
}