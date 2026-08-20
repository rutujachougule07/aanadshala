import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/use-language";
import { useAdminStore, VideoItem, useResolvedVideoUrl } from "@/lib/admin-store";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Sparkles,
  Calendar,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { HighlightText } from "@/components/HighlightText";

// ===== Gallery Data =====
const galleryImages = [
  {
    id: 1,
    titleEn: "Anandshala Campus Gallery 1",
    titleMr: "आनंदशाळा संकुल गॅलरी १",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "26 Jan 2026",
    image: "/images/gallery imgage1.JPG",
  },
  {
    id: 2,
    titleEn: "Anandshala Campus View 2",
    titleMr: "आनंदशाळा परिसर चित्र २",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "26 Jan 2026",
    image: "/images/gallery image2.JPG",
  },
  {
    id: 3,
    titleEn: "Anandshala Activity Photo 3",
    titleMr: "आनंदशाळा उपक्रम चित्र ३",
    categoryEn: "Special Events",
    categoryMr: "विशेष कार्यक्रम",
    date: "26 Jan 2026",
    image: "/images/gallery image3.JPG",
  },
  {
    id: 4,
    titleEn: "Anandshala Event Celebration 4",
    titleMr: "आनंदशाळा सोहळा चित्र ४",
    categoryEn: "Annual Function",
    categoryMr: "वार्षिक स्नेहसंमेलन",
    date: "26 Jan 2026",
    image: "/images/gallery image4.JPG",
  },
  {
    id: 5,
    titleEn: "Anandshala Gathering 5",
    titleMr: "आनंदशाळा कार्यक्रम ५",
    categoryEn: "Joy Festival",
    categoryMr: "आनंद मेळावा",
    date: "26 Jan 2026",
    image: "/images/gallery image5.JPG",
  },
  {
    id: 6,
    titleEn: "Sports & Gallery 6",
    titleMr: "आनंदशाळा क्रीडा & गॅलरी ६",
    categoryEn: "Special Events",
    categoryMr: "विशेष कार्यक्रम",
    date: "26 Jan 2026",
    image: "/images/gallery image6.JPG",
  },
  {
    id: 7,
    titleEn: "Anandshala Campus View 7",
    titleMr: "आनंदशाळा परिसर दृश्य ७",
    categoryEn: "Construction",
    categoryMr: "बांधकाम",
    date: "26 Jan 2026",
    image: "/images/gallery image7.JPG",
  },
  {
    id: 8,
    titleEn: "Anandshala Special Meet 8",
    titleMr: "आनंदशाळा विशेष सोहळा ८",
    categoryEn: "Dignitaries Visit",
    categoryMr: "मान्यवर भेट",
    date: "26 Jan 2026",
    image: "/images/gallery image8.JPG",
  },
  {
    id: 9,
    titleEn: "Anandbhavan Campus",
    titleMr: "आनंदभवन परिसर",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "26 Jan 2024",
    image: "/images/Screenshot 2026-07-31 103107.png",
  },
  {
    id: 10,
    titleEn: "Joy Festival Celebration",
    titleMr: "आनंद मेळावा सोहळा",
    categoryEn: "Joy Festival",
    categoryMr: "आनंद मेळावा",
    date: "15 Aug 2023",
    image: "/images/aandmelav 10.jpeg",
  },
  {
    id: 11,
    titleEn: "Bhumipujan Ceremony",
    titleMr: "भूमिपूजन कार्यक्रम",
    categoryEn: "Bhumipujan",
    categoryMr: "भूमिपूजन",
    date: "09 Jan 2024",
    image: "/images/ropya mahotsv1.jpg",
  },
  {
    id: 12,
    titleEn: "Annual Gathering Meetup",
    titleMr: "वार्षिक स्नेहसंमेलन",
    categoryEn: "Annual Function",
    categoryMr: "वार्षिक स्नेहसंमेलन",
    date: "25 Dec 2023",
    image: "/images/aandshala sahal 1.jpeg",
  },
  {
    id: 13,
    titleEn: "Cultural Festival",
    titleMr: "सांस्कृतिक महोत्सव",
    categoryEn: "Joy Festival",
    categoryMr: "आनंद मेळावा",
    date: "14 Nov 2023",
    image: "/images/aandmelava1.jpg",
  },
  {
    id: 14,
    titleEn: "Yoga & Meditation Hall",
    titleMr: "योगा व ध्यान कक्ष",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "21 Jun 2023",
    image: "/images/Screenshot 2026-07-31 103545.png",
  },
  {
    id: 15,
    titleEn: "Music Evening & Culture",
    titleMr: "संगीत संध्या व सांस्कृतिक",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "05 Mar 2023",
    image: "/images/aandmelav 5.jpg",
  },
  {
    id: 16,
    titleEn: "Garden, Lawn & Campus",
    titleMr: "गार्डन, लॉन व संकुल",
    categoryEn: "Construction",
    categoryMr: "बांधकाम",
    date: "10 Feb 2024",
    image: "/images/Screenshot 2026-07-31 103213.png",
  },
  {
    id: 17,
    titleEn: "Silver Jubilee Bhumipujan",
    titleMr: "रौप्य महोत्सव भूमिपूजन",
    categoryEn: "Bhumipujan",
    categoryMr: "भूमिपूजन",
    date: "26 Jan 2024",
    image: "/images/ropya mahotsv 2.jpg",
  },
  {
    id: 18,
    titleEn: "Social Work Camp",
    titleMr: "सामाजिक कार्य शिबिर",
    categoryEn: "Social Work",
    categoryMr: "सामाजिक कार्य",
    date: "02 Oct 2023",
    image: "/images/samajik karya 2.jpeg",
  },
  {
    id: 21,
    titleEn: "Dignitary Felicitation Visit",
    titleMr: "मान्यवर सत्कार भेट",
    categoryEn: "Dignitaries Visit",
    categoryMr: "मान्यवर भेट",
    date: "20 Dec 2023",
    image: "/images/vyavsaik mahiti 3.jpeg",
  },
  {
    id: 22,
    titleEn: "Recreation & Games Center",
    titleMr: "खेळ व विरंगुळा केंद्र",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "18 Nov 2023",
    image: "/images/Screenshot 2026-07-31 103517.png",
  },
  {
    id: 23,
    titleEn: "Anand Niwas Complex",
    titleMr: "आनंद निवास संकुल",
    categoryEn: "Senior Citizen Anandshala",
    categoryMr: "ज्येष्ठ नागरिक आनंदशाळा",
    date: "10 Jan 2024",
    image: "/images/Screenshot 2026-07-31 103842.png",
  },
  {
    id: 24,
    titleEn: "Anand Picnic Tour 2",
    titleMr: "आनंद सहल २",
    categoryEn: "Annual Function",
    categoryMr: "वार्षिक स्नेहसंमेलन",
    date: "2024",
    image: "/images/aandshala sahal 2.jpg",
  },
  {
    id: 25,
    titleEn: "Anand Picnic Tour 3",
    titleMr: "आनंद सहल ३",
    categoryEn: "Annual Function",
    categoryMr: "वार्षिक स्नेहसंमेलन",
    date: "2024",
    image: "/images/aandshala sahal 3.jpg",
  },
  {
    id: 26,
    titleEn: "Anand Picnic Tour 4",
    titleMr: "आनंद सहल ४",
    categoryEn: "Annual Function",
    categoryMr: "वार्षिक स्नेहसंमेलन",
    date: "2024",
    image: "/images/aandshala sahal 4.jpg",
  },
  {
    id: 27,
    titleEn: "Anand Picnic Tour 5",
    titleMr: "आनंद सहल ५",
    categoryEn: "Annual Function",
    categoryMr: "वार्षिक स्नेहसंमेलन",
    date: "2024",
    image: "/images/aandshala sahal 5.jpeg",
  },
  {
    id: 28,
    titleEn: "Joy Festival Gathering 9",
    titleMr: "आनंद मेळावा ९",
    categoryEn: "Joy Festival",
    categoryMr: "आनंद मेळावा",
    date: "2023",
    image: "/images/aandmelava 9.jpg",
  },
];

