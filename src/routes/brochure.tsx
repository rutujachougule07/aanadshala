import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/use-language";
import {
  X,
  Sparkles,
  Calendar,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MapPin,
  FileText,
  Download,
} from "lucide-react";
import { HighlightText } from "@/components/HighlightText";

// ===== 4 OFFICIAL BROCHURE SCAN PAGES =====
const brochureScanPages = [
  {
    id: 1,
    titleEn: "Anandshala Cover Brochure Page & Admission Info",
    titleMr: "आनंदशाळा मुखपृष्ठ माहिती पत्रक व प्रवेश माहिती",
    categoryEn: "Brochure Cover",
    categoryMr: "माहिती पत्रक मुखपृष्ठ",
    date: "2026",
    image: "/images/Screenshot 2026-07-31 103107.png",
    descMr: "प्रीतम ज्येष्ठ नागरिक आनंदशाळा मुखपृष्ठ माहिती पत्रक व प्रवेश माहिती.",
    descEn: "Official Anandshala brochure cover page & admission details.",
  },
  {
    id: 2,
    titleEn: "5-Hour Daily Timetable & 18 Activity Halls",
    titleMr: "आनंदशाळेतील ५ तासांचे वेळापत्रक व १८ उपक्रम हॉल्स",
    categoryEn: "Timetable & Halls",
    categoryMr: "वेळापत्रक व हॉल्स",
    date: "2026",
    image: "/images/Screenshot 2026-07-31 103131.png",
    descMr: "दैनंदिन ५ तासांचे वेळापत्रक व १८ विशेष उपक्रम हॉल्सची सविस्तर माहिती.",
    descEn: "Daily 5-hour activity schedule & 18 specialized halls.",
  },
  {
    id: 3,
    titleEn: "1.5 Acre Campus Scenic View & Infrastructure",
    titleMr: "आनंदशाळा १.५ एकर विहंगम परिसर व बांधकाम दृश्य",
    categoryEn: "Campus Architecture",
    categoryMr: "परिसर व बांधकाम",
    date: "2026",
    image: "/images/Screenshot 2026-07-31 103152.png",
    descMr: "सांगली शहरात १.५ एकर निसर्गरम्य परिसरातील आनंदशाळा संकुल व बांधकाम दृश्य.",
    descEn: "1.5-acre scenic campus architecture & infrastructure.",
  },
  {
    id: 4,
    titleEn: "55ft Radha Krishna Statue, Proposed Temple & Gaushala",
    titleMr: "५५ फुटांची राधाकृष्ण मूर्ती, नियोजित मंदिर व गोशाळा",
    categoryEn: "Spiritual & Temple",
    categoryMr: "अध्यात्म व गोशाळा",
    date: "2026",
    image: "/images/Screenshot 2026-07-31 103213.png",
    descMr: "सांगलीकरांसाठी मुख्य आकर्षण - ५५ फुटांची राधाकृष्ण मूर्ती, नियोजित श्रीकृष्ण मंदिर व गोशाळा.",
    descEn: "55ft Radha Krishna statue, proposed temple & Gaushala.",
  },
];

