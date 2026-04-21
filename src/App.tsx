import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import PricingPage from './pages/PricingPage';
import Dashboard from './pages/Dashboard';
import RealTimeAnalysis from './pages/RealTimeAnalysis';
import VideoAnalysis from './pages/VideoAnalysis';
import ChildProfiles from './pages/ChildProfiles';
import Settings from './pages/Settings';
import ReportsPage from './pages/ReportsPage';
import { LanguageProvider } from './lib/i18n';

export default function App() {
  return (
    <LanguageProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Dashboard Routes (Protected in a real app) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/real-time" element={<RealTimeAnalysis />} />
        <Route path="/dashboard/video-analysis" element={<VideoAnalysis />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/profiles" element={<ChildProfiles />} />
        <Route path="/dashboard/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Router>
    </LanguageProvider>
  );
}
