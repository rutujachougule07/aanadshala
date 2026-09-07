import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
  Crown,
  Dumbbell,
  Waves,
  Trophy,
  Footprints,
  Star,
  Sparkles,
} from "lucide-react";
import "./SportsSection.css";
import "./ActivityHallsSection/ActivityHallsSection.css";
import "@/components/journey-v2/journey.css";
import SportsPricingSection from "./SportsPricingSection/SportsPricingSection";
import { site, sportsClub } from "../lib/site-info";
import { useLanguage } from "@/lib/use-language";
import { useAdminStore } from "@/lib/admin-store";
import { HighlightText } from "@/components/HighlightText";
import { Reveal } from "@/components/site/Reveal";

const sportsMilestonesData = [
  {
    id: 1,
    stepNoMr: "१",
    stepNoEn: "1",
    titleMr: "१० वर्षांचे कौटुंबिक सभासदत्व",
    titleEn: "10 Years Family Membership",
    descMr:
      "कुटुंबातील ४ सदस्यांसाठी सलग १० वर्षे सर्व क्रीडा व फिटनेस सुविधांचा विनामूल्य अमर्याद आनंद.",
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
    titleMr: "२,२०० चौ. फूट भव्य जीम",
    titleEn: "2,200 sq.ft. Premium Gym",
    descMr:
      "अत्याधुनिक व्यायाम साहित्याने सुसज्ज कार्डिओ झोन, वेट ट्रेनिंग व वैयक्तिक ट्रेनर्सचे मार्गदर्शन.",
    descEn: "State-of-the-art machines, cardio zone and functional training areas with personal trainers.",
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
    titleMr: "ऑलिंपिक मानकांचा स्विमिंग पूल",
    titleEn: "Olympic Size Swimming Pool",
    descMr:
      "संपूर्ण शरीराचा व्यायाम, जलतरण सराव आणि तणावमुक्तीसाठी ऑलिंपिक मानकांचा शुद्ध पाण्याचा तलाव.",
    descEn: "Designed for full-body conditioning, water aerobics and stress relief in clean filtered water.",
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
    titleMr: "इनडोअर क्रीडा संकुल",
    titleEn: "Professional Sports Courts",
    descMr:
      "आंतरराष्ट्रीय मानकांचे इनडोअर बॅडमिंटन, पिकलबॉल, स्क्वॅश कोर्ट्स, टेबल टेनिस व स्नूकर टेबल्स.",
    descEn: "International standard wooden Badminton, Pickleball, Squash Courts, Table Tennis & Snooker tables.",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    nodeIcon: Trophy,
    cardIcon: Trophy,
    side: "right",
  },
  {
    id: 5,
    stepNoMr: "५",
    stepNoEn: "5",
    titleMr: "आउटडोअर फिटनेस झोन",
    titleEn: "Outdoor Fitness Zone",
    descMr:
      "मोकळ्या हवेतील जॉगिंग ट्रॅक, ओपन एअर जीम, स्पोर्ट्स टर्फ आणि फिटनेस गार्डनची प्रसन्न सोय.",
    descEn: "Jogging Track, sports turf ground & Fitness Garden with open air functional training rigs.",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    nodeIcon: Footprints,
    cardIcon: Footprints,
    side: "left",
  },
  {
    id: 6,
    stepNoMr: "६",
    stepNoEn: "6",
    titleMr: "विशेष व्ही.आय.पी. क्लब प्राधान्य",
    titleEn: "Priority Club Access",
    descMr:
      "सर्व क्रीडा स्पर्धा, आरोग्य कार्यशाळा, सांस्कृतिक कार्यक्रम व क्लब उपक्रमांमध्ये विशेष प्राधान्य.",
    descEn: "Priority access for all club tournaments, health workshops, cultural events & networking programs.",
    color: "#D97706",
    bgColor: "#FEF3C7",
    borderColor: "#FDE68A",
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
    icon: "💪",
    titleMr: "अत्याधुनिक जिम",
    titleEn: "State-of-the-Art Gym",
    subMr: "जागतिक दर्जाची कार्डिओ व वेट ट्रेनिंग उपकरणे",
    subEn: "World-class cardio & weight training machinery",
    descMr:
      "तुमच्या फिटनेस प्रवासाची दमदार सुरुवात करा! प्रीतम स्पोर्ट्स अँड फिटनेस क्लब मधील अत्याधुनिक जिम हे तुमचे सामर्थ्य आणि तंदुरुस्ती वाढवण्याचे केंद्र आहे. जागतिक दर्जाची कार्डिओ, वेट ट्रेनिंग आणि स्ट्रेंथ इक्विपमेंट्स येथे उपलब्ध आहेत. आमच्या तज्ज्ञ प्रशिक्षकांच्या मार्गदर्शनाखाली तुम्ही तुमचे फिटनेस ध्येय सहज साध्य करू शकता.",
    descEn:
      "Kickstart your fitness journey with strength & stamina! Preetam Sports Club Gym features world-class cardio, weight training, and strength machinery with expert certified trainers.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763184848892.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:३०",
    timingEn: "6:00 AM to 9:30 PM",
    featuresMr: [
      "🌐 सुविधा: आंतरराष्ट्रीय दर्जाचे कार्डिओ व वेट लिफ्टिंग उपकरणे",
      "🧑‍🏫 मार्गदर्शन: प्रमाणित व अनुभवी प्रशिक्षक मदतीसाठी उपलब्ध",
      "⏰ लवचिकता: सोयीस्कर बॅच आणि ट्रेनिंग वेळापत्रक",
      "🎯 फोकस: स्नायूंची वाढ, वजन कमी करणे आणि तंदुरुस्ती",
    ],
    featuresEn: [
      "International standard cardio & weight training equipment",
      "Certified and experienced personal trainers available",
      "Flexible batch timings suited for your routine",
      "Focused on muscle gain, weight loss & overall fitness",
    ],
  },
  {
    id: "yoga",
    icon: "🧘",
    titleMr: "योगा स्टुडिओ",
    titleEn: "Yoga Studio",
    subMr: "प्राणायाम, ध्यान आणि आसने शिकण्यासाठी आदर्श",
    subEn: "Pranayama, meditation and posture mastery",
    descMr:
      "शरीर आणि मन यांच्यातील सुंदर समन्वय अनुभवा. प्रीतम क्लबचा शांत आणि हवेशीर योगा स्टुडिओ तुम्हाला प्राणायाम, ध्यान आणि आसने शिकण्यासाठी आदर्श जागा आहे. तणाव कमी करून, लवचिकता वाढवून आणि आंतरिक शांती मिळवून तुमचे आरोग्य सुधारा.",
    descEn:
      "Experience harmony of body and mind. Preetam Club's airy Yoga Studio offers Pranayama, meditation, and postures guided by certified Yoga gurus.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763188841664.jpg",
    timingMr: "सकाळी ६:३० ते ९:०० व सायं. ५ ते ७",
    timingEn: "6:30 AM-9:00 AM & 5:00 PM-7:00 PM",
    featuresMr: [
      "🧘 फायदे: लवचिकता, मनःशांती आणि तणावमुक्ती",
      "🙏 प्रकार: हठ योग, पॉवर योग आणि मेडिटेटिव्ह योग क्लासेस",
      "✨ वातावरण: शांत, नैसर्गिक आणि सकारात्मक ऊर्जा देणारे",
    ],
    featuresEn: [
      "Boosts flexibility, mental peace & stress relief",
      "Hatha Yoga, Power Yoga & Meditative Yoga sessions",
      "Serene, airy environment filled with positive energy",
    ],
  },
  {
    id: "meditation",
    icon: "🕊️",
    titleMr: "मेडिटेशन कक्ष",
    titleEn: "Meditation Room",
    subMr: "गहन ध्यान, एकाग्रता आणि मानसिक स्पष्टता",
    subEn: "Deep meditation, focus and mental clarity",
    descMr:
      "धावपळीच्या जीवनात मनाला विश्रांती देण्यासाठी समर्पित मेडिटेशन कक्ष हे तुमचे शांत आश्रयस्थान आहे. या विशेष कक्षात तुम्ही गहन ध्यान करून मानसिक स्पष्टता मिळवू शकता आणि कामातून आलेल्या थकव्यावर मात करू शकता.",
    descEn:
      "A peaceful sanctuary to rest your mind amidst busy daily life. Experience deep meditation, mental clarity, and rejuvenation in our sound-buffered hall.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763203091441.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "💡 उद्देश: मानसिक शांती, एकाग्रता आणि तणाव कमी करणे",
      "🤫 वैशिष्ट्य: शांतता आणि एकाग्रतेसाठी डिझाइन केलेला कक्ष",
      "🧠 लाभ: मनःस्थिति सुधारण्यास आणि स्मरणशक्ती वाढवण्यास मदत",
    ],
    featuresEn: [
      "Designed for mental clarity, focus & stress reduction",
      "Dedicated quiet space built for meditation practice",
      "Helps improve mood regulation and memory retention",
    ],
  },
  {
    id: "zumba",
    icon: "💃",
    titleMr: "झुंबा क्लासेस",
    titleEn: "Zumba Classes",
    subMr: "संगीताच्या तालावर एनर्जेटिक कॅलरी बर्न",
    subEn: "High-energy dance workout with music",
    descMr:
      "व्यायाम कंटाळवाणा नाही! झुंबा क्लासेसमध्ये संगीताच्या तालावर डान्स करत कॅलरी बर्न करा आणि मजा करा! ही उच्च-ऊर्जा (High-Energy) ॲक्टिव्हिटी तुम्हाला तंदुरुस्त ठेवण्यासोबतच तुमचा मूड सुधारते.",
    descEn:
      "Workout isn't boring! Burn calories while dancing to high-energy rhythm in Zumba classes. Guided by enthusiastic instructors to keep you fit and cheerful.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763357581614.png",
    timingMr: "सकाळी ७:०० ते ८:०० व सायं. ६ ते ७",
    timingEn: "7:00 AM-8:00 AM & 6:00 PM-7:00 PM",
    featuresMr: [
      "🥳 अनुभव: फिटनेस आणि डान्स पार्टीचा जबरदस्त अनुभव",
      "🔥 परिणाम: वेगाने कॅलरी बर्न आणि संपूर्ण शरीराचा व्यायाम",
      "🎶 प्रशिक्षक: उत्साही आणि प्रशिक्षित झुंबा प्रशिक्षकांचे मार्गदर्शन",
    ],
    featuresEn: [
      "Fun fitness dance party atmosphere",
      "Rapid calorie burn and full-body cardio workout",
      "Guided by certified high-energy instructors",
    ],
  },
  {
    id: "dance",
    icon: "👯",
    titleMr: "डान्स क्लासेस",
    titleEn: "Dance Classes",
    subMr: "बॉलीवूड, फ्रीस्टाइल व विविध नृत्य प्रकार",
    subEn: "Bollywood, freestyle & contemporary styles",
    descMr:
      "तुमच्यातील कलाकाराला वाव द्या! डान्स क्लासेसमध्ये विविध नृत्य प्रकार (उदा. बॉलीवूड, हिप-हॉप, फ्रीस्टाइल) शिकण्याची संधी मिळते. डान्समुळे केवळ शारीरिक तंदुरुस्तीच मिळत नाही, तर आत्मविश्वास आणि देहबोली सुधारते.",
    descEn:
      "Unleash your inner artist! Learn Bollywood, Hip-Hop, and Freestyle dance. Dance enhances physical stamina, self-confidence, and graceful body posture.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763203444303.jpg",
    timingMr: "सकाळी ८:०० ते ९:०० व सायं. ५ ते ६",
    timingEn: "8:00 AM-9:00 AM & 5:00 PM-6:00 PM",
    featuresMr: [
      "🩰 प्रकार: बॉलीवूड, फ्रीस्टाइल, कंटेम्पररी इत्यादी प्रकार",
      "💖 फायदे: लवचिकता वाढवणे आणि आत्मविश्वास सुधारणे",
      "👩‍🏫 शिकणे: खास प्रशिक्षित नृत्य शिक्षकांकडून धडे",
    ],
    featuresEn: [
      "Bollywood, Freestyle & Contemporary dance styles",
      "Builds body flexibility, rhythm & confidence",
      "Choreographed by expert dance teachers",
    ],
  },
  {
    id: "swimming",
    icon: "🏊‍♂️",
    titleMr: "भव्य स्विमिंग पूल",
    titleEn: "Grand Swimming Pool",
    subMr: "ऑलिंपिक मानकांचा स्वच्छ व शुद्ध पाण्याचा तलाव",
    subEn: "Clean Olympic standard purified water pool",
    descMr:
      "उन्हाळ्यावर मात करा आणि शरीराला आराम द्या! आमचा स्वच्छ आणि मोठा स्विमिंग पूल पोहण्यासाठी एक सुरक्षित आणि आल्हाददायक जागा आहे. पोहणे हा सर्वात उत्तम कार्डिओ व्यायाम मानला जातो, जो सांध्यांवर कोणताही ताण न आणता संपूर्ण शरीराला बळकटी देतो.",
    descEn:
      "Beat the heat & strengthen your body! Our large, purified water swimming pool provides safe, hygienic swimming for adults and children with lifeguards.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1762243460172.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ८:००",
    timingEn: "6:00 AM to 8:00 PM",
    featuresMr: [
      "💧 स्वच्छता: नियमित फिल्टरिंग आणि पाणी गुणवत्ता तपासणी",
      "👨‍🎓 प्रशिक्षण: नवशिक्यांसाठी आणि मुलांसाठी पोहण्याचे क्लासेस",
      "🌞 अनुभव: संपूर्ण शरीरासाठी प्रभावी आणि आनंददायी व्यायाम",
    ],
    featuresEn: [
      "Daily filtration & water quality maintenance",
      "Special coaching batches for beginners & kids",
      "Low-impact full body cardio exercise",
    ],
  },
  {
    id: "badminton",
    icon: "🏸",
    titleMr: "बॅडमिंटन कोर्ट",
    titleEn: "Badminton Courts Arena",
    subMr: "आंतरराष्ट्रीय मानकांचे वूडन सिंथेटिक कोर्ट्स",
    subEn: "International wooden synthetic courts",
    descMr:
      "बॅडमिंटनच्या उत्साही खेळासाठी सज्ज व्हा! आमच्या क्लबमध्ये आंतरराष्ट्रीय दर्जाचे बॅडमिंटन कोर्ट्स उपलब्ध आहेत. उत्कृष्ट फ्लोअरिंग आणि योग्य प्रकाशयोजनामुळे येथे खेळण्याचा अनुभव खास असतो.",
    descEn:
      "Experience high-energy indoor badminton! Tournament-grade wooden synthetic courts equipped with eye-comfort anti-glare LED lighting.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763203979535.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "🏆 दर्जा: आंतरराष्ट्रीय मानकांचे उच्च-गुणवत्तेचे कोर्ट्स",
      "💡 लाईटिंग: डोळ्यांना आरामदायक प्रो LED प्रकाशयोजना",
      "🤝 उपलब्धता: कोर्ट बुकिंग व मेंबरशिप पर्याय उपलब्ध",
    ],
    featuresEn: [
      "International tournament-standard courts",
      "Eye-friendly anti-glare LED sports lighting",
      "Court booking & club membership options",
    ],
  },
  {
    id: "squash",
    icon: "🎾",
    titleMr: "स्क्वॉश कोर्ट",
    titleEn: "Glass-Back Squash Court",
    subMr: "उच्च वेगाच्या व तीव्र व्यायामासाठी सोय",
    subEn: "High-speed intense stamina workout court",
    descMr:
      "तुमचा वेग आणि प्रतिसाद तपासा! स्क्वॉश हा एक अत्यंत वेगवान आणि ऊर्जा-खर्चीक खेळ आहे. आमच्या सुसज्ज स्क्वॉश कोर्ट्सवर तुम्ही तुमच्या मित्रांना आव्हान देऊ शकता आणि काही मिनिटांत जबरदस्त कॅलरी बर्न करू शकता.",
    descEn:
      "Test your reflexes & speed! Our glass-back squash court offers an intense racquet workout to burn calories and boost cardiovascular endurance.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763206382917.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "⚡️ वेग: उच्च वेगाच्या आणि तीव्र व्यायामासाठी उत्तम",
      "💪 लाभ: हृदय व रक्तवाहिन्यांचे आरोग्य सुधारण्यासाठी",
      "🎮 खेळ: मित्रांसोबत आव्हानात्मक मॅचेस खेळण्यासाठी उत्तम",
    ],
    featuresEn: [
      "Ideal for high-speed intense racquet workout",
      "Boosts cardiovascular health & stamina",
      "Perfect for challenging friends to a match",
    ],
  },
  {
    id: "table-tennis",
    icon: "🏓",
    titleMr: "टेबल टेनिस हॉल",
    titleEn: "Table Tennis Arena",
    subMr: "एकाग्रता आणि प्रतिक्रिया गती वाढवणारा खेळ",
    subEn: "Focus & reaction time boosting TT tables",
    descMr:
      "टेबल टेनिसच्या रोमांचक खेळासाठी तयार व्हा! आमच्या टेबल टेनिस हॉलमध्ये तुम्हाला सर्वोत्तम उपकरणे आणि खेळण्यासाठी पुरेसा अवकाश मिळतो. एकाग्रता आणि प्रतिक्रिया गती वाढवण्यासाठी हा खेळ उत्कृष्ट आहे.",
    descEn:
      "Sharpen your focus and hand-eye coordination! Our indoor Table Tennis arena is fully equipped with official tables and quality paddles.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763206867693.jpg",
    timingMr: "सकाळी ६:०० ते रात्री ९:००",
    timingEn: "6:00 AM to 9:00 PM",
    featuresMr: [
      "🎯 फोकस: एकाग्रता आणि प्रतिक्रिया गती सुधारते",
      "✅ उपकरणे: उच्च-गुणवत्तेचे टीटी टेबल्स आणि साहित्य",
      "🕹️ अनुभव: शांत आणि उत्साही वातावरणात खेळण्याचा आनंद",
    ],
    featuresEn: [
      "Boosts concentration & quick reaction speed",
      "Official high-grade TT tables and gear",
      "Comfortable spacious indoor arena",
    ],
  },
  {
    id: "snooker",
    icon: "🎱",
    titleMr: "स्नूकर आणि पूल",
    titleEn: "Snooker & 8-Ball Pool Studio",
    subMr: "अचूकता, एकाग्रता व मनोरंजनाची जोड",
    subEn: "Precision, focus and leisure snooker tables",
    descMr:
      "विश्रांतीच्या वेळेत मनोरंजनाची जोड द्या. आमच्या स्नूकर आणि पूल सुविधेमध्ये उच्च-गुणवत्तेचे टेबल्स उपलब्ध आहेत. स्नूकर हा खेळ एकाग्रता आणि अचूकता वाढवण्यास मदत करतो.",
    descEn:
      "Combine leisure with strategy! Enjoy snooker and 8-ball pool on tournament-grade tables set inside our plush air-conditioned studio.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1762243482819.jpg",
    timingMr: "सकाळी १०:०० ते रात्री ९:००",
    timingEn: "10:00 AM to 9:00 PM",
    featuresMr: [
      "🧠 कौशल्य: अचूकता, एकाग्रता व धोरणात्मक विचार वाढवते",
      "🛋️ सुविधा: आरामदायक बैठक व्यवस्था व एसी हॉल",
      "👍 उद्देश: सामाजिक व मनोरंजक विरंगुळ्यासाठी उत्तम",
    ],
    featuresEn: [
      "Enhances precision, focus & strategic thinking",
      "Plush sofa lounge seating in air-conditioned hall",
      "Ideal for friendly games and relaxing leisure",
    ],
  },
  {
    id: "pickleball-turf",
    icon: "🥅",
    titleMr: "पिकलबॉल व टर्फ मैदान",
    titleEn: "Pickleball Court & Sports Turf",
    subMr: "पिकलबॉल, क्रिकेट व फुटबॉलसाठी कृत्रिम टर्फ",
    subEn: "Pickleball court & all-weather artificial turf",
    descMr:
      "हिरवीगार आणि उत्कृष्ट कृत्रिम टर्फ मैदान तुमच्या आऊटडोअर खेळांच्या गरजा पूर्ण करते. सोबतच जगातील सर्वात वेगाने लोकप्रिय होणारा पिकलबॉल खेळ खेळण्यासाठी सांगलीतील भव्य पिकलबॉल कोर्ट उपलब्ध आहे.",
    descEn:
      "Play your favorite outdoor sports all year round! Features a dedicated Pickleball court along with artificial turf for mini-cricket and football matches.",
    img: "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763202416442.jpg",
    timingMr: "सकाळी ६:०० ते रात्री १०:००",
    timingEn: "6:00 AM to 10:00 PM",
    featuresMr: [
      "🌿 गुणवत्ता: उच्च-गुणवत्तेचे व सुरक्षित कृत्रिम टर्फ",
      "📅 बुकिंग: टीम मॅच आणि सरावासाठी तासावर भाड्याने उपलब्ध",
      "🎮 वापर: पिकलबॉल, फुटबॉल, क्रिकेट व मैदानी खेळ",
    ],
    featuresEn: [
      "High-density safe artificial grass turf",
      "Hourly slot rental for team matches & practice",
      "Multi-purpose court for Pickleball, Football & Cricket",
    ],
  },
  {
    id: "jogging-track",
    icon: "👟",
    titleMr: "जॉगिंग ट्रॅक",
    titleEn: "Jogging Track",
    subMr: "शुद्ध हवा व निसर्गरम्य हिरवळीत मॉर्निंग वॉक",
    subEn: "Pure air, fresh greenery & dedicated track",
    descMr:
      "निसर्गरम्य आणि शुद्ध हवेत जॉगिंग करा. आमच्या क्लबमधील प्रशस्त जॉगिंग ट्रॅकवर धावणे किंवा चालणे म्हणजे दिवसाची प्रसन्न सुरुवात! शहराच्या गजबजाटापासून दूर शुद्ध हवेत व्यायाम करण्याचा सोपा मार्ग.",
    descEn:
      "Start your morning refreshed! Our smooth walking & jogging track winds through lush lawns and greenery away from city pollution.",
    img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop",
    timingMr: "सकाळी ५:३० ते ९:०० व सायं. ४:३० ते ८:००",
    timingEn: "5:30 AM-9:00 AM & 4:30 PM-8:00 PM",
    featuresMr: [
      "🌬️ वातावरण: हिरवळ, ताजी हवा आणि शांत परिसर",
      "🛡️ सुरक्षा: समतल आणि सुरक्षित जॉगिंग ट्रॅक",
      "🏃‍♂️ आरोग्य: दररोज सकाळी/संध्याकाळी चालण्यासाठी सर्वोत्तम",
    ],
    featuresEn: [
      "Lush greenery with clean pollution-free air",
      "Levelled safe track for walking & jogging",
      "Ideal for daily morning & evening fitness walks",
    ],
  },
  {
    id: "open-gym",
    icon: "🏋️‍♂️",
    titleMr: "ओपन जिम",
    titleEn: "Open Gym",
    subMr: "मोकळ्या हवेतील व्यायाम साधने व फिटनेस झोन",
    subEn: "Open-air workout machinery & bodyweight equipment",
    descMr:
      "निसर्गाच्या सान्निध्यात मोकळ्या हवेत व्यायाम करा! ओपन जिममध्ये अत्याधुनिक मोकळ्या हवेतील व्यायाम साधने, स्ट्रेचिंग एरिया आणि कॅलिस्थेनिक्स वर्कआउट झोन उपलब्ध आहे.",
    descEn:
      "Workout in fresh open air! Our Open Gym features bodyweight equipment, stretching area and calisthenics rigs.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
    timingMr: "सकाळी ५:३० ते ९:०० व सायं. ४:३० ते ८:००",
    timingEn: "5:30 AM-9:00 AM & 4:30 PM-8:00 PM",
    featuresMr: [
      "🏋️‍♂️ साधने: मोकळ्या हवेतील ओपन जिम इक्विपमेंट्स",
      "🍃 वातावरण: ताजी हवा आणि प्रसन्न निसर्गरम्य परिसर",
      "💪 वापर: वॉर्म-अप, स्ट्रेचिंग व स्ट्रेन्थ वर्कआउट",
    ],
    featuresEn: [
      "Open-air workout machinery & bodyweight rigs",
      "Fresh air natural environment",
      "Great for warm-ups, stretching & strength training",
    ],
  },
  {
    id: "green-lawn",
    icon: "🌿",
    titleMr: "लॉन",
    titleEn: "Lawn",
    subMr: "प्रशस्त हिरवळीचे मैदान व निसर्गरम्य विरंगुळा क्षेत्र",
    subEn: "Spacious green lawn for walking & relaxation",
    descMr:
      "१.५ एकर परिसरातील सुंदर हिरवळ मैदान! निसर्गाच्या कुशीत शांत वाचन, मॉर्निंग वॉक, योगा आणि कौटुंबिक विरंगुळ्यासाठी ही उत्तम जागा आहे.",
    descEn:
      "Spacious lush green lawns in our 1.5 acre complex! Perfect for relaxation, walking, open exercises, and peaceful family leisure.",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
    timingMr: "सकाळी ५:३० ते रात्री ९:००",
    timingEn: "5:30 AM to 9:00 PM",
    featuresMr: [
      "🌿 परिसर: दीड एकर निसर्गरम्य मऊ हिरवळ मैदान",
      "🕊️ शांतता: शहराच्या गजबजाटापासून दूर प्रसन्न वातावरण",
      "🧘 वापर: विरंगुळा, चालणे, योगा व कौटुंबिक वेळ",
    ],
    featuresEn: [
      "Spacious soft grass lawn across 1.5 acres",
      "Quiet pollution-free serene environment",
      "Ideal for leisure, walking, yoga & family time",
    ],
  },
  {
    id: "children-play-area",
    icon: "🛝",
    titleMr: "चिल्ड्रन्स प्ले एरिया",
    titleEn: "Children's Play Area",
    subMr: "लहान मुलांसाठी सुरक्षित खेळणी व घसरगुंडी उद्यान",
    subEn: "Safe swings, slides & play zone for kids",
    descMr:
      "लहान मुलांच्या निरामय आनंदासाठी खास डिझाइन केलेला सुरक्षित चिल्ड्रन्स प्ले एरिया! येथे विविध घसरगुंड्या, झोपाळे आणि मऊ हिरवळीवर खेळण्यासाठी उत्कृष्ट जागा उपलब्ध आहे.",
    descEn:
      "A vibrant & safe dedicated play park for kids! Features safe swings, slides, climbing frames, and lush soft grass for children's active fun.",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop",
    timingMr: "सकाळी ६:०० ते रात्री ८:००",
    timingEn: "6:00 AM to 8:00 PM",
    featuresMr: [
      "🛝 खेळणी: लहान मुलांसाठी झोपाळे, घसरगुंडी व सी-सॉ",
      "🛡️ सुरक्षा: मऊ हिरवळ व सुरक्षित कुंपण असलेला परिसर",
      "🎈 आनंद: मुलांच्या शारीरिक व मानसिक विकासासाठी उत्तम",
    ],
    featuresEn: [
      "Swings, slides & child-friendly play equipment",
      "Soft grass lawn & safe fenced play boundaries",
      "Promotes physical activity & joyous fun for kids",
    ],
  },
];

