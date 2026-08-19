import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Crown, Dumbbell, Waves, Trophy, Footprints, Star } from "lucide-react";
import "./SportsSection.css";
import "./ActivityHallsSection/ActivityHallsSection.css";
import "@/components/journey-v2/journey.css";
import SportsPricingSection from "./SportsPricingSection/SportsPricingSection";
import { site, sportsClub } from "../lib/site-info";
import { useLanguage } from "@/lib/use-language";

const sportsMilestonesData = [
  {
    id: 1,
    stepNoMr: "१",
    stepNoEn: "1",
    titleMr: "१० वर्षांचे कौटुंबिक सभासदत्व (Family Membership)",
    titleEn: "10 Years Family Membership",
    descMr: "कुटुंबातील ४ सदस्यांसाठी सलग १० वर्षे स्पोर्ट्स क्लबच्या सर्व क्रीडा व फिटनेस सुविधांचा अमर्याद आनंद.",
    descEn: "10 Years unlimited access for 4 family members across all sports & club amenities.",
    color: "#db2777",
    bgColor: "#FDE8F3",
    borderColor: "#FCCEE4",
    nodeIcon: Crown,
    cardIcon: Crown,
    side: "left",
  },
  {
    id: 2,
    stepNoMr: "२",
    stepNoEn: "2",
    titleMr: "२००० चौ. फूट भव्य प्रिमियम जिम (Premium Gym)",
    titleEn: "2000 sq.ft. Premium Gym",
    descMr: "अत्याधुनिक व्यायाम साहित्याने सुसज्ज कार्डिओ झोन, वेट ट्रेनिंग आणि पर्सनल ट्रेनर्सचे उत्तम मार्गदर्शन.",
    descEn: "State-of-the-art machines, cardio zone and functional training areas.",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    nodeIcon: Dumbbell,
    cardIcon: Dumbbell,
    side: "right",
  },
  {
    id: 3,
    stepNoMr: "३",
    stepNoEn: "3",
    titleMr: "तापमान-नियंत्रित ऑलिंपिक स्विमिंग पूल",
    titleEn: "Temperature-Controlled Swimming Pool",
    descMr: "संपूर्ण शरीराचा व्यायाम, फिटनेस, जलतरण सराव आणि तणावमुक्तीसाठी सुरक्षित व शुद्ध पाण्याचा पूल.",
    descEn: "Designed for full-body conditioning and stress relief pool.",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    borderColor: "#BAE6FD",
    nodeIcon: Waves,
    cardIcon: Waves,
    side: "left",
  },
  {
    id: 4,
    stepNoMr: "४",
    stepNoEn: "4",
    titleMr: "जागतिक दर्जाचे इनडोअर क्रीडा संकुल (Sports Courts)",
    titleEn: "Professional Sports Courts",
    descMr: "आंतरराष्ट्रीय मानकांचे इनडोअर बॅडमिंटन, स्क्वॅश, स्नूकर आणि टेबल टेनिस खेळांसाठी उत्कृष्ट कोर्ट्स.",
    descEn: "International standard Badminton, Squash and Table Tennis courts.",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    borderColor: "#FFEDD5",
    nodeIcon: Trophy,
    cardIcon: Trophy,
    side: "right",
  },
  {
    id: 5,
    stepNoMr: "५",
    stepNoEn: "5",
    titleMr: "निसर्गरम्य आउटडोअर फिटनेस झोन",
    titleEn: "Outdoor Fitness Zone",
    descMr: "मोकळ्या हवेतील जॉगिंग ट्रॅक, ओपन एअर जिम आणि फंक्शनल फिटनेस गार्डनची प्रसन्न सुविधा.",
    descEn: "Jogging Track & Fitness Garden with functional training rigs.",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    nodeIcon: Footprints,
    cardIcon: Footprints,
    side: "left",
  },
  {
    id: 6,
    stepNoMr: "६",
    stepNoEn: "6",
    titleMr: "विशेष व्ही.आय.पी. क्लब प्राधान्य (VIP Priority Access)",
    titleEn: "Priority Club Access",
    descMr: "क्लबतर्फे आयोजित सर्व क्रीडा स्पर्धा, आरोग्य कार्यशाळा आणि सांस्कृतिक उपक्रमांमध्ये विशेष प्राधान्य प्रवेश.",
    descEn: "Priority access for all club events, tournaments and workshops.",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    nodeIcon: Star,
    cardIcon: Star,
    side: "right",
  },
];

