import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExhibitionDetailPage from "./pages/ExhibitionDetailPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exhibitions/:slug" element={<ExhibitionDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

/* Anything unmatched just falls back to the home page rather than a
   blank screen — simplest option until you want a dedicated 404 page. */
function NotFoundRedirect() {
  return <HomePage />;
}