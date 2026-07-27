import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Renders nothing — just scrolls the window to the top every time the
   route's pathname changes. React Router doesn't do this by default,
   so without it, navigating to a new page keeps the previous page's
   scroll position. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}