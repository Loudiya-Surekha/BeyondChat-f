export default function Footer() {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="mb-3">
              <i className="bi bi-chat-dots-fill me-2"></i>
              BeyondChats
            </h5>
            <p className="mb-0" style={{ opacity: 0.8 }}>
              AI-powered article management and optimization system.
              Scrape, enhance, and publish content with ease.
            </p>
          </div>
          
          <div className="col-md-3 mb-3 mb-md-0">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/">
                  <i className="bi bi-chevron-right me-1"></i>
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/admin">
                  <i className="bi bi-chevron-right me-1"></i>
                  Admin Panel
                </a>
              </li>
            </ul>
          </div>
          
          <div className="col-md-3">
            <h6 className="mb-3">Connect</h6>
            <div className="d-flex gap-3">
              <a href="https://github.com/Loudiya-Surekha" className="fs-4">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/loudiya-surekha/" className="fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <div className="text-center" style={{ opacity: 0.8 }}>
          <p className="mb-0">
            © {new Date().getFullYear()} BeyondChats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}