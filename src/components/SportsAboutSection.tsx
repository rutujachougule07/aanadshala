import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Users, Utensils, ShieldCheck, Dumbbell, Gamepad2 } from "lucide-react";
import { useLanguage } from "@/lib/use-language";
import "@/components/AnandshalaStory.css";

export const SportsAboutSection: React.FC = () => {
  const { isEn } = useLanguage();

  const grandFacilities = [
    {
      badge: isEn ? "Physical Fitness" : "शारीरिक फिटनेस",
      title: isEn ? "Physical Fitness" : "शारीरिक फिटनेस",
      subtitle: isEn ? "Gym, Yoga & Dance Studio" : "जिम, योगा आणि डान्स स्टुडिओ",
      icon: <Dumbbell className="w-6 h-6 text-white" />,
      emoji: "💪",
      accentGlow: "hover:shadow-[0_16px_40px_rgba(244,114,182,0.25)]",
      topBorderColor: "from-pink-500 via-rose-500 to-pink-600",
      bgGradient: "from-pink-50/60 via-white to-rose-50/30",
      cardBorder: "border-pink-200/80 hover:border-pink-400",
      badgeBg: "bg-pink-100/90 text-pink-700 border-pink-300/80",
      iconBg: "bg-gradient-to-br from-pink-500 via-rose-500 to-rose-600 shadow-pink-500/30",
      itemsMr: "अत्याधुनिक जिम, योगा, झुंबा आणि डान्स स्टुडिओ सुविधा.",
      itemsEn: "State-of-the-art Gym, Yoga, Zumba, and Dance Studio facilities.",
      highlights: isEn
        ? ["Modern Gym 💪", "Yoga Studio 🧘", "Zumba Dance 💃", "Dance Hall 🕺"]
        : ["आधुनिक जिम 💪", "योगा स्टुडिओ 🧘", "झुंबा डान्स 💃", "डान्स हॉल 🕺"],
    },
    {
      badge: isEn ? "Athletics & Sports" : "ऍथलेटिक्स आणि खेळ",
      title: isEn ? "Athletics & Sports" : "ऍथलेटिक्स आणि खेळ",
      subtitle: isEn ? "Pool & International Courts" : "स्विमिंग पूल आणि कोर्ट्स",
      icon: <Trophy className="w-6 h-6 text-white" />,
      emoji: "🏊",
      accentGlow: "hover:shadow-[0_16px_40px_rgba(59,130,246,0.25)]",
      topBorderColor: "from-blue-500 via-indigo-500 to-blue-600",
      bgGradient: "from-blue-50/60 via-white to-indigo-50/30",
      cardBorder: "border-blue-200/80 hover:border-blue-400",
      badgeBg: "bg-blue-100/90 text-blue-700 border-blue-300/80",
      iconBg: "bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 shadow-blue-500/30",
      itemsMr: "भव्य स्विमिंग पूल, आंतरराष्ट्रीय दर्जाचे बॅडमिंटन, पिकलबॉल आणि स्क्वॉश कोर्ट.",
      itemsEn: "Grand Swimming Pool, International standard Badminton, Pickleball & Squash courts.",
      highlights: isEn
        ? ["Swimming Pool 🏊", "Badminton 🏸", "Pickleball 🎾", "Squash Court 🏸"]
        : ["स्विमिंग पूल 🏊", "बॅडमिंटन 🏸", "पिकलबॉल 🎾", "स्क्वॉश कोर्ट 🏸"],
    },
    {
      badge: isEn ? "Indoor Games" : "इनडोअर गेम्स",
      title: isEn ? "Indoor Games" : "इनडोअर गेम्स",
      subtitle: isEn ? "Table Tennis & Snooker" : "टेबल टेनिस आणि स्नूकर",
      icon: <Gamepad2 className="w-6 h-6 text-white" />,
      emoji: "🏓",
      accentGlow: "hover:shadow-[0_16px_40px_rgba(168,85,247,0.25)]",
      topBorderColor: "from-purple-500 via-fuchsia-500 to-purple-600",
      bgGradient: "from-purple-50/60 via-white to-fuchsia-50/30",
      cardBorder: "border-purple-200/80 hover:border-purple-400",
      badgeBg: "bg-purple-100/90 text-purple-700 border-purple-300/80",
      iconBg: "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-purple-600 shadow-purple-500/30",
      itemsMr: "रोमांचक टेबल टेनिस, स्नूकर, बिलियर्ड्स आणि इनडोअर गेम्स सोय.",
      itemsEn: "Exciting Table Tennis, Snooker, Billiards, and Indoor Gaming facility.",
      highlights: isEn
        ? ["Table Tennis 🏓", "Snooker 🎱", "Billiards 🎱", "Board Games 🎯"]
        : ["टेबल टेनिस 🏓", "स्नूकर सोय 🎱", "बिलियर्ड्स 🎱", "बोर्ड गेम्स 🎯"],
    },
    {
      badge: isEn ? "Mental Peace" : "मानसिक शांती",
      title: isEn ? "Mental Peace" : "मानसिक शांती",
      subtitle: isEn ? "Meditation & Tranquility" : "ध्यान आणि मन:शांती",
      icon: <Sparkles className="w-6 h-6 text-white" />,
      emoji: "🧘‍♀️",
      accentGlow: "hover:shadow-[0_16px_40px_rgba(16,185,129,0.25)]",
      topBorderColor: "from-emerald-500 via-teal-500 to-emerald-600",
      bgGradient: "from-emerald-50/60 via-white to-teal-50/30",
      cardBorder: "border-emerald-200/80 hover:border-emerald-400",
      badgeBg: "bg-emerald-100/90 text-emerald-700 border-emerald-300/80",
      iconBg: "bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 shadow-emerald-500/30",
      itemsMr: "समर्पित मेडिटेशन (ध्यान) कक्ष आणि निसर्गरम्य शांतता केंद्र.",
      itemsEn: "Dedicated Meditation & Peace Hall with serene natural ambiance.",
      highlights: isEn
        ? ["Meditation Hall 🧘‍♀️", "Peace Center 🕊️", "Yoga Hall 🧘", "Wellness Zone 🌿"]
        : ["ध्यान कक्ष 🧘‍♀️", "शांती केंद्र 🕊️", "योगा हॉल 🧘", "वेलनेस झोन 🌿"],
    },
  ];

  const eliteBenefits = [
    {
      icon: <Users className="w-5 h-5" />,
      title: isEn ? "10-Year Membership" : "१. १० वर्षांचे सदस्यत्व",
      label: isEn
        ? "10-Year membership for 4 members."
        : "४ सदस्यांसाठी १० वर्षांचे सदस्यत्व.",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: isEn ? "Unlimited Access" : "२. अमर्यादित प्रवेश",
      label: isEn
        ? "Unlimited access to all Sports & Fitness facilities."
        : "जवळपास सर्व क्रीडा व फिटनेस सुविधांचा अमर्यादित प्रवेश.",
    },
    {
      icon: <Utensils className="w-5 h-5" />,
      title: isEn ? "10% Special Discount" : "३. १०% विशेष सूट",
      label: isEn
        ? "10% discount on Food Court & Lawn Booking."
        : "रेस्टॉरंट, फूड कोर्ट आणि लॉन बुकिंगवर १०% सूट.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: isEn ? "Safe & Healthy Environment" : "४. सुरक्षित व आरोग्यदायी वातावरण",
      label: isEn
        ? "Safe, clean, and healthy environment."
        : "सुरक्षित, स्वच्छ आणि आरोग्यदायी वातावरण.",
    },
  ];

  return (
    <section className="as-redesign-wrapper" id="sports-about">
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
            <Trophy className="as-badge-icon" />
            <span>
              {isEn
                ? "About Preetam Sports & Fitness Club"
                : "आमच्याबद्दल — प्रीतम स्पोर्ट्स अँड फिटनेस क्लब"}
            </span>
          </motion.div>

          <motion.h2
            className="as-hero-title text-[37px] font-black"
            style={{ fontSize: "37px", fontWeight: 900 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isEn ? (
              <>
                Preetam <span className="text-[#db2777]">Sports &amp; Fitness Club</span>
              </>
            ) : (
              <>
                प्रीतम <span className="text-[#db2777]">स्पोर्ट्स अँड फिटनेस क्लब</span>
              </>
            )}
          </motion.h2>

          <motion.div className="as-title-underline" />
        </div>

        {/* ====================================
            2. HERO STORY 2-COLUMN LAYOUT
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-black text-xs sm:text-sm font-medium uppercase shadow-xs">
              <Sparkles size={14} className="text-black animate-pulse" />
              <span>
                {isEn ? (
                  <>ABOUT PREETAM SPORTS CLUB</>
                ) : (
                  <>प्रीतम स्पोर्ट्स अँड फिटनेस परिचय</>
                )}
              </span>
            </span>

            <div className="space-y-3.5 text-black text-base font-normal leading-relaxed">
              <p className="text-black bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200/80 shadow-inner text-base font-normal">
                {isEn
                  ? "Support India's first Senior Citizen Anandshala by joining membership of Preetam Sports & Fitness Club and receive divine blessings of elders."
                  : "आपण प्रीतम स्पोर्ट्स व फिटनेस क्लब ची मेंबरशिप घेऊन भारतातील प्रथम चालू होत असलेल्या जेष्ठ नागरिक आनंदशाळेला सपोर्ट सहकार्य करा व जेष्ठांचे शुभ आशीर्वाद मिळवा."}
              </p>
              <p className="text-black text-base font-normal leading-snug">
                {isEn
                  ? "Preetam Sports & Fitness Club is proudly ready to serve as the first and largest sports & fitness club in Sangli district! 🎉"
                  : "सांगली जिल्ह्यातील पहिले आणि सर्वात भव्य स्पोर्ट्स अँड फिटनेस क्लब म्हणून 'प्रीतम स्पोर्ट्स अँड फिटनेस क्लब' आपल्या सेवेत आनंदाने सज्ज आहे! 🎉"}
              </p>
              <p className="text-black text-base font-normal">
                {isEn
                  ? "Our aim is not merely running a gym, but creating a sanctuary of complete health, vigor, and joy. Envisioned by Shri Abhinay Jagannath Kamaji, we have built a destination where fitness, sports, and natural serenity blend harmoniously."
                  : "आमचा उद्देश केवळ व्यायामशाळा (Gym) चालवणे नाही, तर संपूर्ण आरोग्य, उत्साह आणि आनंदाचे एक केंद्र निर्माण करणे आहे. श्री. अभिनय जगन्नाथ कामाजी यांच्या दूरदृष्टीमुळे, आम्ही एक असे ठिकाण उभे केले आहे, जिथे फिटनेस, खेळ आणि नैसर्गिक शांतता यांचा अद्भुत संगम आहे."}
              </p>
            </div>
          </motion.div>

          {/* Right Side: Photo Card */}
          <motion.div
            className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white group max-h-[320px] sm:max-h-[360px] flex items-center justify-center bg-slate-100"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/images/sports img.png"
              alt={isEn ? "Preetam Sports & Fitness Club" : "प्रीतम स्पोर्ट्स अँड फिटनेस क्लब"}
              className="w-full h-56 sm:h-72 md:h-80 lg:h-[320px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.src = "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763184848892.jpg";
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-xs sm:text-sm font-black bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-center shadow-lg">
              {isEn
                ? "🏆 Preetam Sports & Fitness Club — Sangli"
                : "🏆 प्रीतम स्पोर्ट्स अँड फिटनेस क्लब — सांगली"}
            </div>
          </motion.div>
        </div>

        {/* ====================================
            3. PREETAM ELITE BENEFITS (4-CARD STRIP DIRECTLY BELOW TOP IMAGE CARD)
        ==================================== */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-rose-100 shadow-md mt-10 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {eliteBenefits.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-[#fafaf9] hover:bg-rose-50/60 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-left">
                <h4 className="font-black text-sm sm:text-base text-[#1A05A2] leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm !font-[300] text-black mt-1 leading-relaxed" style={{ fontWeight: 300, color: "#000000" }}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ====================================
            4. GRAND EXPERIENCE OF AMENITIES (सुविधांचा भव्य अनुभव)
        ==================================== */}
        <div className="mt-20 sm:mt-24 mb-12">
          <div className="text-center max-w-5xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-300/80 text-[#be185d] font-extrabold text-[14px] mb-3 shadow-xs" style={{ fontSize: "14px", fontWeight: 800, color: "#be185d" }}>
              <Sparkles size={14} className="text-[#be185d]" />
              <span>{isEn ? "Grand Amenities Experience" : "सुविधांचा भव्य अनुभव"}</span>
            </span>
            <h3 className="text-[37px] font-black text-[#1a05a2] leading-tight whitespace-normal md:whitespace-nowrap" style={{ fontSize: "37px", fontWeight: 900 }}>
              {isEn
                ? "25+ World-Class Sports & Fitness Amenities"
                : "एकाच छताखाली २५ हून अधिक जागतिक दर्जाच्या सुविधा"}
            </h3>
            <p className="text-black text-[16px] !font-[300] mt-2 leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "16px", fontWeight: 300, color: "#000000" }}>
              {isEn
                ? "We provide more than 25 world-class fitness and sports amenities under one roof. Our major highlights include:"
                : "आम्ही एकाच छताखाली २५ हून अधिक जागतिक दर्जाच्या फिटनेस आणि खेळांच्या सुविधा उपलब्ध करून दिल्या आहेत. आमच्या प्रमुख सुविधांमध्ये यांचा समावेश आहे:"}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {grandFacilities.map((fac, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative bg-white p-6 rounded-3xl border ${fac.cardBorder} shadow-md ${fac.accentGlow} transition-all duration-300 flex flex-col justify-between overflow-hidden text-left h-full`}
              >
                {/* Glowing Animated Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${fac.topBorderColor} opacity-90 group-hover:h-2 transition-all duration-300`} />

                {/* Shimmer Sweep Animation effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div className="flex-1 flex flex-col">
                  {/* Icon & Category Tag Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="relative">
                      {/* Icon container with shadow glow & emoji overlay */}
                      <div className={`w-12 h-12 rounded-2xl ${fac.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        {fac.icon}
                      </div>
                      <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-xs border border-slate-200">
                        {fac.emoji}
                      </span>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${fac.badgeBg} uppercase tracking-wider`}>
                      {fac.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-3 mb-2">
                    <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl group-hover:text-[#1a05a2] transition-colors duration-200">
                      {fac.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {fac.subtitle}
                    </p>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-slate-800 text-sm font-normal leading-relaxed mt-2.5 mb-4 flex-1">
                    {isEn ? fac.itemsEn : fac.itemsMr}
                  </p>
                </div>

                {/* Highlight Feature Badges Strip (Fixed 2-Column Grid Layout) */}
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-1.5">
                  {fac.highlights.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200/80 px-2 py-1.5 rounded-lg group-hover:border-slate-300 transition-colors duration-200 text-center truncate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#db2777]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── COMPLIMENTARY HAPPINESS HUB SECTION (कॉम्प्लिमेंटरी आनंदाचे केंद्र) ── */}
        <div className="mt-16 mb-12 max-w-5xl mx-auto">
          {/* Centered Section Header Outside Box */}
          <div className="text-center max-w-3xl mx-auto mb-8 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-[#be185d] font-extrabold text-[14px] mb-3 shadow-xs" style={{ fontSize: "14px", fontWeight: 800, color: "#be185d" }}>
              <Sparkles size={14} className="text-[#be185d]" />
              <span>{isEn ? "Complimentary Happiness Hub" : "कॉम्प्लिमेंटरी मोफत सुविधा"}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1a05a2] leading-tight mb-3">
              {isEn ? "Complimentary Happiness Hub" : "कॉम्प्लिमेंटरी आनंदाचे केंद्र:"}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "'Mukta', sans-serif" }}>
              {isEn
                ? "The biggest feature of Preetam Club is our belief in offering a 'Complete Experience'. Whichever membership you choose, you receive the following complimentary facilities:"
                : "प्रीतम क्लबचे सर्वात मोठे वैशिष्ट्य म्हणजे 'संपूर्ण अनुभव' देण्यावर आमचा विश्वास आहे. तुम्ही कोणत्याही एका सुविधेची किंवा सर्वांची मेंबरशिप घेतल्यास, तुम्हाला खालील अतिरिक्त आणि मोफत सुविधा (Complimentary) मिळतात:"}
            </p>
          </div>

          {/* Cards Table Container Box */}
          <div className="ps-complimentary-wrapper bg-linear-to-br from-pink-50/90 via-purple-50/40 to-rose-50/90 border-2 border-pink-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
            {/* Background Decorative Orbs */}
            <div className="absolute -bottom-10 -left-10 size-48 bg-pink-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-10 -right-10 size-48 bg-purple-400/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 text-left space-y-6">

            {/* 3 Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
              {/* Card 1: Library */}
              <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-purple-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-black shrink-0 shadow-xs border border-purple-200">
                    📚
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {isEn ? "Library" : "वाचनालय (Library)"}
                    </h4>
                    <span className="text-xs font-bold text-purple-600">
                      {isEn ? "Quiet Reading Space" : "शांत अभ्यासिक जागा"}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed" style={{ fontFamily: "'Mukta', sans-serif" }}>
                  {isEn
                    ? "A peaceful corner to satisfy your hunger for knowledge with books & magazines."
                    : "ज्ञानाची भूक भागवण्यासाठी व वाचनाच्या आवडीसाठी शांत कोपरा."}
                </p>
              </div>

              {/* Card 2: Music Hall */}
              <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-rose-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl font-black shrink-0 shadow-xs border border-rose-200">
                    🎼
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {isEn ? "Music Instruments Hall" : "संगीत उपकरण हॉल"}
                    </h4>
                    <span className="text-xs font-bold text-rose-600">
                      {isEn ? "Musical Platform" : "संगीत कलाकारांसाठी"}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed" style={{ fontFamily: "'Mukta', sans-serif" }}>
                  {isEn
                    ? "A vibrant platform to nurture the artist within you with instruments."
                    : "तुमच्यातील कलाकाराला वाव देण्यासाठी व संगीताचा रियाझ करण्यासाठी विशेष व्यासपीठ."}
                </p>
              </div>

              {/* Card 3: Indoor Sitting Games */}
              <div className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-emerald-200/80 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-black shrink-0 shadow-xs border border-emerald-200">
                    ♟️
                  </div>
                  <div>
                    <h4 className="font-black text-[#1A05A2] text-base sm:text-lg">
                      {isEn ? "Indoor Sitting Games Hall" : "बैठे खेळ हॉल"}
                    </h4>
                    <span className="text-xs font-bold text-emerald-600">
                      {isEn ? "Recreation & Mind Games" : "कॅरम, बुद्धिबळ सोय"}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed" style={{ fontFamily: "'Mukta', sans-serif" }}>
                  {isEn
                    ? "Fun and recreation through carrom, chess, and board games with friends."
                    : "आनंददायी विरंगुळ्यासाठी कॅरम, बुद्धिबळ यांसारखे विविध बैठे खेळ."}
                </p>
              </div>
            </div>

            {/* Bottom Inspiring Tagline Card */}
            <div className="bg-linear-to-r from-[#810B38] via-[#a21249] to-[#db2777] text-white p-5 rounded-2xl shadow-lg border border-pink-300/30 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl shrink-0">
                🏃‍♂️
              </div>
              <p className="text-xs sm:text-sm md:text-base font-semibold leading-relaxed" style={{ fontFamily: "'Mukta', sans-serif" }}>
                {isEn
                  ? "Preetam Sports & Fitness Club inspires every citizen of Sangli to live a healthy, happy, and fulfilling life. Join our family today and start your fitness journey with joy!"
                  : "प्रीतम स्पोर्ट्स अँड फिटनेस क्लब हे सांगलीच्या प्रत्येक नागरिकाला आरोग्य, आनंद आणि एक समाधानी जीवन जगण्यासाठी प्रेरित करते. आजच आमच्या कुटुंबाचा भाग व्हा आणि आपल्या फिटनेसचा प्रवास आनंदाने सुरू करा!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default SportsAboutSection;