const Brochure: React.FC = () => {
  const { isEn } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const closeImage = () => {
    setSelectedIndex(null);
    setZoomLevel(1);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % brochureScanPages.length : 0));
    setZoomLevel(1);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + brochureScanPages.length) % brochureScanPages.length : 0,
    );
    setZoomLevel(1);
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3.5));
  const zoomOut = () => setZoomLevel((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.5));
  const resetZoom = () => setZoomLevel(1);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, brochureScanPages.length]);

  const activePhoto = selectedIndex !== null ? brochureScanPages[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff]">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-pink-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />

      <style>{`
        @keyframes galBorderRotate {
          0% { background-position: 0% 0%, 0% 50%; }
          50% { background-position: 0% 0%, 100% 50%; }
          100% { background-position: 0% 0%, 0% 50%; }
        }
        .brochure-card-anim {
          position: relative;
          background: #0f172a;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 2.5px solid transparent;
          background-image: linear-gradient(#0f172a, #0f172a), 
                            linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6, #f59e0b, #ec4899);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          background-size: 100% 100%, 300% 300%;
          animation: galBorderRotate 6s linear infinite;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
        }
        .brochure-card-anim:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 45px rgba(236, 72, 153, 0.3), 0 0 25px rgba(139, 92, 246, 0.2);
          animation-duration: 2.5s;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs sm:text-sm mb-4 border border-pink-200 shadow-xs">
            <Sparkles size={16} />
            <span>{isEn ? "Official Information Brochure 2026" : "अधिकृत माहिती पत्रक २०२६"}</span>
          </div>

          <h1
            className="text-3xl sm:text-[40px] font-black text-[#541A1A] leading-tight"
            style={{ fontWeight: 900 }}
          >
            {isEn ? (
              <>
                Preetam Senior Citizen <span className="text-pink-600">Brochure</span>
              </>
            ) : (
              <>
                प्रीतम ज्येष्ठ नागरिक <span className="text-pink-600">माहिती पत्रक</span>
              </>
            )}
          </h1>

          <p
            className="mt-3 text-[16px] !font-[300] text-slate-700 max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: "16px", fontWeight: 300 }}
          >
            {isEn
              ? "View & explore the official 4 brochure scan pages of Preetam Senior Citizen Anandshala."
              : "प्रीतम ज्येष्ठ नागरिक आनंदशाळेचे अधिकृत ४ रंगीत माहिती पत्रक स्कॅन्स पहा व डाऊनलोड करा."}
          </p>
        </div>

        {/* ===== 4 BROCHURE CARDS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {brochureScanPages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => {
                setSelectedIndex(index);
                setZoomLevel(1);
              }}
              className="brochure-card-anim group cursor-pointer relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={item.image}
                alt={isEn ? item.titleEn : item.titleMr}
                loading="eager"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />


            </motion.div>
          ))}
        </div>

        {/* ===== BOTTOM CONTACT & ADMISSION BANNER ===== */}
        <div className="mt-14 max-w-4xl mx-auto bg-linear-to-r from-[#1a0429] via-[#310842] to-[#1a0429] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-pink-300">
              {isEn ? "Need Admission Guidance?" : "प्रवेश प्रक्रिया माहिती हवी आहे?"}
            </h3>
            <p className="text-sm text-slate-300 font-medium">
              {isEn
                ? "Contact us for complete details regarding day passes, packages & rooms."
                : "दिवसाचा पास, रूम्स व विविध पॅकेजेसच्या माहितीसाठी आजच संपर्क साधा."}
            </p>
            <div className="flex items-start justify-center md:justify-start gap-2 text-xs sm:text-sm text-amber-300 font-bold pt-1 leading-relaxed">
              <MapPin size={18} className="shrink-0 mt-0.5" />
              <span>
                {isEn
                  ? "Preetam Senior Citizen Anandshala, Madhavnagar, Karnal, Dhananjay Garden Road, Sangli."
                  : "प्रीतम ज्येष्ठ नागरिक आनंदशाळा, माधवनगर, कर्नाळ, धनंजय गार्डन रोड, सांगली."}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center shrink-0">
            <a
              href="tel:9970079090"
              className="px-7 py-3.5 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-black text-base flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <PhoneCall size={20} />
              <span>9970079090</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== INTERACTIVE FULLSCREEN PURE PHOTO MODAL ===== */}
      <AnimatePresence>
        {selectedIndex !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-999999 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden"
          >
            {/* TOP FLOATING TOOLBAR */}
            <div
              className="w-full max-w-7xl flex items-center justify-end gap-3 z-30 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ZOOM CONTROLS */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/20 backdrop-blur shadow-lg">
                <button
                  onClick={zoomOut}
                  disabled={zoomLevel <= 0.5}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Zoom Out (-)"
                >
                  <ZoomOut size={18} />
                </button>

                <button
                  onClick={resetZoom}
                  className="px-2.5 py-0.5 text-xs font-extrabold text-pink-300 hover:text-white transition cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  onClick={zoomIn}
                  disabled={zoomLevel >= 3.5}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                  title="Zoom In (+)"
                >
                  <ZoomIn size={18} />
                </button>

                {zoomLevel !== 1 && (
                  <button
                    onClick={resetZoom}
                    className="p-1.5 text-slate-300 hover:text-white transition cursor-pointer"
                    title="Reset"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
              </div>

              {/* CLOSE BUTTON */}
              <button
                onClick={closeImage}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-rose-600 text-white flex items-center justify-center transition border border-white/25 shadow-lg cursor-pointer"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* MAIN PURE PHOTO DISPLAY AREA */}
            <div
              className="relative w-full max-w-6xl flex-1 flex items-center justify-center select-none overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PREV BUTTON */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-pink-600 text-white border border-white/20 backdrop-blur flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer"
                title="मागील पान"
              >
                <ChevronLeft size={24} className="sm:size-8" />
              </button>

              {/* 100% PURE BROCHURE PHOTO */}
              <motion.div
                key={activePhoto.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[85vh] max-w-[90vw] rounded-2xl overflow-auto shadow-2xl border border-white/10 flex items-center justify-center bg-black/90 p-2"
              >
                <img
                  src={activePhoto.image}
                  alt={isEn ? activePhoto.titleEn : activePhoto.titleMr}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                    transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="max-h-[82vh] max-w-[88vw] object-contain select-none transition-transform"
                />
              </motion.div>

              {/* NEXT BUTTON */}
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-pink-600 text-white border border-white/20 backdrop-blur flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 cursor-pointer"
                title="पुढील पान"
              >
                <ChevronRight size={24} className="sm:size-8" />
              </button>
            </div>

            <div className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Brochure;
