import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from "@/pages/home";
import { JobAnalitics } from "@/pages/job-analitics";

// Helper component to reset scroll position on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Landing Page / Home */}
          <Route path="/" element={<HomePage />} />

          {/* Analytics Page - reachable via /analytics */}
          <Route path="/analytics" element={<JobAnalitics />} />

          {/* Optional: 404 Catch-all - redirects back home or to a custom 404 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;