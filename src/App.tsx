import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import VisitorPage from './pages/VisitorPage';
import TestFlow from './pages/TestFlow';
import TestResult from './pages/TestResult';
import CreateTest from './pages/CreateTest';
import VisitorProfile from './pages/VisitorProfile';
import ArtistPage from './pages/ArtistPage';
import AdminDashboard from './pages/AdminDashboard';
import { useStore } from './store/useStore';

function App() {
  const { checkDailyLogin } = useStore();

  useEffect(() => {
    checkDailyLogin();
  }, [checkDailyLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visitor" element={<VisitorPage />} />
        <Route path="/visitor/test/:testId" element={<TestFlow />} />
        <Route path="/visitor/result/:testId/:resultId" element={<TestResult />} />
        <Route path="/visitor/create" element={<CreateTest />} />
        <Route path="/visitor/profile" element={<VisitorProfile />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
