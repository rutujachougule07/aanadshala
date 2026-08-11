import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles, Heart, ShieldCheck, Award, ArrowRight, ArrowDown } from "lucide-react";

function QuoteCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative my-10 max-w-4xl mx-auto px-4"
    >
      {/* AMBIENT BACKGROUND GLOW BLOBS */}
      <div className="pointer-events-none absolute -top-16 -left-16 size-80 rounded-full bg-[#f472b6]/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 size-80 rounded-full bg-[#1A05A2]/15 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* MAIN LUXURY CARD CONTAINER */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#120838] via-[#1A0933] to-[#0A0D2A] text-white p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(26,5,162,0.3)] border border-[#f472b6]/30 transition-all duration-500">
        
        {/* DECORATIVE BACKGROUND GRID & SPARKLES */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-40" />
        <div className="pointer-events-none absolute top-6 right-8 opacity-20 hidden sm:block">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="size-1 rounded-full bg-[#f472b6]" />
            ))}
          </div>
        </div>

        {/* TOP BADGE */}
        <div className="flex justify-center relative z-10 mb-4">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/15 px-4 py-1.5 text-xs font-extrabold text-[#FF66B2] shadow-inner backdrop-blur-md"
          >
            <Sparkles className="size-3.5 text-[#FFD700] animate-spin" style={{ animationDuration: "6s" }} />
            <span>२५+ वर्षांचा वारसा</span>
          </motion.span>
        </div>

        {/* FLOATING 3D QUOTE ICON */}
        <div className="relative z-10 mb-4 flex justify-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="grid size-12 sm:size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f472b6] to-[#1A05A2] p-3 text-white shadow-[0_8px_20px_rgba(230,0,103,0.5)] border border-white/20"
          >
            <Quote className="size-6 sm:size-7 text-white" />
          </motion.div>
        </div>

        {/* MAIN HEADLINE */}
        <h2 className="relative z-10 text-center font-display text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight">
          <span className="text-white">प्रेम, विश्वास आणि</span>{" "}
          <span className="bg-gradient-to-r from-[#FF66B2] via-[#FFA366] to-[#66B2FF] bg-clip-text text-transparent">
            सेवांचा अखंड प्रवास
          </span>
        </h2>

        {/* ORNAMENT DIVIDER */}
        <div className="relative z-10 flex items-center justify-center gap-3 my-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#f472b6] to-transparent" />
          <span className="text-[#FF66B2] text-xs">❦</span>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#f472b6] to-transparent" />
        </div>

        {/* QUOTE TEXT */}
        <p className="relative z-10 max-w-2xl mx-auto text-center text-xs sm:text-sm md:text-base text-slate-200 font-medium leading-relaxed">
          “सन २००० पासून आजपर्यंत हजारो ज्येष्ठ नागरिकांच्या चेहऱ्यावर आनंद फुलविण्याचा आमचा प्रयत्न अखंड सुरू आहे. प्रत्येक दिवस नव्या आशेचा आणि प्रेमळ सहवासाचा प्रवास आहे.”
        </p>

        {/* AUTHOR BADGE */}
        <div className="relative z-10 text-center mt-3">
          <span className="text-[11px] sm:text-xs font-bold text-[#FF66B2]">
            — आनंदशाळा परिवार
          </span>
        </div>

        {/* 3 HIGHLIGHT STATS BADGES */}
        <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 text-center transition-all hover:bg-white/10 hover:border-[#f472b6]/40">
            <div className="flex justify-center mb-1 text-[#FF66B2]">
              <Heart className="size-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">५००+ आनंदी सदस्य</h4>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 text-center transition-all hover:bg-white/10 hover:border-[#f472b6]/40">
            <div className="flex justify-center mb-1 text-[#66B2FF]">
              <ShieldCheck className="size-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">२४×७ काळजी व सुरक्षा</h4>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 text-center transition-all hover:bg-white/10 hover:border-[#f472b6]/40">
            <div className="flex justify-center mb-1 text-[#FFD700]">
              <Award className="size-5" />
            </div>
            <h4 className="text-xs font-extrabold text-white">महाराष्ट्रातील प्रथम</h4>
          </div>
        </div>

        {/* DYNAMIC SECTION (EXPANDS ON CLICK) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative z-10 overflow-hidden"
            >
              <div className="rounded-2xl bg-white/10 border border-[#f472b6]/20 p-5 sm:p-6 backdrop-blur-sm text-center shadow-inner">
                <h3 className="text-lg font-bold text-[#FF66B2] mb-2">आमच्याबद्दल अधिक...</h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
                  आनंदशाळा हा केवळ एक प्रकल्प नसून, ज्येष्ठांसाठी तयार केलेले एक हक्काचे आणि प्रेमाचे घर आहे. येथे शारीरिक, मानसिक आणि भावनिक आरोग्याची विशेष काळजी घेतली जाते. भक्ती-सत्संग, योग-प्राणायाम, करमणूक आणि अद्ययावत वैद्यकीय सुविधेसह एक परिपूर्ण व आनंदी जीवनशैली आम्ही प्रदान करतो.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#66B2FF] font-medium bg-[#66B2FF]/10 px-3 py-1.5 rounded-full border border-[#66B2FF]/20">
                    <span className="size-2 rounded-full bg-[#66B2FF] animate-pulse"></span>
                    योग व ध्यान
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#FFD700] font-medium bg-[#FFD700]/10 px-3 py-1.5 rounded-full border border-[#FFD700]/20">
                    <span className="size-2 rounded-full bg-[#FFD700] animate-pulse"></span>
                    वैद्यकीय सुविधा
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SHIMMER CTA BUTTON */}
        <div className="relative z-10 mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#f472b6] via-[#D0005D] to-[#1A05A2] px-6 py-3 text-xs sm:text-sm font-black text-white shadow-[0_8px_20px_rgba(230,0,103,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_25px_rgba(230,0,103,0.6)] cursor-pointer"
          >
            <span>{isExpanded ? "माहिती लपवा" : "आमच्याबद्दल अधिक जाणून घ्या"}</span>
            {isExpanded ? (
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
            ) : (
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
            
            {/* SHIMMER GLOW ANIMATION */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default memo(QuoteCard);

