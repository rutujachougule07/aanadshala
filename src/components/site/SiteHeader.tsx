import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site-info";
import { useLanguage } from "@/lib/use-language";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const { lang, isMr, isEn, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const checkHide = () => {
      setHideHeader(document.body.classList.contains("hide-nav-links"));
    };
    checkHide();
    const observer = new MutationObserver(checkHide);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [pathname]);

  if (hideHeader && pathname === "/") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-999999 transition-all duration-500 ${
        scrolled ? "shadow-[0_6px_28px_rgba(12,35,112,0.18)] border-b" : "border-b"
      }`}
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(240, 246, 255, 0.96)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(12, 35, 112, 0.15)",
      }}
    >
      {/* ── MAIN NAV ROW (COMPACT HEIGHT & SPACING) ── */}
      <div className="w-full max-w-370 mx-auto flex items-center justify-between gap-3 px-4 sm:px-8 py-2 sm:py-2.5">
        {/* LOGO */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.dispatchEvent(new CustomEvent("reset-section"));
          }}
          className="group flex items-center gap-2 cursor-pointer min-w-0"
        >
          <div className="leading-tight min-w-0">
            <span
              className="block font-display text-[11px] sm:text-sm lg:text-base font-black tracking-tight leading-tight truncate sm:whitespace-normal"
              style={{ color: "#0044cc" }}
            >
              {isMr ? (
                <>
                  प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span>
                </>
              ) : (
                <>
                  Preetam Senior Citizen <span className="text-[#db2777]">Anandshala</span>
                </>
              )}
            </span>
            <span
              className="block text-[8px] sm:text-[10px] uppercase tracking-wider font-black mt-0.5"
              style={{ color: "#db2777" }}
            >
              SANGLI • MAHARASHTRA
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => {
                  if (l.to === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.dispatchEvent(new CustomEvent("reset-section"));
                  }
                }}
                className="group relative rounded-full px-3.5 py-1.5 text-sm font-extrabold transition-all duration-300 hover:text-[#db2777]"
                style={{ color: isActive ? "#db2777" : "#0044cc" }}
              >
                {isMr ? l.label : l.en}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  style={{ background: "#db2777" }}
                />
              </Link>
            );
          })}

          {/* LANGUAGE TOGGLE BUTTON (FIXED ORDER: ENG | मराठी) */}
          <button
            onClick={toggleLanguage}
            className="ml-2 inline-flex items-center justify-center rounded-full border-2 px-3.5 py-1 text-xs font-black transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 min-w-24.5"
            style={{
              borderColor: "rgba(12, 35, 112, 0.3)",
              background: "#FFFFFF",
              color: "#0044cc",
            }}
            title="Switch Language / भाषा बदला"
          >
            <span
              className={
                isEn
                  ? "text-[#0044cc] font-black border-b-2 border-[#0044cc]"
                  : "text-slate-400 font-extrabold opacity-70"
              }
            >
              ENG
            </span>
            <span className="text-slate-300 mx-1 font-bold">|</span>
            <span
              className={
                isMr
                  ? "text-[#0044cc] font-black border-b-2 border-[#0044cc]"
                  : "text-slate-400 font-extrabold opacity-70"
              }
            >
              मराठी
            </span>
          </button>

          {/* TOP RIGHT ADMISSION CTA BUTTON */}
          <a
            href="tel:+919370237633"
            className="ml-2 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-black text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #db2777 0%, #0044cc 100%)",
            }}
          >
            <span className="text-sm">🏛️</span>
            <span>{isMr ? "आजच प्रवेश घ्या" : "Book Admission"}</span>
          </a>
        </nav>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-3 lg:hidden shrink-0">
          {/* MOBILE LANGUAGE TOGGLE BUTTON */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-black cursor-pointer shadow-xs bg-white text-[#0044cc] min-w-21"
            style={{
              borderColor: "rgba(12, 35, 112, 0.3)",
            }}
            title="Switch Language / भाषा बदला"
          >
            <span
              className={
                isEn
                  ? "text-[#0044cc] font-black border-b-2 border-[#0044cc]"
                  : "text-slate-400 font-extrabold opacity-70"
              }
            >
              ENG
            </span>
            <span className="text-slate-300 mx-1 font-bold">|</span>
            <span
              className={
                isMr
                  ? "text-[#0044cc] font-black border-b-2 border-[#0044cc]"
                  : "text-slate-400 font-extrabold opacity-70"
              }
            >
              मराठी
            </span>
          </button>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid size-9 sm:size-10 place-items-center rounded-xl transition-all duration-200 cursor-pointer shadow-xs bg-white text-[#0044cc]"
            style={{
              border: "1.5px solid rgba(12, 35, 112, 0.25)",
            }}
          >
            <span className="text-base font-black">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {open && (
        <div
          className="animate-fade-up border-t lg:hidden"
          style={{
            borderColor: "rgba(12, 35, 112, 0.15)",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="h-1 w-full"
            style={{ background: "linear-gradient(90deg, #0044cc, #db2777, #0284C7)" }}
          />
          <nav className="w-full px-6 py-6 flex flex-col gap-2">
            {navLinks.map((l) => {
              const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => {
                    setOpen(false);
                    if (l.to === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      window.dispatchEvent(new CustomEvent("reset-section"));
                    }
                  }}
                  className="rounded-2xl px-5 py-3.5 text-base font-black transition-all"
                  style={{
                    color: isActive ? "#db2777" : "#0044cc",
                    background: isActive ? "rgba(219, 39, 119, 0.08)" : "transparent",
                  }}
                >
                  {isMr ? l.label : l.en}
                </Link>
              );
            })}

            <a
              href="tel:+919370237633"
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-black text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #db2777 0%, #0044cc 100%)",
              }}
            >
              <span>🏛️</span>
              <span>{isMr ? "आजच प्रवेश घ्या (कॉल करा)" : "Book Admission (Call)"}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
