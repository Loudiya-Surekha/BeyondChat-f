import { useState } from 'react';
import { api } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPanel() {
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [scrapeResult, setScrapeResult] = useState(null);
  const [updateResult, setUpdateResult] = useState(null);
  const [scrapeError, setScrapeError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const handleScrape = async () => {
    try {
      setScrapeLoading(true);
      setScrapeError(null);
      setScrapeResult(null);
      
      const response = await api.post('/articles/scrape');
      setScrapeResult(response.data);
      
    } catch (err) {
      setScrapeError(err.response?.data?.message || 'Failed to scrape articles');
    } finally {
      setScrapeLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);
      setUpdateError(null);
      setUpdateResult(null);
      
      const response = await api.post('/articles/update-with-ai');
      setUpdateResult(response.data);
      
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Failed to update articles');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="mb-5">
        <h1 className="mb-3">
          <i className="bi bi-gear-fill me-2"></i>
          Admin Panel
        </h1>
        <p className="lead text-muted">
          Manage article scraping and AI enhancement operations
        </p>
      </div>

      <div className="row g-4">
        {/* Phase 1: Scrape Articles */}
        <div className="col-lg-6">
          <div className="card admin-card">
            <div className="card-header">
              <i className="bi bi-cloud-download me-2"></i>
              Phase 1: Scrape Articles
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">
                Scrape the 5 oldest articles from BeyondChats blog and save them to the database.
              </p>
              
              <button
                className="btn btn-primary-custom btn-custom w-100 mb-3"
                onClick={handleScrape}
                disabled={scrapeLoading}
              >
                {scrapeLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Scraping...
                  </>
                ) : (
                  <>
                    <i className="bi bi-download me-2"></i>
                    Start Scraping
                  </>
                )}
              </button>

              {scrapeResult && (
                <div className="alert alert-success alert-custom">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>Success!</strong> {scrapeResult.message}
                  <div className="mt-2">
                    <small>Articles saved: {scrapeResult.articles?.length || 0}</small>
                  </div>
                </div>
              )}

              {scrapeError && (
                <div className="alert alert-danger alert-custom">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Error:</strong> {scrapeError}
                </div>
              )}

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  How it works:
                </h6>
                <ul className="small mb-0">
                  <li>Navigates to BeyondChats blog page</li>
                  <li>Extracts the 5 oldest articles</li>
                  <li>Scrapes title and content</li>
                  <li>Saves to MongoDB database</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2: Update with AI */}
        <div className="col-lg-6">
          <div className="card admin-card">
            <div className="card-header">
              <i className="bi bi-stars me-2"></i>
              Phase 2: AI Enhancement
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">
                Search Google for similar articles, scrape their content, and use AI to enhance your articles.
              </p>
              
              <button
                className="btn btn-primary-custom btn-custom w-100 mb-3"
                onClick={handleUpdate}
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-magic me-2"></i>
                    Enhance with AI
                  </>
                )}
              </button>

              {updateResult && (
                <div className="alert alert-success alert-custom">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  <strong>Success!</strong> {updateResult.message}
                  <div className="mt-2">
                    <small>
                      Updated: {updateResult.updated || 0} / {updateResult.total || 0} articles
                    </small>
                  </div>
                </div>
              )}

              {updateError && (
                <div className="alert alert-danger alert-custom">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Error:</strong> {updateError}
                </div>
              )}

              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="mb-2">
                  <i className="bi bi-info-circle me-2"></i>
                  How it works:
                </h6>
                <ul className="small mb-0">
                  <li>Searches Google for article title</li>
                  <li>Scrapes top 2 ranking articles</li>
                  <li>Uses OpenAI to rewrite content</li>
                  <li>Improves SEO and readability</li>
                  <li>Adds references to sources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {/* <div className="card admin-card mt-4">
        <div className="card-header">
          <i className="bi bi-book me-2"></i>
          Setup Instructions
        </div>
        <div className="card-body">
          <h6 className="mb-3">Prerequisites:</h6>
          <ol>
            <li className="mb-2">
              <strong>MongoDB:</strong> Ensure MongoDB is running and connection string is set in backend/.env
              <code className="d-block mt-1 p-2 bg-light rounded">MONGO_URI=mongodb://localhost:27017/beyondchats</code>
            </li>
            <li className="mb-2">
              <strong>OpenAI API Key:</strong> Add your OpenAI API key to backend/.env for AI enhancement
              <code className="d-block mt-1 p-2 bg-light rounded">OPENAI_KEY=your_api_key_here</code>
            </li>
            <li className="mb-2">
              <strong>Backend Server:</strong> Start the backend server
              <code className="d-block mt-1 p-2 bg-light rounded">cd backend && npm start</code>
            </li>
          </ol>

          <div className="alert alert-info alert-custom mt-3">
            <i className="bi bi-lightbulb-fill me-2"></i>
            <strong>Note:</strong> The scraper will work even without an OpenAI API key, using sample data and basic enhancement. For full AI capabilities, add your OpenAI key.
          </div>
        </div>
      </div> */}
    </div>
  );
}