interface FacilityDetail {
  id: string;
  titleMr: string;
  titleEn: string;
  subMr: string;
  subEn: string;
  descMr: string;
  descEn?: string;
  img: string;
  icon: string;
  featuresMr: string[];
  featuresEn?: string[];
  timingMr: string;
  timingEn?: string;
  theme?: string;
}

const facilityItems: FacilityDetail[] = [
  {
    id: "gym",
    icon: "🏋️‍♂️",
    titleMr: "जिम & बॉडीबिल्डिंग",
    titleEn: "Gym & Bodybuilding Studio",
    subMr: "आधुनिक उपकरणांसह प्रशिक्षित ट्रेनर्स",
    subEn: "Certified trainers with modern fitness equipment",
    descMr: "जागतिक दर्जाची फिटनेस उपकरणे, पूर्णतः वातानुकूलित परिसर आणि वैयक्तिक प्रमाणित ट्रेनर्सच्या मार्गदर्शनाखाली बॉडीबिल्डिंग व फिटनेस ट्रेनिंग.",
    descEn: "World-class fitness equipment, fully air-conditioned campus, and bodybuilding & fitness training guided by certified personal trainers.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763184848892.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:३०",
    timingEn: "6:00 AM to 9:30 PM",
    featuresMr: [
      "प्रमाणित पर्सनल ट्रेनर्स",
      "वातानुकूलित (AC) प्रिमियम परिसर",
      "कार्डिओ व व्हेट ट्रेनिंग मशीन्स",
      "विशेष डायट व पोषण आहार मार्गदर्शन"
    ],
    featuresEn: [
      "Certified personal trainers",
      "Air-conditioned (AC) premium studio",
      "Cardio & weight training machinery",
      "Personalized diet & nutrition guidance"
    ]
  },
  {
    id: "swimming",
    icon: "🏊‍♂️",
    titleMr: "स्विमिंग पूल",
    titleEn: "Olympic Standard Swimming Pool",
    subMr: "ऑलिंपिक मानकांचा स्वच्छ पूल",
    subEn: "Clean Olympic standard filtered pool",
    descMr: "ऑलिंपिक मानकांनुसार बनवलेला स्वच्छ, २५ मीटरचा शुद्ध पाण्याचा पोहण्याचा तलाव. महिला व पुरुषांसाठी सुरक्षित व स्वतंत्र बॅचेस.",
    descEn: "Clean 25-meter purified water swimming pool built according to Olympic standards. Safe and dedicated separate batches for men and women.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1762243460172.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ८:००",
    timingEn: "6:00 AM to 8:00 PM",
    featuresMr: [
      "ऑलिंपिक स्टँडर्ड फिल्टर्ड पाणी",
      "सुरक्षा गार्ड व एक्सपर्ट लाइफगार्ड",
      "स्वतंत्र चेंजिंग रूम व हॉट शॉवर",
      "लहान मुले व बिगिनर्स साठी विशेष ट्रेनिंग"
    ],
    featuresEn: [
      "Olympic standard purified filtered water",
      "Safety guards & expert lifeguards",
      "Separate changing rooms & hot showers",
      "Special coaching for kids & beginners"
    ]
  },
  {
    id: "badminton",
    icon: "🏸",
    titleMr: "इनडोअर बॅडमिंटन",
    titleEn: "Indoor Badminton Arena",
    subMr: "आंतरराष्ट्रीय मानकांच्या कोर्टसह",
    subEn: "International standard wooden courts",
    descMr: "लाकडी सिंथेटिक मॅटिंग व आय-प्रोटेक्ट LED लाईटिंगसह सुसज्ज इनडोअर बॅडमिंटन कोर्ट. सर्व वयोगटातील लोकांसाठी खेळण्याची व सराव करण्याची उत्तम सोय.",
    descEn: "Indoor badminton courts with wooden synthetic matting and eye-protective LED lighting. Great venue for play and practice for all age groups.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763203444303.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "प्र्रीमियम वूडन सिंथेटिक मॅटिंग",
      "प्रोफेशनल अँटी-ग्लेअर LED लाईटिंग",
      "रॅकेट व कॉक उपलब्ध",
      "टूर्नामेंट स्टँडर्ड कोर्ट्स"
    ],
    featuresEn: [
      "Premium wooden synthetic matting",
      "Professional anti-glare LED lighting",
      "Rackets & shuttlecocks available",
      "Tournament-standard courts"
    ]
  },
  {
    id: "pickleball",
    icon: "🏓",
    titleMr: "पिकलबॉल",
    titleEn: "Pickleball Court",
    subMr: "नवीन खेळ, मजा आणि फिटनेस",
    subEn: "Modern trending sport for total fitness",
    descMr: "जगातील सर्वात वेगाने लोकप्रिय होणारा पिकलबॉल खेळ! कुटुंबासोबत व मित्रांसोबत खेळण्यासाठी सांगलीतील भव्य पिकलबॉल कोर्ट.",
    descEn: "Pickleball - the fastest growing sport in the world! A grand court in Sangli to play and enjoy with family and friends.",
    img: "/images/pickleball-court.png",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "सांगलीतील पहिले भव्य पिकलबॉल कोर्ट",
      "सोपा व आरोग्यदायी फिटनेस खेळ",
      "पॅडल्स व बॉल्स उपलब्ध",
      "सर्व वयोगटांसाठी अत्यंत सोयीचे"
    ],
    featuresEn: [
      "Sangli's 1st grand pickleball court",
      "Easy, fun & healthy fitness sport",
      "Paddles & balls available",
      "Extremely suitable for all ages"
    ]
  },
  {
    id: "yoga",
    icon: "🧘",
    titleMr: "योग & ध्यान कक्ष",
    titleEn: "Yoga & Meditation Studio",
    subMr: "शारीरिक व मानसिक आरोग्य संतुलन",
    subEn: "Physical and mental health harmony",
    descMr: "शांत, प्रसन्न व निसर्गरम्य वातावरणात योगाभ्यास, प्राणायाम व ध्यानधारणा. अनुभवी योगशिक्षकांकडून दररोज सकाळी व संध्याकाळी मार्गदर्शन.",
    descEn: "Yoga practice, Pranayama, and Meditation in a calm, serene natural environment. Daily morning and evening guidance by experienced teachers.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763188841664.jpg",
    timingMr: "सकाळी ६:३० ते ९:०० व सायं. ५ ते ७",
    timingEn: "6:30 AM to 9:00 AM & 5:00 PM to 7:00 PM",
    featuresMr: [
      "शांत व प्रसन्न वातानुकूलित हॉल",
      "प्राणायाम व योगासने वर्ग",
      "मानसिक ताणतणाव व BP मुक्ती",
      "ज्येष्ठ नागरिकांसाठी विशेष सोपा योगा"
    ],
    featuresEn: [
      "Peaceful and pleasant AC hall",
      "Pranayama and yoga classes",
      "Mental stress and BP relief",
      "Special easy yoga for senior citizens"
    ]
  },
  {
    id: "zumba",
    icon: "💃",
    titleMr: "झुंबा & डान्स क्लास",
    titleEn: "Zumba & Fitness Dance",
    subMr: "एनर्जेटिक सेशन्स आणि प्रोफेशनल कोडिंग",
    subEn: "High energy zumba and dance workout",
    descMr: "संगीताच्या तालावर एनर्जेटिक झुंबा व फिटनेस डान्स सेशन्स. वजन नियंत्रित ठेवण्यासाठी व आनंदाने कॅलरी बर्न करण्यासाठी सर्वोत्तम उपक्रम.",
    descEn: "Energetic Zumba and fitness dance sessions to music. The best way to manage weight and burn calories happily.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763357581614.png",
    timingMr: "सकाळी ७:०० ते ८:०० व सायं. ६ ते ७",
    timingEn: "7:00 AM-8:00 AM & 6:00 PM-7:00 PM",
    featuresMr: [
      "प्रोफेशनल सर्टीफाइड झुंबा ट्रेनर्स",
      "हाय-फाय साऊंड व म्युझिक सिस्टीम",
      "मजबूत कार्डिओ वर्कआउट",
      "उत्साही व आनंदी वातावरण"
    ],
    featuresEn: [
      "Professional certified Zumba trainers",
      "Hi-fi sound and music system",
      "Strong cardio workout",
      "Energetic and joyful environment"
    ]
  },
  {
    id: "squash",
    icon: "🎾",
    titleMr: "स्क्वॅश कोर्ट",
    titleEn: "Squash Arena",
    subMr: "आंतरराष्ट्रीय मानकांच्या स्वच्छ कोर्ट",
    subEn: "International glass-back squash court",
    descMr: "आंतरराष्ट्रीय ग्लास-बॅक मानकांचे स्क्वॅश कोर्ट. जलद हालचाली, स्टॅमिना व उच्च फिटनेससाठी अतिशय उपयुक्त.",
    descEn: "International glass-back standard squash court. Highly useful for quick movements, stamina, and high fitness.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763184843273.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "ग्लास-बॅक आंतरराष्ट्रीय मानकांचे कोर्ट",
      "स्पेशल वूडन स्प्रंग फ्लोअरिंग",
      "रॅकेट व इक्विपमेंट सोय",
      "उच्च फिटनेस व स्टॅमिना वर्कआउट"
    ],
    featuresEn: [
      "Glass-back international standard court",
      "Special wooden sprung flooring",
      "Rackets and equipment available",
      "High fitness and stamina workout"
    ]
  },
  {
    id: "snooker",
    icon: "🎱",
    titleMr: "स्नूकर & पूल लाउंज",
    titleEn: "Snooker & Pool Lounge",
    subMr: "एकग्रता वाढवणारा स्नूकर आणि पूल टेबल",
    subEn: "Concentration boosting snooker and pool table",
    descMr: "प्रीमियम वूलन क्लोथवर आंतरराष्ट्रीय मानकांचे स्नूकर व पूल टेबल्स. वातानुकूलित लाउंजमध्ये एकाग्रता व मनोरंजनाचा आनंद.",
    descEn: "International standard snooker and pool tables on premium woolen cloth. Enjoy concentration and entertainment in our AC lounge.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763357638129.jpg",
    timingMr: "सकाळी १०:०० ते रात्री ९:००",
    timingEn: "10:00 AM to 9:00 PM",
    featuresMr: [
      "आंतरराष्ट्रीय मानकांचे स्नूकर टेबल्स",
      "प्रीमियम ८-बॉल पूल टेबल",
      "एसी लाउंज व सोफा सीटिंग",
      "मित्र-मैत्रिणींसोबत रिलॅक्सिंग वेळ"
    ],
    featuresEn: [
      "International standard snooker tables",
      "Premium 8-ball pool table",
      "AC lounge and sofa seating",
      "Relaxing time with friends"
    ]
  }
];

