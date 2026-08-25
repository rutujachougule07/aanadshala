import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Users, Utensils, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/use-language";
import "@/components/AnandshalaStory.css";

export const SportsAboutSection: React.FC = () => {
  const { isEn } = useLanguage();

  const grandFacilities = [
    {
      badge: isEn ? "Physical Fitness" : "शारीरिक फिटनेस",
      icon: "💪",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-600",
      itemsMr: "अत्याधुनिक जिम 💪 सुविधा, योगा 🧘, झुंबा आणि डान्स स्टुडिओ.",
      itemsEn: "State-of-the-art Gym 💪 facilities, Yoga 🧘, Zumba, and Dance Studio.",
    },
    {
      badge: isEn ? "Athletics & Sports" : "ऍथलेटिक्स आणि खेळ",
      icon: "🏊",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-600",
      itemsMr: "भव्य स्विमिंग पूल 🏊, आंतरराष्ट्रीय दर्जाचे बॅडमिंटन 🏸 कोर्ट, पिकलबॉल कोर्ट आणि स्क्वॉश कोर्ट.",
      itemsEn: "Grand Swimming Pool 🏊, International standard Badminton 🏸 court, Pickleball court & Squash court.",
    },
    {
      badge: isEn ? "Indoor Games" : "इनडोअर गेम्स",
      icon: "🏓",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-600",
      itemsMr: "रोमांचक टेबल टेनिस 🏓 आणि स्नूकरची सोय.",
      itemsEn: "Exciting Table Tennis 🏓 and Snooker facility.",
    },
    {
      badge: isEn ? "Mental Peace" : "मानसिक शांती",
      icon: "🧘‍♀️",
      borderColor: "border-emerald-200",
      iconBg: "bg-emerald-600",
      itemsMr: "समर्पित मेडिटेशन (ध्यान) कक्ष.",
      itemsEn: "Dedicated Meditation & Peace Hall.",
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
            className="as-hero-title"
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
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-300/80 text-[#db2777] font-black text-xs sm:text-sm mb-3 shadow-xs">
              <Sparkles size={14} className="text-[#db2777]" />
              <span>{isEn ? "Grand Amenities Experience" : "सुविधांचा भव्य अनुभव"}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1a05a2] leading-tight">
              {isEn
                ? "25+ World-Class Sports & Fitness Amenities"
                : "एकाच छताखाली २५ हून अधिक जागतिक दर्जाच्या सुविधा"}
            </h3>
            <p className="text-black text-sm sm:text-base !font-[300] mt-2 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 300, color: "#000000" }}>
              {isEn
                ? "We provide more than 25 world-class fitness and sports amenities under one roof. Our major highlights include:"
                : "आम्ही एकाच छताखाली २५ हून अधिक जागतिक दर्जाच्या फिटनेस आणि खेळांच्या सुविधा उपलब्ध करून दिल्या आहेत. आमच्या प्रमुख सुविधांमध्ये यांचा समावेश आहे:"}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {grandFacilities.map((fac, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-3xl border ${fac.borderColor} shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-start text-left gap-3 relative overflow-hidden group`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`w-12 h-12 rounded-2xl ${fac.iconBg} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    {fac.icon}
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    {fac.badge}
                  </span>
                </div>

                <h4 className="font-black text-slate-900 text-lg sm:text-xl mt-2">
                  {fac.badge}
                </h4>

                <p className="text-black text-sm sm:text-base !font-[300] leading-relaxed" style={{ fontWeight: 300, color: "#000000" }}>
                  {isEn ? fac.itemsEn : fac.itemsMr}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SportsAboutSection;
