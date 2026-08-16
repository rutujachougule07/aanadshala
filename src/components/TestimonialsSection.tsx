import React, { useState } from "react";
import { useAdminStore, TestimonialItem } from "@/lib/admin-store";
import { useLanguage } from "@/lib/use-language";
import { Star, Play, X, Quote } from "lucide-react";
import { HighlightText } from "@/components/HighlightText";

export default function TestimonialsSection() {
  const store = useAdminStore();
  const { isEn } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<TestimonialItem | null>(null);

  // Filter approved testimonials
  const testimonials = store.testimonials.filter((t) => t.approved !== false);

  if (testimonials.length === 0) return null;

  const formatEmbedUrl = (url?: string): string => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/watch")) {
      const id = new URLSearchParams(url.split("?")[1]).get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-[#fffcfd] via-[#fff5f8] to-[#fdf2f5] text-slate-900 relative overflow-hidden font-sans border-t border-rose-100" id="testimonials">
      {/* AMBIENT LIGHT BLOBS */}
      <div className="pointer-events-none absolute top-10 left-10 size-[350px] rounded-full bg-pink-200/40 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 size-[350px] rounded-full bg-rose-200/40 blur-[130px]" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* HEADER AREA */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A05A2] tracking-tight drop-shadow-xs">
            {isEn ? (
              <>Member &amp; Guest <span className="text-[#db2777]">Video Testimonials</span></>
            ) : (
              <>मान्यवर व सभासदांचे <span className="text-[#db2777]">व्हिडिओ अभिप्राय</span></>
            )}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-extrabold leading-relaxed">
            {isEn
              ? "Heartfelt experiences & messages from famous actors, sports champions and members about Preetam Anandshala!"
              : "प्रीतम आनंदशाळा व स्पोर्ट्स क्लबबद्दल प्रसिद्ध अभिनेते, क्रीडापटू व सभासदांचे उत्स्फूर्त अनुभव व संदेश."}
          </p>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => {
            const embedUrl = formatEmbedUrl(item.videoUrl);
            const isVideo = Boolean(embedUrl);

            return (
              <div
                key={item.id}
                className="group relative bg-white border-2 border-rose-100 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-pink-300 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* VIDEO THUMBNAIL / EMBED PLAYER */}
                {isVideo ? (
                  <div className="relative w-full aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setActiveVideo(item)}>
                    {item.videoThumbnail ? (
                      <img
                        src={item.videoThumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose-900 via-pink-900 to-slate-900 grid place-items-center">
                        <span className="text-4xl">🎬</span>
                      </div>
                    )}
                    {/* PLAY BUTTON OVERLAY */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="size-16 rounded-full bg-gradient-to-r from-[#810B38] to-[#db2777] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform border-2 border-white/40">
                        <Play className="size-7 fill-white translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black text-amber-300 border border-white/20 flex items-center gap-1.5 shadow-md">
                      <span>▶️</span> {isEn ? "Watch Video" : "व्हिडिओ पहा"}
                    </span>
                  </div>
                ) : (
                  <div className="p-6 pb-2">
                    <Quote className="size-10 text-rose-300" />
                  </div>
                )}

                {/* TEXT CONTENT & SPEAKER INFO */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
                  {item.text && (
                    <p className="text-slate-700 text-xs sm:text-sm font-extrabold italic leading-relaxed line-clamp-3">
                      "{item.text}"
                    </p>
                  )}

                  <div className="pt-3 border-t border-rose-100 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#db2777] transition-colors">
                        {item.name.includes("गिरीश ओक") 
                          ? (isEn ? "Dr. Girish Oak (Actor & Brand Ambassador)" : "डॉ. गिरीश ओक (अभिनेते व ब्रँड ॲम्बेसेडर)")
                          : item.name}
                      </h4>
                      {item.role && (
                        <p className="text-xs font-bold text-[#810B38]">{item.role}</p>
                      )}
                    </div>

                    {/* STAR RATING */}
                    <div className="flex items-center gap-1 shrink-0">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULLSCREEN VIDEO LIGHTBOX MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[999999] bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-fade-in"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl p-4 sm:p-6 border-2 border-rose-200 shadow-2xl space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">{activeVideo.name}</h3>
                <p className="text-xs font-extrabold text-[#db2777]">{activeVideo.role}</p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="size-9 rounded-full bg-rose-100 hover:bg-rose-600 hover:text-white text-slate-700 font-extrabold flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-200 shadow-inner">
              <iframe
                src={`${formatEmbedUrl(activeVideo.videoUrl)}?autoplay=1`}
                title={activeVideo.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {activeVideo.text && (
              <p className="text-xs sm:text-sm text-slate-800 font-extrabold italic bg-rose-50/70 p-4 rounded-xl border border-rose-200">
                "{activeVideo.text}"
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