export default function SportsSection() {
  const { isEn } = useLanguage();
  const [selectedFacility, setSelectedFacility] = useState<FacilityDetail | null>(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", interest: "sports", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitReg = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  useEffect(() => {
    if (selectedFacility || showRegModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedFacility, showRegModal]);

  return (
    <div className="sp-v3-root">

      <div className="sp-container">
        {/* ══════════════════════════════════════════════════════════════
            2. HERO SECTION
           ══════════════════════════════════════════════════════════════ */}
        <section className="sp-clean-sec">
          {/* TOP LUXURY BANNER IMAGE WITH CLEAN LOOK */}
          <div className="sp-exact-banner-box">
            <div className="sp-banner-glow-orb-left" />
            <div className="sp-banner-glow-orb-right" />

            <img
              src="/images/sports_hero_bg.png"
              alt="Preetam Sports Complex Sangli Aerial View"
              className="sp-exact-banner-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763184848892.jpg";
              }}
            />
          </div>

        </section>

        {/* ══════════════════════════════════════════════════════════════
            SPORTS CLUB MILESTONES (EXACT VERTICAL TIMELINE STRUCTURE)
           ══════════════════════════════════════════════════════════════ */}
        <section className="journey-exact-v2 my-8 sm:my-12" id="sports-milestones">
          {/* Background Dot Grid */}
          <div className="journey-dot-grid" />

          <div className="journey-exact-container">
            {/* HEADER */}
            <div className="journey-exact-header text-center max-w-3xl mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="journey-exact-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#810B38] font-black text-xs sm:text-sm mb-3 shadow-xs"
              >
                <span>🏆</span>
                <span>
                  {isEn ? (
                    <>Preetam Sports Club — Key Milestones</>
                  ) : (
                    <>प्रीतम स्पोर्ट्स क्लब — ६ प्रमुख टप्पे</>
                  )}
                </span>
                <span>🏆</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="journey-exact-title text-[22px] sm:text-[32px] md:text-[38px] font-black text-[#0044cc] leading-tight text-center"
              >
                {isEn ? "Sports Club Milestones & Highlights" : "स्पोर्ट्स क्लबचे ६ प्रमुख टप्पे"}
              </motion.h2>

              {/* Ornamental Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="journey-ornament flex items-center justify-center gap-3 mt-3"
              >
                <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#0044cc]"></span>
                <span className="text-[#0044cc] font-black text-xs">❖</span>
                <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#0044cc]"></span>
              </motion.div>
            </div>

            {/* TIMELINE GRID */}
            <div className="journey-exact-timeline relative">
              {/* Center Vertical Dashed Line */}
              <div className="journey-center-line">
                <div className="line-dashed" />
                <div className="line-end-circle" />
              </div>

              {sportsMilestonesData.map((item) => {
                const Icon = item.cardIcon;
                const NodeIcon = item.nodeIcon;
                const isLeft = item.side === "left";
                const title = isEn ? item.titleEn : item.titleMr;
                const description = isEn ? item.descEn : item.descMr;
                const stepNo = isEn ? item.stepNoEn : item.stepNoMr;

                return (
                  <div
                    key={item.id}
                    className={`journey-row-item ${isLeft ? "row-left" : "row-right"}`}
                  >
                    {isLeft ? (
                      <>
                        {/* LEFT CARD */}
                        <motion.div
                          initial={{ opacity: 0, x: -50, y: 20 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          whileHover={{ y: -6, scale: 1.015 }}
                          className="journey-card-box left-box"
                        >
                          {/* Step Number Badge */}
                          <div
                            className="card-date-badge"
                            style={{ backgroundColor: item.color }}
                          >
                            {isEn ? `Step ${stepNo}` : `टप्पा ${stepNo}`}
                          </div>

                          <div className="card-inner flex items-start justify-between gap-4 p-5 sm:p-6 bg-white rounded-3xl shadow-xl border-2 border-slate-100">
                            <div className="card-text-content space-y-2 text-left">
                              <h3 className="card-title text-lg sm:text-xl font-black text-slate-900 leading-snug">
                                {item.id}. {title}
                              </h3>
                              <p className="card-desc text-xs sm:text-sm text-slate-700 font-extrabold leading-relaxed">
                                {description}
                              </p>
                            </div>

                            {/* Floating Icon Box */}
                            <div
                              className="card-icon-wrapper p-3.5 rounded-2xl shrink-0 shadow-md"
                              style={{ backgroundColor: item.bgColor }}
                            >
                              <Icon className="size-6 sm:size-7" style={{ color: item.color }} />
                            </div>
                          </div>

                          <div
                            className="arrow-right"
                            style={{ borderLeftColor: item.color }}
                          />
                        </motion.div>

                        {/* Center Node */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="center-node-box relative"
                          style={{ borderColor: item.color }}
                        >
                          <NodeIcon className="size-5 sm:size-6" style={{ color: item.color }} />
                        </motion.div>

                        <div className="journey-row-empty" />
                      </>
                    ) : (
                      <>
                        <div className="journey-row-empty" />

                        {/* Center Node */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="center-node-box relative"
                          style={{ borderColor: item.color }}
                        >
                          <NodeIcon className="size-5 sm:size-6" style={{ color: item.color }} />
                        </motion.div>

                        {/* RIGHT CARD */}
                        <motion.div
                          initial={{ opacity: 0, x: 50, y: 20 }}
                          whileInView={{ opacity: 1, x: 0, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          whileHover={{ y: -6, scale: 1.015 }}
                          className="journey-card-box right-box"
                        >
                          {/* Step Number Badge */}
                          <div
                            className="card-date-badge"
                            style={{ backgroundColor: item.color }}
                          >
                            {isEn ? `Step ${stepNo}` : `टप्पा ${stepNo}`}
                          </div>

                          <div className="card-inner flex items-start justify-between gap-4 p-5 sm:p-6 bg-white rounded-3xl shadow-xl border-2 border-slate-100">
                            {/* Floating Icon Box */}
                            <div
                              className="card-icon-wrapper p-3.5 rounded-2xl shrink-0 shadow-md"
                              style={{ backgroundColor: item.bgColor }}
                            >
                              <Icon className="size-6 sm:size-7" style={{ color: item.color }} />
                            </div>

                            <div className="card-text-content space-y-2 text-left flex-1">
                              <h3 className="card-title text-lg sm:text-xl font-black text-slate-900 leading-snug">
                                {item.id}. {title}
                              </h3>
                              <p className="card-desc text-xs sm:text-sm text-slate-700 font-extrabold leading-relaxed">
                                {description}
                              </p>
                            </div>
                          </div>

                          <div
                            className="arrow-left"
                            style={{ borderRightColor: item.color }}
                          />
                        </motion.div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SPORTS RATE CARD TABLE (अधिकृत दरपत्रक)
           ══════════════════════════════════════════════════════════════ */}
        <SportsPricingSection />

        {/* ══════════════════════════════════════════════════════════════
            3. "आमच्या सुविधा" 8 CARDS GRID
           ══════════════════════════════════════════════════════════════ */}
        <section className="sp-facilities-sec">
          <div className="sp-sec-header text-center">
            <div className="sp-sec-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0044cc] font-black text-xs sm:text-sm mb-3 shadow-xs">
              {isEn ? "✨ Premium Amenities" : "✨ प्रिमियम सोयी सुविधा"}
            </div>
            <h2 className="text-[22px] sm:text-[32px] md:text-[38px] font-black text-[#0044cc] leading-tight text-center my-2">
              {isEn ? "Our Facilities" : "आमच्या सुविधा"}
            </h2>
          </div>

          <div className="ah-grid">
            {facilityItems.map((item, index) => {
              const isActive = selectedFacility?.id === item.id;
              const themes = ["theme-blue", "theme-pink", "theme-purple"];
              const themeClass = item.theme || themes[index % 3];
              const numStr = (index + 1).toString().padStart(2, "0");
              const formatNumStr = isEn ? numStr : numStr.replace(/0/g, "०").replace(/1/g, "१").replace(/2/g, "२").replace(/3/g, "३").replace(/4/g, "४").replace(/5/g, "५").replace(/6/g, "६").replace(/7/g, "७").replace(/8/g, "८").replace(/9/g, "९");

              return (
                <div
                  key={item.id}
                  className={`ah-card-clean ${themeClass} ${isActive ? "active-card ring-4 ring-pink-500" : ""}`}
                  onClick={() => setSelectedFacility(item)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ah-card-num">
                    {formatNumStr}
                  </div>

                  <div className="ah-card-img-wrapper">
                    <img
                      src={item.img}
                      alt={isEn ? item.titleEn : item.titleMr}
                      className="ah-card-img"
                    />
                  </div>

                  <div className="ah-card-content">
                    <div className="ah-card-icon text-2xl font-black shadow-md">
                      {item.icon}
                    </div>

                    <h3 className="ah-card-title">
                      {isEn ? item.titleEn : item.titleMr}
                    </h3>

                    <p className="text-xs text-slate-500 font-extrabold mb-1">
                      {isEn ? item.subEn : item.subMr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── ADD-ON FACILITIES (ACTIVITY ZONE) SECTION ── */}
          <div className="ps-addon-wrapper max-w-5xl mx-auto mt-10 bg-gradient-to-br from-amber-50/80 via-white to-pink-50/80 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
            {/* Background Decorative Glow */}
            <div className="absolute -top-12 -right-12 size-40 bg-gradient-to-br from-amber-300/20 to-pink-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-amber-200/60 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 font-black text-xs mb-2 shadow-xs">
                    <span>🌟</span>
                    <span>{isEn ? "Activity Zone Add-Ons" : "ॲक्टिव्हिटी झोन ॲड-ऑन सोयी"}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {isEn ? "Add-On Facilities (Activity Zone)" : "ॲड-ऑन सुविधा (Activity Zone)"}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-extrabold text-slate-700 mb-6 bg-white/80 p-3.5 rounded-2xl border border-amber-100 shadow-xs">
                ℹ️ {isEn ? (
                  <>These facilities are available as <strong>Add-Ons</strong> to Individual Facility Packages (cost not specified in the provided data).</>
                ) : (
                  <>या सुविधा वैयक्तिक सुविधा पॅकेजेस सोबत <strong>Add-Ons (ॲड-ऑन)</strong> म्हणून उपलब्ध आहेत (शुल्क पॅकेजमध्ये समाविष्ट आहे किंवा स्वतंत्र सोयीनुसार उपलब्ध).</>
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Mind & Body */}
                <div className="bg-white p-5 rounded-2xl border-2 border-pink-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl font-black shrink-0 shadow-xs">
                      🧘‍♀️
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-black text-pink-600 block">Health & Harmony</span>
                      <h4 className="font-black text-slate-900 text-base">Mind & Body</h4>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-extrabold text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-pink-500 shrink-0"></span>
                      <span>{isEn ? "Zumba" : "झुंबा (Zumba)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-pink-500 shrink-0"></span>
                      <span>{isEn ? "Dance Workout" : "फिटनेस डान्स (Dance)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-pink-500 shrink-0"></span>
                      <span>{isEn ? "Yoga & Meditation" : "योग & ध्यान (Yoga)"}</span>
                    </li>
                  </ul>
                </div>

                {/* Card 2: Recreation */}
                <div className="bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-black shrink-0 shadow-xs">
                      🎲
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-black text-indigo-600 block">Leisure & Fun</span>
                      <h4 className="font-black text-slate-900 text-base">Recreation</h4>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-extrabold text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-indigo-500 shrink-0"></span>
                      <span>{isEn ? "Indoor Sitting Games" : "इनडोअर सिटिंग गेम्स (Sitting Games)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-indigo-500 shrink-0"></span>
                      <span>{isEn ? "Music Hall" : "म्युझिक हॉल (Music Hall)"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-indigo-500 shrink-0"></span>
                      <span>{isEn ? "Library" : "ग्रंथालय (Library)"}</span>
                    </li>
                  </ul>
                </div>

                {/* Card 3: Outdoor */}
                <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="size-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-black shrink-0 shadow-xs">
                      🏃‍♂️
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-black text-emerald-600 block">Nature & Fitness</span>
                      <h4 className="font-black text-slate-900 text-base">Outdoor</h4>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm font-extrabold text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>{isEn ? "Outdoor Fitness Garden" : "आउटडोअर फिटनेस गार्डन"}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>{isEn ? "Jogging Track" : "जागतिक दर्जाचा जॉगिंग ट्रॅक"}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FACILITY DETAIL POPUP MODAL
           ══════════════════════════════════════════════════════════════ */}
        {selectedFacility &&
          createPortal(
            <div
              className="sp-modal-overlay"
              onClick={() => setSelectedFacility(null)}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="sp-modal-container" onClick={(e) => e.stopPropagation()}>
                <button
                  className="sp-modal-close-btn"
                  onClick={() => setSelectedFacility(null)}
                  title={isEn ? "Close" : "बंद करा"}
                >
                  ✕
                </button>

                <div className="sp-modal-hero-img-box">
                  <img
                    src={selectedFacility.img}
                    alt={isEn ? selectedFacility.titleEn : selectedFacility.titleMr}
                    className="sp-modal-hero-img"
                  />
                  <div className="sp-modal-hero-badge">
                    <span>{selectedFacility.icon}</span>
                    <span>{isEn ? selectedFacility.titleEn : selectedFacility.titleMr}</span>
                  </div>
                </div>

                <div className="sp-facility-modal-body">
                  <div className="sp-modal-header">
                    <h3 className="sp-modal-title">
                      {selectedFacility.icon} {isEn ? selectedFacility.titleEn : selectedFacility.titleMr}
                    </h3>
                    <div className="sp-modal-timing">
                      {isEn ? "⏰ Timings: " : "⏰ उपलब्ध वेळ: "}<strong>{isEn ? (selectedFacility.timingEn || selectedFacility.timingMr) : selectedFacility.timingMr}</strong>
                    </div>
                  </div>

                  <p className="sp-modal-desc">{isEn ? (selectedFacility.descEn || selectedFacility.descMr) : selectedFacility.descMr}</p>

                  <div className="sp-modal-features-sec">
                    <h4 className="sp-modal-features-title">{isEn ? "✨ Key Features & Amenities:" : "✨ मुख्य वैशिष्ट्ये व सोयी:"}</h4>
                    <ul className="sp-modal-features-list">
                      {(isEn && selectedFacility.featuresEn ? selectedFacility.featuresEn : selectedFacility.featuresMr).map((feat, idx) => (
                        <li key={idx} className="sp-modal-feat-item">
                          <span className="sp-feat-check">✔</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sp-modal-actions">
                    <a
                      href={`tel:${sportsClub.phones[0]}`}
                      className="sp-modal-btn-call"
                    >
                      {isEn ? "📞 Book Today" : "📞 आजच बुकिंग करा"}
                    </a>
                    <a
                      href={`${sportsClub.whatsapp}&text=${isEn ? `Hi,%20I%20want%20more%20information%20about%20${encodeURIComponent(selectedFacility.titleEn)}` : `मला%20${encodeURIComponent(selectedFacility.titleMr)}%20बद्दल%20अधिक%20माहिती%20हवी%20आहे.`}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sp-modal-btn-wa"
                    >
                      {isEn ? "💬 Enquire on WhatsApp" : "💬 WhatsApp वर चौकशी करा"}
                    </a>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}


      </div>

      {/* ══════════════════════════════════════════════════════════════
          5. ONLINE REGISTRATION ENQUIRY FORM MODAL
         ══════════════════════════════════════════════════════════════ */}
      {showRegModal && createPortal(
        <div
          className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => { setShowRegModal(false); setIsSubmitted(false); }}
        >
          <div
            className="bg-gradient-to-br from-[#1a0429] via-[#2d0739] to-[#0c0216] border-4 border-pink-500/40 rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => { setShowRegModal(false); setIsSubmitted(false); }}
              className="absolute top-4 right-4 size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition font-black cursor-pointer z-20"
              aria-label="Close"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <div>
                <div className="text-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-black mb-2 shadow-inner">
                    {isEn ? "✨ Online Admission & Inquiry Registration" : "✨ ऑनलाईन प्रवेश व चौकशी नोंदणी"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {isEn ? "Register for Admission Today" : "आजच प्रवेश नोंदणी करा"}
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-200/80 font-bold mt-1">
                    {isEn ? "Fill in the details below. Our team will contact you soon!" : "खालील माहिती भरा. आमची टीम लवकरच तुमच्याशी संपर्क साधेल!"}
                  </p>
                </div>

                <form onSubmit={handleSubmitReg} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-black text-pink-200 mb-1.5">
                      {isEn ? "1. Your Full Name *" : "१. आपले संपूर्ण नाव *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isEn ? "e.g. Rahul Sachin Patil" : "उदा. राहुल सचिन पाटील"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 font-bold text-sm focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-pink-200 mb-1.5">
                      {isEn ? "2. Contact Mobile Number *" : "२. संपर्क मोबाईल नंबर *"}
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder={isEn ? "e.g. 9876543210" : "उदा. 9876543210"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 font-bold text-sm focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-pink-200 mb-1.5">
                        {isEn ? "3. City / Town" : "३. शहर / गाव"}
                      </label>
                      <input
                        type="text"
                        placeholder={isEn ? "e.g. Sangli / Miraj" : "उदा. सांगली / मिरज"}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 font-bold text-sm focus:outline-none focus:border-pink-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-pink-200 mb-1.5">
                        {isEn ? "4. Admission Type" : "४. प्रवेशाचा प्रकार"}
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-slate-900 text-white border-2 border-white/20 rounded-2xl px-3 py-3 font-bold text-sm focus:outline-none focus:border-pink-500 transition"
                      >
                        <option value="sports" className="bg-[#0f172a] text-white font-bold">{isEn ? "Sports & Fitness Club" : "स्पोर्ट्स अँड फिटनेस क्लब"}</option>
                        <option value="anandshala" className="bg-[#0f172a] text-white font-bold">{isEn ? "Anandshala Senior Citizen Home" : "आनंदशाळा ज्येष्ठ नागरिक धाम"}</option>
                        <option value="both" className="bg-[#0f172a] text-white font-bold">{isEn ? "Both (Anandshala & Sports)" : "दोन्ही (आनंदशाळा व स्पोर्ट्स)"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-pink-200 mb-1.5">
                      {isEn ? "5. Special Note / Message (Optional)" : "५. विशेष टीप / संदेश (पर्यायी)"}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isEn ? "Write your questions here..." : "तुमचे काही प्रश्न असल्यास येथे लिहा..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-2.5 text-white placeholder-white/40 font-bold text-sm focus:outline-none focus:border-pink-500 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-black text-base shadow-xl hover:scale-[1.02] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? (
                      <span>{isEn ? "Please wait..." : "कृपया वाट पहा..."}</span>
                    ) : (
                      <>
                        <span>{isEn ? "Submit Form" : "फॉर्म सबमिट करा"}</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="size-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  {isEn ? "Congratulations! Registration Submitted." : "अभिनंदन! नोंदणी सबमिट झाली."}
                </h3>
                <p className="text-sm font-bold text-pink-200/90 leading-relaxed max-w-sm mx-auto mb-6">
                  {isEn
                    ? `Thank you ${formData.name}! Our Preetam Anandshala team will contact you soon on phone.`
                    : `धन्यवाद ${formData.name}! आमची प्रीतम आनंदशाळा टीम लवकरच आपल्याशी फोन वर संवाद साधेल.`}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/91${sportsClub.phones[0]}?text=${isEn ? `Hi,%20I%20have%20submitted%20the%20registration%20form.%20My%20Name:%20${encodeURIComponent(formData.name)}` : `नमस्कार,%20मी%20फॉर्म%20भरला%20आहे.%20माझे%20नाव:%20${encodeURIComponent(formData.name)}`}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition"
                  >
                    <span>{isEn ? "💬 Message on WhatsApp" : "💬 WhatsApp वर मेसेज करा"}</span>
                  </a>

                  <button
                    onClick={() => { setShowRegModal(false); setIsSubmitted(false); }}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm border border-white/20 transition"
                  >
                    {isEn ? "Close" : "बंद करा"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
