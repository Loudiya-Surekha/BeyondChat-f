import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, original, updated

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/articles');
      setArticles(response.data.articles || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'original') return !article.updatedContent;
    if (filter === 'updated') return article.updatedContent;
    return true;
  });

  const stats = {
    total: articles.length,
    original: articles.filter(a => !a.updatedContent).length,
    updated: articles.filter(a => a.updatedContent).length
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section min-vw-100">
        <div className="container text-center">
          <h1 className="mb-3">
            <i className="bi bi-stars me-2"></i>
            AI-Powered Article Management
          </h1>
          <p className="lead mb-4">
            Scrape, enhance, and optimize your content with cutting-edge AI technology
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/admin" className="btn btn-light btn-lg btn-custom">
              <i className="bi bi-gear-fill me-2"></i>
              Go to Admin Panel
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mb-4 ">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="stat-card">
              <i className="bi bi-file-earmark-text text-primary"></i>
              <h3>{stats.total}</h3>
              <p>Total Articles</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <i className="bi bi-file-text text-info"></i>
              <h3>{stats.original}</h3>
              <p>Original Content</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <i className="bi bi-stars text-success"></i>
              <h3>{stats.updated}</h3>
              <p>AI Enhanced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <i className="bi bi-collection me-2"></i>
            Articles Collection
          </h2>
          
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </button>
            <button
              type="button"
              className={`btn ${filter === 'original' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('original')}
            >
              Original ({stats.original})
            </button> 
            <button
              type="button"
              className={`btn ${filter === 'updated' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('updated')}
            >
              Enhanced ({stats.updated})
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner message="Loading articles..." />}
        
        {error && <ErrorMessage message={error} onRetry={fetchArticles} />}
        
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="text-center py-5">
            <i className="bi bi-inbox display-1 text-muted mb-3"></i>
            <h4 className="text-muted">No articles found</h4>
            <p className="text-muted">
              Go to the Admin Panel to scrape articles from BeyondChats
            </p>
            <a href="/admin" className="btn btn-primary-custom btn-custom mt-3">
              <i className="bi bi-gear-fill me-2"></i>
              Open Admin Panel
            </a>
          </div>
        )}
        
        {!loading && !error && filteredArticles.length > 0 && (
          <div className="row">
            {filteredArticles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}