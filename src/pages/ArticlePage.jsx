import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ComparisonView from '../components/ComparisonView';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('updated'); // updated, original, comparison

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/articles/${id}`);
      setArticle(response.data.article);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading article..." />;
  if (error) return (
    <div className="container mt-5">
      <ErrorMessage message={error} onRetry={fetchArticle} />
      <Link to="/" className="btn btn-outline-primary btn-custom mt-3">
        <i className="bi bi-arrow-left me-2"></i>
        Back to Home
      </Link>
    </div>
  );
  if (!article) return null;

  const hasUpdatedContent = article.updatedContent && article.updatedContent.trim() !== '';

  return (
    <div className="container my-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-fill me-1"></i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active">Article Details</li>
        </ol>
      </nav>

      {/* Article Header */}
      <div className="card article-card mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h1 className="h2 mb-0">{article.title}</h1>
            {hasUpdatedContent && (
              <span className="badge badge-custom badge-updated fs-6">
                <i className="bi bi-stars me-1"></i>
                AI Enhanced
              </span>
            )}
          </div>
          
          <div className="d-flex gap-3 text-muted mb-3">
            <span>
              <i className="bi bi-clock me-1"></i>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {/* {article.originalUrl && (
              <a 
                href={article.originalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i>
                View Original Source
              </a>
            )} */}
          </div>

          {/* View Mode Selector */}
          {hasUpdatedContent && (
            <div className="btn-group mb-4" role="group">
              <button
                type="button"
                className={`btn ${viewMode === 'updated' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('updated')}
              >
                <i className="bi bi-stars me-1"></i>
                Enhanced Version
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'original' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('original')}
              >
                <i className="bi bi-file-text me-1"></i>
                Original Version
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'comparison' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('comparison')}
              >
                <i className="bi bi-layout-split me-1"></i>
                Compare Both
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      {viewMode === 'comparison' && hasUpdatedContent ? (
        <ComparisonView 
          original={article.content} 
          updated={article.updatedContent} 
        />
      ) : (
        <div className="card article-card mb-4">
          <div className="card-body p-4">
            <div className="article-content">
              {(viewMode === 'updated' && hasUpdatedContent 
                ? article.updatedContent 
                : article.content
              ).split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* References */}
      {article.references && article.references.length > 0 && (
        <div className="references-list">
          <h5>
            <i className="bi bi-link-45deg me-2"></i>
            References
          </h5>
          <ol>
            {article.references.map((ref, index) => (
              <li key={index} className="mb-2">
                <a href={ref} target="_blank" rel="noopener noreferrer">{ref}</a>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-4">
        <Link to="/" className="btn btn-outline-primary btn-custom">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Articles
        </Link>
      </div>
    </div>
  );
}