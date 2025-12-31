import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
      <div className="d-flex flex-column min-vh-100 min-vw-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
  ); 
}

export default App;


// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import ArticlePage from './pages/ArticlePage';
// import AdminPanel from './pages/AdminPanel';
// import './App.css';

// function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Navbar />

//       <main className="flex-grow-1">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/article/:id" element={<ArticlePage />} />
//           <Route path="/admin" element={<AdminPanel />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;