export default function SportsSection() {
  const { isEn } = useLanguage();
  const store = useAdminStore();
  const adminFacilities = store.siteData?.sportsFacilities || [];

  const [sportsDescOverrides] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem("sports_facility_descs_v1") || "{}");
    } catch {
      return {};
    }
  });

  const mergedFacilityItems: FacilityDetail[] = facilityItems.map((item) => {
    const adminFac = adminFacilities.find((f) => f.id === item.id);
    if (adminFac) {
      return {
        ...item,
        titleMr: adminFac.title || item.titleMr,
        img: adminFac.imageUrl || item.img,
        descMr: sportsDescOverrides[item.id] || adminFac.description || item.descMr,
      };
    }
    return {
      ...item,
      descMr: sportsDescOverrides[item.id] || item.descMr,
    };
  });

  const [selectedFacility, setSelectedFacility] = useState<FacilityDetail | null>(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    interest: "sports",
    message: "",
  });
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
              src={store.siteData.sportsHeroImage || "/images/sports_hero_bg.png"}
              alt="Preetam Sports Complex Sangli Aerial View"
              className="sp-exact-banner-img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d3k88l35vy59af.cloudfront.net/A42/9663/1763184848892.jpg";
              }}
            />
          </div>
        </section>


      </div>

      {/* ══════════════════════════════════════════════════════════════
          SPORTS CLUB KEY HIGHLIGHTS (STANDALONE FULL-WIDTH SPACIOUS TIMELINE)
         ══════════════════════════════════════════════════════════════ */}
      <section className="journey-exact-v2 my-8 sm:my-12" id="sports-milestones">
        <div className="journey-dot-grid" />
        <div className="journey-exact-container">
          <div className="journey-exact-header text-center max-w-3xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="as-badge-pill inline-flex items-center gap-2 px-5 py-2 rounded-full mb-3"
            >
              <span>🏆</span>
              <span>
                {isEn ? (
                  <>
                    Preetam Sports Club — Key Highlights
                  </>
                ) : (
                  <>
                    प्रीतम स्पोर्ट्स क्लब — ६ प्रमुख वैशिष्ट्ये
                  </>
                )}
              </span>
              <span>🏆</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="journey-exact-title text-[26px] sm:text-[36px] md:text-[37px] font-black text-[#1a05a2] leading-snug tracking-tight"
            >
              {isEn ? "Sports Club Key Highlights" : "स्पोर्ट्स क्लबची ६ प्रमुख वैशिष्ट्ये"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="journey-exact-subtitle text-xs sm:text-sm md:text-base font-medium text-slate-500 mt-2 tracking-wide"
            >
              {isEn
                ? "Preetam Sports & Fitness Club key highlights and amenities..."
                : "प्रीतम स्पोर्ट्स अँड फिटनेस क्लबची प्रमुख वैशिष्ट्ये व सुविधा..."}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="journey-ornament flex items-center justify-center gap-3 mt-3"
            >
              <span className="w-12 h-0.5 bg-linear-to-r from-transparent to-[#db2777]"></span>
              <span className="text-[#db2777] font-black text-xs">❖</span>
              <span className="w-12 h-0.5 bg-linear-to-l from-transparent to-[#db2777]"></span>
            </motion.div>
          </div>

          <div className="journey-exact-timeline relative">
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
                      <motion.div
                        initial={{ opacity: 0, x: -50, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.015 }}
                        className="journey-card-box left-box"
                      >
                        <div className="card-date-badge" style={{ backgroundColor: item.color }}>
                          {isEn ? `Highlight ${stepNo}` : `वैशिष्ट्य ${stepNo}`}
                        </div>

                        <div className="card-inner flex items-start justify-between gap-4 p-6 sm:p-7 bg-white rounded-3xl shadow-xl border-2 border-pink-100">
                          <div className="card-text-content space-y-2 text-left">
                            <h3 className="card-title text-xl sm:text-2xl font-black text-[#db2777] leading-snug">
                              {item.id}. <HighlightText text={title} />
                            </h3>
                            <p className="card-desc">
                              <HighlightText text={description} />
                            </p>
                          </div>

                          <div
                            className="card-icon-wrapper p-3.5 rounded-2xl shrink-0 shadow-md"
                            style={{ backgroundColor: item.bgColor }}
                          >
                            <Icon className="size-7 sm:size-8" style={{ color: item.color }} />
                          </div>
                        </div>

                        <div className="arrow-right" style={{ borderLeftColor: item.color }} />
                      </motion.div>

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

                      <motion.div
                        initial={{ opacity: 0, x: 50, y: 20 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        whileHover={{ y: -6, scale: 1.015 }}
                        className="journey-card-box right-box"
                      >
                        <div className="card-date-badge" style={{ backgroundColor: item.color }}>
                          {isEn ? `Highlight ${stepNo}` : `वैशिष्ट्य ${stepNo}`}
                        </div>

                        <div className="card-inner flex items-start justify-between gap-4 p-6 sm:p-7 bg-white rounded-3xl shadow-xl border-2 border-pink-100">
                          <div
                            className="card-icon-wrapper p-3.5 rounded-2xl shrink-0 shadow-md"
                            style={{ backgroundColor: item.bgColor }}
                          >
                            <Icon className="size-7 sm:size-8" style={{ color: item.color }} />
                          </div>

                          <div className="card-text-content space-y-2 text-left flex-1">
                            <h3 className="card-title text-xl sm:text-2xl font-black text-[#db2777] leading-snug">
                              {item.id}. <HighlightText text={title} />
                            </h3>
                            <p className="card-desc">
                              <HighlightText text={description} />
                            </p>
                          </div>
                        </div>

                        <div className="arrow-left" style={{ borderRightColor: item.color }} />
                      </motion.div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="sp-container">

        {/* ══════════════════════════════════════════════════════════════
            SPORTS RATE CARD TABLE (अधिकृत दरपत्रक)
           ══════════════════════════════════════════════════════════════ */}
        <SportsPricingSection />

        {/* ══════════════════════════════════════════════════════════════
            3. "आमच्या सुविधा" 8 CARDS GRID
           ══════════════════════════════════════════════════════════════ */}
        <section className="sp-facilities-sec">
          <div className="sp-sec-header text-center">
            <div className="as-badge-pill inline-flex items-center gap-2 px-5 py-2 rounded-full mb-3">
              {isEn ? "✨ Premium Amenities" : "✨ प्रिमियम सोयी सुविधा"}
            </div>
            <h2 className="typo-heading-main text-[#1a05a2] leading-tight text-center my-2">
              {isEn ? "Preetam Sports Club – Grand Facilities" : "प्रीतम स्पोर्ट्स क्लब – भव्य सुविधा"}
            </h2>
          </div>

          <div className="ah-grid">
            {mergedFacilityItems.map((item, index) => {
              const isActive = selectedFacility?.id === item.id;
              const themes = ["theme-blue", "theme-pink", "theme-purple"];
              const themeClass = item.theme || themes[index % 3];
              const numStr = (index + 1).toString().padStart(2, "0");
              const formatNumStr = isEn
                ? numStr
                : numStr
                  .replace(/0/g, "०")
                  .replace(/1/g, "१")
                  .replace(/2/g, "२")
                  .replace(/3/g, "३")
                  .replace(/4/g, "४")
                  .replace(/5/g, "५")
                  .replace(/6/g, "६")
                  .replace(/7/g, "७")
                  .replace(/8/g, "८")
                  .replace(/9/g, "९");

              return (
                <div
                  key={item.id}
                  className={`ah-card-clean ${themeClass} ${isActive ? "active-card ring-4 ring-pink-500" : ""}`}
                  onClick={() => setSelectedFacility(item)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ah-card-num">{formatNumStr}</div>

                  <div className="ah-card-img-wrapper">
                    <img
                      src={item.img}
                      alt={isEn ? item.titleEn : item.titleMr}
                      className="ah-card-img"
                    />
                  </div>

                  <div className="ah-card-content">
                    <div className="ah-card-icon text-2xl font-black shadow-md">{item.icon}</div>

                    <h3 className="ah-card-title">{isEn ? item.titleEn : item.titleMr}</h3>

                    <p className="text-[16px] text-slate-800 font-semibold leading-relaxed mb-1" style={{ color: "#1e293b", fontWeight: 600, fontSize: "16px" }}>
                      {isEn ? item.subEn : item.subMr}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── ADD-ON FACILITIES (ACTIVITY ZONE) SECTION ── */}
          <div className="max-w-5xl mx-auto mt-12">
            {/* Badge Pill Outside Table */}
            <div className="text-center mb-4">
              <div className="as-badge-pill inline-flex items-center gap-2 px-5 py-1.5 rounded-full shadow-xs">
                <span>🌟</span>
                <span>{isEn ? "Activity Zone Add-Ons" : "ॲक्टिव्हिटी झोन ॲड-ऑन सोयी"}</span>
              </div>
            </div>

            <div className="ps-addon-wrapper bg-linear-to-br from-amber-50/80 via-white to-pink-50/80 border-2 border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
              {/* Background Decorative Glow */}
              <div className="absolute -top-12 -right-12 size-40 bg-linear-to-br from-amber-300/20 to-pink-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 text-left">
                <div className="mb-4 border-b border-amber-200/60 pb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {isEn ? "Add-On Facilities (Activity Zone)" : "ॲड-ऑन सुविधा (Activity Zone)"}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-slate-700 mb-6 bg-white/80 p-3.5 rounded-2xl border border-amber-100 shadow-xs">
                  ℹ️{" "}
                  {isEn ? (
                    <>
                      These facilities are available as <strong>Add-Ons</strong> to Individual
                      Facility Packages (cost not specified in the provided data).
                    </>
                  ) : (
                    <>
                      या सुविधा वैयक्तिक सुविधा पॅकेजेस सोबत <strong>Add-Ons (ॲड-ऑन)</strong> म्हणून
                      उपलब्ध आहेत (शुल्क पॅकेजमध्ये समाविष्ट आहे किंवा स्वतंत्र सोयीनुसार उपलब्ध).
                    </>
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
                        <span className="text-[10px] uppercase tracking-wider font-black text-pink-600 block">
                          {isEn ? "Health & Harmony" : "आरोग्य आणि सुसंवाद"}
                        </span>
                        <h4 className="font-black text-slate-900 text-base">
                          {isEn ? "Mind & Body" : "माइंड अँड बॉडी"}
                        </h4>
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
                        <span className="text-[10px] uppercase tracking-wider font-black text-indigo-600 block">
                          {isEn ? "Leisure & Fun" : "मनोरंजन आणि खेळ"}
                        </span>
                        <h4 className="font-black text-slate-900 text-base">
                          {isEn ? "Recreation" : "मनोरंजन क्षेत्र"}
                        </h4>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm font-extrabold text-slate-700">
                      <li className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-indigo-500 shrink-0"></span>
                        <span>
                          {isEn ? "Indoor Sitting Games" : "इनडोअर सिटिंग गेम्स (Sitting Games)"}
                        </span>
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
                        <span className="text-[10px] uppercase tracking-wider font-black text-emerald-600 block">
                          {isEn ? "Nature & Fitness" : "निसर्ग आणि फिटनेस"}
                        </span>
                        <h4 className="font-black text-slate-900 text-base">
                          {isEn ? "Outdoor" : "आउटडोअर सोयी"}
                        </h4>
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
                      {selectedFacility.icon}{" "}
                      {isEn ? selectedFacility.titleEn : selectedFacility.titleMr}
                    </h3>
                    <div className="sp-modal-timing">
                      {isEn ? "⏰ Timings: " : "⏰ उपलब्ध वेळ: "}
                      <strong>
                        {isEn
                          ? selectedFacility.timingEn || selectedFacility.timingMr
                          : selectedFacility.timingMr}
                      </strong>
                    </div>
                  </div>

                  <p className="sp-modal-desc">
                    {isEn
                      ? selectedFacility.descEn || selectedFacility.descMr
                      : selectedFacility.descMr}
                  </p>

                  <div className="sp-modal-features-sec">
                    <h4 className="sp-modal-features-title">
                      {isEn ? "✨ Key Features & Amenities:" : "✨ मुख्य वैशिष्ट्ये व सोयी:"}
                    </h4>
                    <ul className="sp-modal-features-list">
                      {(isEn && selectedFacility.featuresEn
                        ? selectedFacility.featuresEn
                        : selectedFacility.featuresMr
                      ).map((feat, idx) => (
                        <li key={idx} className="sp-modal-feat-item">
                          <span className="sp-feat-check">✔</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sp-modal-actions">
                    <a href={`tel:${sportsClub.phones[0]}`} className="sp-modal-btn-call">
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
            document.body,
          )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          5. ONLINE REGISTRATION ENQUIRY FORM MODAL
         ══════════════════════════════════════════════════════════════ */}
      {showRegModal &&
        createPortal(
          <div
            className="fixed inset-0 z-999999 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            onClick={() => {
              setShowRegModal(false);
              setIsSubmitted(false);
            }}
          >
            <div
              className="bg-linear-to-br from-[#1a0429] via-[#2d0739] to-[#0c0216] border-4 border-pink-500/40 rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => {
                  setShowRegModal(false);
                  setIsSubmitted(false);
                }}
                className="absolute top-4 right-4 size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition font-black cursor-pointer z-20"
                aria-label="Close"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-black mb-2 shadow-inner">
                      {isEn
                        ? "✨ Online Admission & Inquiry Registration"
                        : "✨ ऑनलाईन प्रवेश व चौकशी नोंदणी"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {isEn ? "Register for Admission Today" : "आजच प्रवेश नोंदणी करा"}
                    </h3>
                    <p className="text-xs sm:text-sm text-pink-200/80 font-bold mt-1">
                      {isEn
                        ? "Fill in the details below. Our team will contact you soon!"
                        : "खालील माहिती भरा. आमची टीम लवकरच तुमच्याशी संपर्क साधेल!"}
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
                          <option value="sports" className="bg-[#0f172a] text-white font-bold">
                            {isEn ? "Sports & Fitness Club" : "स्पोर्ट्स अँड फिटनेस क्लब"}
                          </option>
                          <option value="anandshala" className="bg-[#0f172a] text-white font-bold">
                            {isEn
                              ? "Anandshala Senior Citizen Home"
                              : "आनंदशाळा ज्येष्ठ नागरिक धाम"}
                          </option>
                          <option value="both" className="bg-[#0f172a] text-white font-bold">
                            {isEn ? "Both (Anandshala & Sports)" : "दोन्ही (आनंदशाळा व स्पोर्ट्स)"}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-pink-200 mb-1.5">
                        {isEn
                          ? "5. Special Note / Message (Optional)"
                          : "५. विशेष टीप / संदेश (पर्यायी)"}
                      </label>
                      <textarea
                        rows={2}
                        placeholder={
                          isEn
                            ? "Write your questions here..."
                            : "तुमचे काही प्रश्न असल्यास येथे लिहा..."
                        }
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/10 border-2 border-white/20 rounded-2xl px-4 py-2.5 text-white placeholder-white/40 font-bold text-sm focus:outline-none focus:border-pink-500 transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-black text-base shadow-xl hover:scale-[1.02] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
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
                    {isEn
                      ? "Congratulations! Registration Submitted."
                      : "अभिनंदन! नोंदणी सबमिट झाली."}
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
                      onClick={() => {
                        setShowRegModal(false);
                        setIsSubmitted(false);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm border border-white/20 transition"
                    >
                      {isEn ? "Close" : "बंद करा"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