const categoryList = [
  { key: "all", labelEn: "All", labelMr: "सर्व" },
  { key: "anandshala", labelEn: "Senior Citizen Anandshala", labelMr: "ज्येष्ठ नागरिक आनंदशाळा" },
  { key: "melava", labelEn: "Joy Festival", labelMr: "आनंद मेळावा" },
  { key: "bhumipujan", labelEn: "Bhumipujan", labelMr: "भूमिपूजन" },
  { key: "construction", labelEn: "Construction", labelMr: "बांधकाम" },
  { key: "social", labelEn: "Social Work", labelMr: "सामाजिक कार्य" },
  { key: "annual", labelEn: "Annual Function", labelMr: "वार्षिक स्नेहसंमेलन" },
  { key: "dignitary", labelEn: "Dignitaries Visit", labelMr: "मान्यवर भेट" },
  { key: "special", labelEn: "Special Events", labelMr: "विशेष कार्यक्रम" },
];

const videoGalleryItems: VideoItem[] = [];

function Gallery() {
  const { isEn } = useLanguage();
  const store = useAdminStore();
  const [activeGalleryType, setActiveGalleryType] = useState<"photos" | "videos">("photos");
  const [selectedKey, setSelectedKey] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedCatObj = categoryList.find((c) => c.key === selectedKey);

  const activeGalleryImages =
    store.gallery && store.gallery.length > 0
      ? store.gallery.map((item, idx) => ({
          id: item.id || idx + 1,
          titleEn: item.caption || "Anandshala Photo",
          titleMr: item.caption || "आनंदशाळा फोटो",
          categoryEn: item.category?.[0] || "Senior Citizen Anandshala",
          categoryMr: item.category?.[0] || "ज्येष्ठ नागरिक आनंदशाळा",
          date: "२०२६",
          image: item.url,
        }))
      : galleryImages;

  const activeVideos = store.videos || [];

  const filteredImages =
    selectedKey === "all"
      ? activeGalleryImages
      : activeGalleryImages.filter((item) => {
          if (!selectedCatObj) return true;
          return (
            item.categoryMr.includes(selectedCatObj.labelMr) ||
            item.categoryEn.includes(selectedCatObj.labelEn)
          );
        });

  const closeImage = () => {
    setSelectedIndex(null);
    setZoomLevel(1);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : 0));
    setZoomLevel(1);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0,
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
  }, [selectedIndex, filteredImages.length]);

  const activePhoto = selectedIndex !== null ? filteredImages[selectedIndex] : null;

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
        .gallery-card-anim {
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
        .gallery-card-anim:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 45px rgba(236, 72, 153, 0.3), 0 0 25px rgba(139, 92, 246, 0.2);
          animation-duration: 2.5s;
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* ===== HEADING ===== */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-[#541A1A]">
            {isEn ? (
              <>
                <span className="text-pink-600">Anandshala</span> Gallery
              </>
            ) : (
              <>
                <span className="text-pink-600">आनंदशाळा</span> गॅलरी
              </>
            )}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            सांगलीच्या कुशीत, निसर्गरम्य १५ एकर परिसरात साकारलेल्या आनंदी क्षणांची सुंदर चित्रे व
            व्हिडीओ.
          </p>

          <div className="mt-6 w-24 h-1 rounded-full mx-auto bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500" />
        </div>

        {/* ===== 2 MAIN GALLERY MODE SWITCHER BUTTONS (PHOTOS vs VIDEOS) ===== */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={() => {
              setActiveGalleryType("photos");
              setSelectedVideo(null);
            }}
            className={`px-7 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-xs ${
              activeGalleryType === "photos"
                ? "bg-[#810B38] text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-rose-50 hover:text-[#810B38] border border-rose-200"
            }`}
          >
            {isEn ? "Photo Gallery" : "फोटो गॅलरी"}
          </button>

          <button
            onClick={() => {
              setActiveGalleryType("videos");
              setSelectedIndex(null);
            }}
            className={`px-7 py-3 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-xs ${
              activeGalleryType === "videos"
                ? "bg-[#810B38] text-white shadow-md"
                : "bg-white text-slate-700 hover:bg-rose-50 hover:text-[#810B38] border border-rose-200"
            }`}
          >
            {isEn ? "Video Gallery" : "व्हिडिओ गॅलरी"}
          </button>
        </div>

        {/* ===== VIEW 1: PHOTO GALLERY ===== */}
        {activeGalleryType === "photos" && (
          <div className="space-y-6">
            {/* CATEGORY FILTER BUTTONS */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
              {categoryList.map((category) => {
                const isActive = selectedKey === category.key;
                return (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedKey(category.key);
                      setSelectedIndex(null);
                    }}
                    className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-linear-to-r from-pink-600 to-purple-600 text-white shadow-md scale-105"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-pink-300 hover:text-pink-600 hover:shadow-sm"
                    }`}
                  >
                    {isEn ? category.labelEn : category.labelMr}
                  </button>
                );
              })}
            </div>

            {/* GALLERY CARDS GRID */}
            {filteredImages.length === 0 ? (
              <div className="text-center py-16 text-slate-400 font-semibold">
                {isEn ? "No photos available in this category." : "या श्रेणीत फोटो उपलब्ध नाहीत."}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    onClick={() => {
                      setSelectedIndex(index);
                      setZoomLevel(1);
                    }}
                    className="gallery-card-anim group cursor-pointer relative w-full h-65 sm:h-75 rounded-2xl overflow-hidden shadow-md"
                  >
                    <img
                      src={encodeURI(item.image)}
                      alt={isEn ? item.titleEn : item.titleMr}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/aandshala%20sahal%201.jpeg";
                      }}
                    />

                    <div className="absolute bottom-0 inset-x-0 h-20 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

                    <div className="absolute bottom-2.5 inset-x-3 text-white z-20">
                      <div className="flex items-center gap-1.5 text-pink-300 text-[11px] font-bold mb-0.5">
                        <Calendar size={12} />
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-white line-clamp-1 group-hover:text-pink-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        <HighlightText text={isEn ? item.titleEn : item.titleMr} />
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== VIEW 2: VIDEO GALLERY ===== */}
        {activeGalleryType === "videos" && (
          <div className="space-y-6">
            {activeVideos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeVideos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedVideo(item)}
                    className="bg-white border-2 border-pink-100 rounded-3xl p-4 space-y-3 shadow-md hover:border-pink-300 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-52">
                      <VideoCardThumbnail
                        embedUrl={item.embedUrl}
                        thumbnail={item.thumbnail}
                        title={item.title}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="size-14 rounded-full bg-pink-600/95 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform border-2 border-white">
                          <Play size={24} className="ml-1 fill-white" />
                        </div>
                      </div>
                      <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-pink-600 text-white text-[10px] font-black shadow-md">
                        {item.category || "विशेष मनोगत"}
                      </span>
                      <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold border border-white/20">
                        ⏱️ {item.duration || "०३:०० मिनिटे"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-[#1A05A2] group-hover:text-pink-600 transition-colors line-clamp-2">
                        <HighlightText text={item.title} />
                      </h3>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
                title="मागील फोटो"
              >
                <ChevronLeft size={24} className="sm:size-8" />
              </button>

              {/* 100% PURE PHOTO */}
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
                  alt=""
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
                title="पुढील फोटो"
              >
                <ChevronRight size={24} className="sm:size-8" />
              </button>
            </div>

            <div className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== VIDEO MODAL PLAYER ===== */}
      {selectedVideo &&
        typeof document !== "undefined" &&
        createPortal(
          <VideoModalPlayer selectedVideo={selectedVideo} onClose={() => setSelectedVideo(null)} />,
          document.body,
        )}
    </div>
  );
}

function VideoCardThumbnail({
  embedUrl,
  thumbnail,
  title,
}: {
  embedUrl: string;
  thumbnail?: string;
  title: string;
}) {
  const resolvedUrl = useResolvedVideoUrl(embedUrl);
  const isDirect =
    resolvedUrl.startsWith("data:") ||
    resolvedUrl.startsWith("blob:") ||
    resolvedUrl.startsWith("idb:") ||
    resolvedUrl.endsWith(".mp4") ||
    resolvedUrl.endsWith(".webm") ||
    resolvedUrl.endsWith(".mov") ||
    resolvedUrl.includes("firebasestorage.googleapis.com");

  if (isDirect && resolvedUrl) {
    return (
      <video
        src={resolvedUrl}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        muted
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={
        thumbnail && !thumbnail.includes("Screenshot") ? thumbnail : "/images/gallery imgage1.JPG"
      }
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/images/gallery imgage1.JPG";
      }}
    />
  );
}

function VideoModalPlayer({
  selectedVideo,
  onClose,
}: {
  selectedVideo: VideoItem;
  onClose: () => void;
}) {
  const resolvedUrl = useResolvedVideoUrl(selectedVideo.embedUrl);
  const isDirect =
    resolvedUrl.startsWith("data:") ||
    resolvedUrl.startsWith("blob:") ||
    resolvedUrl.startsWith("idb:") ||
    resolvedUrl.endsWith(".mp4") ||
    resolvedUrl.endsWith(".webm") ||
    resolvedUrl.endsWith(".mov") ||
    resolvedUrl.includes("firebasestorage.googleapis.com");

  return (
    <div
      className="fixed inset-0 z-999999 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border-2 border-pink-500 rounded-3xl max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 size-10 rounded-full bg-white/20 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer z-30"
        >
          <X size={20} />
        </button>

        <h3 className="text-base sm:text-lg font-black text-white pr-12 mb-3">
          <HighlightText text={selectedVideo.title} />
        </h3>

        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video w-full shadow-xl border border-white/10">
          {isDirect ? (
            <video src={resolvedUrl} controls autoPlay className="w-full h-full object-contain" />
          ) : (
            <iframe
              src={`${selectedVideo.embedUrl.includes("watch?v=") ? selectedVideo.embedUrl.replace("watch?v=", "embed/") : selectedVideo.embedUrl}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <p className="text-xs text-slate-300 font-semibold mt-3">{selectedVideo.desc}</p>
      </div>
    </div>
  );
}

export default Gallery;
