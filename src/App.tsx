import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

import IndexComponent from "./routes/index";
import AboutPage from "./routes/about";
import BrochurePage from "./routes/brochure";
import GalleryPage from "./routes/gallery";
import ContactPage from "./routes/contact";
import AdminPage from "./routes/admin";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const checkNav = () => {
      setIsHeaderHidden(
        location.pathname === "/" && document.body.classList.contains("hide-nav-links"),
      );
    };
    checkNav();
    const observer = new MutationObserver(checkNav);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [location.pathname]);

  const shouldPadTop = !isAdmin && !isHeaderHidden;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!isAdmin && <SiteHeader />}
      <main className={`flex-1 ${shouldPadTop ? "pt-14 sm:pt-15.5" : ""}`}>
        <Routes>
          <Route path="/" element={<IndexComponent />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/brochure" element={<BrochurePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<IndexComponent />} />
        </Routes>
      </main>
      {!isAdmin && <SiteFooter />}
    </div>
  );
}
