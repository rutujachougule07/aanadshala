import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/use-language";
import { useAdminStore } from "@/lib/admin-store";
import { HighlightText } from "@/components/HighlightText";
import "./AnandshalaStory.css";

import {
  Flower2,
  Landmark,
  HeartHandshake,
  Users,
  Target,
  Sparkles,
  Award,
  Trees,
  Calendar,
  ShieldCheck,
  Star,
  VolumeX,
  Wind,
  Sun
} from "lucide-react";

import buildingImage from "../assets/anandshala-building.png";

const AnandshalaStory: React.FC = () => {
  const { isEn } = useLanguage();
  const store = useAdminStore();
  const aboutData = store.aboutData || {};

  const mainStoryImage = aboutData.storyMainImage || "/images/imgever.JPG";
  const titleMr = aboutData.storyTitleMr || "प्रीतम आनंदशाळा : एक परिचय व संकल्पना";
  const titleEn = aboutData.storyTitleEn || "Preetam Anandshala : Introduction & Vision";
  const defaultMrText = "“प्रीतम सीनियर सिटिझन आनंदशाळा” ही सांगली, महाराष्ट्र, भारत येथे स्थित एक विशेष ज्येष्ठ नागरिक सेवा सुविधा आणि मनोरंजन केंद्र आहे. उद्योजक श्री. अभिनय जगन्नाथ कामाजी यांनी प्रीतम बिझनेस ग्रुपच्या अंतर्गत याची स्थापना केली आहे. ज्येष्ठ नागरिकांसाठी समर्पित केअरटेकर सेवा, सहवास आणि आरोग्यविषयक सहाय्य उपलब्ध करून देणारे एक प्रीमियम केंद्र म्हणून याची ओळख निर्माण झाली आहे.";
  const defaultEnText = "Preetam Senior Citizen Anandshala is a specialized elderly care facility and recreational centre located in Sangli, Maharashtra, India. Founded by entrepreneur Shri Abhinay Jagannath Kamaji under the Preetam Business Group, it brands itself as a premier destination offering dedicated senior citizen caretaker services, companionship, and healthcare support.";
  const descMr = aboutData.storyDescMr || defaultMrText;
  const descEn = aboutData.storyDescEn || defaultEnText;

  const stats = [
    {
      icon: <Trees className="as-stat-icon" />,
      title: isEn ? "Away from City Hustle-Bustle" : "१. शहराच्या गजबजाटापासून दूर",
      label: isEn
        ? "Serene, calm & peaceful environment away from city noise."
        : "शांत, निवांत आणि प्रसन्न वातावरण."
    },
    {
      icon: <VolumeX className="as-stat-icon" />,
      title: isEn ? "Zero Noise & Sound Pollution" : "२. ध्वनी व ध्वनिप्रदूषणापासून मुक्त",
      label: isEn
        ? "No noise and sound pollution – pure peace and soothing tranquility."
        : "शांतता आणि सुकून देणारे वातावरण."
    },
    {
      icon: <Wind className="as-stat-icon" />,
      title: isEn ? "Surrounded by Farms (AQI 30-45)" : "३. चहूबाजूंनी शेतीने वेढलेले",
      label: isEn
        ? "Surrounded by agricultural fields, pure air with an average AQI of 30 to 45."
        : "शुद्ध, स्वच्छ हवा आणि सरासरी AQI ३० ते ४५ इतका उत्तम हवेचा दर्जा."
    },
    {
      icon: <Sun className="as-stat-icon" />,
      title: isEn ? "Continuous Fresh Air Flow" : "४. सतत वाहणारा वारा",
      label: isEn
        ? "Wind keeps the air fresh and crisp, beats all stagnation."
        : "हवा ताजी, स्वच्छ आणि प्रसन्न ठेवतो; त्यामुळे हवेतील कोंदटपणा जाणवत नाही."
    }
  ];

  return (
    <section className="as-redesign-wrapper" id="anandshala-story">
      {/* Background Decorative Blur & Elements */}
      <div className="as-bg-glow-1" />
      <div className="as-bg-glow-2" />

      <div className="as-container">

        {/* ====================================
            1. SECTION HEADER
        ==================================== */}
        <div className="as-header-section">
          <motion.div
            className="as-badge-pill"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="as-badge-icon" />
            <span>{isEn ? "Our Legacy • Our Inspiration" : "आपली परंपरा • आमची प्रेरणा"}</span>
          </motion.div>

          <motion.h2
            className="as-hero-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {(() => {
              const text = isEn ? titleEn : titleMr;
              if (text.includes("आनंदशाळा")) {
                const parts = text.split("आनंदशाळा");
                return (
                  <>
                    {parts[0]}
                    <span className="text-[#db2777]">आनंदशाळा</span>
                    {parts.slice(1).join("आनंदशाळा")}
                  </>
                );
              }
              if (text.includes("Anandshala")) {
                const parts = text.split("Anandshala");
                return (
                  <>
                    {parts[0]}
                    <span className="text-[#db2777]">Anandshala</span>
                    {parts.slice(1).join("Anandshala")}
                  </>
                );
              }
              return text;
            })()}
          </motion.h2>

          <motion.div className="as-title-underline" />
        </div>

        {/* ====================================
            2. HERO STORY 2-COLUMN LAYOUT (Un-covered Photo + Compact Text)
        ==================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center my-6">
          {/* Left Side: Compact Story Text Card */}
          <motion.div
            className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xl flex flex-col items-start text-left gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles size={14} className="text-pink-600 animate-pulse" />
              {isEn ? <>ABOUT PREETAM <span className="text-[#db2777]">ANANDSHALA</span></> : <>प्रीतम <span className="text-[#db2777]">आनंदशाळा</span> परिचय</>}
            </span>

            <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
              <HighlightText text={isEn ? descEn : descMr} />
            </p>
          </motion.div>

          {/* Right Side: Clear Ceremony Photo Card (All faces 100% visible) */}
          <motion.div
            className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border border-pink-100 group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={mainStoryImage}
              alt={isEn ? "Preetam Anandshala Ceremony" : "प्रीतम आनंदशाळा सोहळा"}
              className="w-full h-[280px] sm:h-[340px] md:h-[380px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => { e.currentTarget.src = buildingImage; }}
            />
          </motion.div>
        </div>

        {/* ====================================
            3. STATS STRIP
        ==================================== */}
        <motion.div
          className="as-stats-strip"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((st, index) => (
            <div key={index} className="as-stat-card flex items-start gap-3 p-4 bg-white rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-all">
              <div className="as-stat-icon-wrapper shrink-0">
                {st.icon}
              </div>
              <div className="as-stat-text text-left">
                <h4 className="as-stat-title font-black text-sm sm:text-base text-[#1A05A2] leading-snug">{st.title}</h4>
                <p className="as-stat-label text-xs sm:text-sm font-bold text-slate-600 mt-1 leading-relaxed">{st.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AnandshalaStory;
