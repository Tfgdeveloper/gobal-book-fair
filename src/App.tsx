import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExhibitionDetailPage from "./pages/ExhibitionDetailPage";
import RegisterPage from "./pages/RegisterPage";
import ScrollToTop from "./components/ui/ScrollToTop";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exhibitions/:slug" element={<ExhibitionDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundRedirect />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

/* Anything unmatched just falls back to the home page rather than a
   blank screen — simplest option until you want a dedicated 404 page. */
function NotFoundRedirect() {
  return <HomePage />;
}