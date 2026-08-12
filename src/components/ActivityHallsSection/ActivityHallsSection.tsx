import React, { useState } from "react";
import { createPortal } from "react-dom";
import { 
  Puzzle, 
  Palette, 
  Music, 
  Monitor, 
  Ticket, 
  Waves, 
  Landmark,
  Users,
  ShieldCheck,
  Heart,
  Award,
  X,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Dumbbell,
  BookOpen,
  Utensils,
  Film,
  Smile
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/use-language";
import { HighlightText } from "@/components/HighlightText";
import "./ActivityHallsSection.css";

interface HallDetail {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: React.ReactNode;
  image: string;
  theme: string;
}

const hallsData: HallDetail[] = [
  {
    id: "०१",
    title: "सिटिंग गेम हॉल",
    category: "इनडोअर गेम्स",
    desc: "सिटिंग गेम हॉलमध्ये जाऊन कॅरम, बुद्धिबळ, पत्ते, सापाशिडी इत्यादी बैठे खेळ खेळणे.",
    icon: <Puzzle size={28} />,
    image: "/images/subimg/baithe khel.png",
    theme: "theme-pink"
  },
  {
    id: "०२",
    title: "आर्ट हॉल",
    category: "हस्तकला & चित्रकला",
    desc: "आर्ट हॉलमध्ये जाऊन चित्रकला, हस्तकला आणि विणकाम शिकणे.",
    icon: <Palette size={28} />,
    image: "/images/subimg/aart hall.png",
    theme: "theme-blue"
  },
  {
    id: "०३",
    title: "संगीत वाद्ययंत्र हॉल",
    category: "गायन व वाद्यवृंद",
    desc: "संगीत व वाद्यवृंद हॉलमध्ये जाऊन तबला, गिटार, हार्मोनियम, पेटी, पियानो, सॅक्सोफोन व बासरी शिकणे आणि संगीताचा आनंद घेणे.",
    icon: <Music size={28} />,
    image: "/images/subimg/sangit hall.png",
    theme: "theme-pink"
  },
  {
    id: "०४",
    title: "माहिती तंत्रज्ञान हॉल",
    category: "डिजिटल लर्निंग & IT",
    desc: "माहिती तंत्रज्ञान हॉलमध्ये जाऊन संगणक, लॅपटॉप, मोबाईल, इंटरनेट आणि प्रिंटर वापरण्यास शिकणे.",
    icon: <Monitor size={28} />,
    image: "/images/subimg/mahiti tantradyan hall.png",
    theme: "theme-blue"
  },
  {
    id: "०५",
    title: "मनोरंजन हॉल",
    category: "मनोरंजन & अंताक्षरी",
    desc: "मनोरंजन हॉलमध्ये जाऊन गप्पा-गोष्टी करणे, अंताक्षरी व पासिंग गेम इत्यादी समूह खेळ खेळणे.",
    icon: <Ticket size={28} />,
    image: "/images/subimg/karmnuk hall.png",
    theme: "theme-purple"
  },
  {
    id: "०६",
    title: "स्विमिंग पूल",
    category: "जलतरण & क्रिडा",
    desc: "स्विमिंग पूलमध्ये जाऊन पोहणे व पाण्यात खेळण्याचा मनसोक्त आनंद घेणे.",
    icon: <Waves size={28} />,
    image: "/images/subimg/swimming hall.png",
    theme: "theme-blue"
  },
  {
    id: "०७",
    title: "संस्कार व संप्रदाय हॉल",
    category: "संस्कार & अध्यात्म",
    desc: "संस्कार व संप्रदाय हॉलमध्ये जाऊन विविध सांस्कृतिक कार्यक्रम आणि व्हिडिओ पाहणे.",
    icon: <Landmark size={28} />,
    image: "/images/subimg/sanskar sampraday hall.png",
    theme: "theme-pink"
  },
  {
    id: "०८",
    title: "विविध खेळ हॉल",
    category: "क्रीडा व स्पोर्ट्स",
    desc: "विविध क्रीडा हॉलमध्ये जाऊन बॅडमिंटन, टेबल टेनिस, स्नूकर आणि स्क्वॅश खेळणे.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal tenis.png",
    theme: "theme-purple"
  },
  {
    id: "०९",
    title: "जिम, योगा व डान्स हॉल",
    category: "फिटनेस & योगा",
    desc: "जिम हॉलमध्ये जाऊन व्यायाम, योगासने, ध्यानधारणा, झुम्बा व नृत्य करणे.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/vyayam hall.png",
    theme: "theme-blue"
  },
  {
    id: "१०",
    title: "पाककृती हॉल",
    category: "पाककला & आस्वाद",
    desc: "पाककृती हॉलमध्ये जाऊन स्वयंपाक करणे, नाष्टा, जेवण, आईस्क्रीम, सरबते व मिठाई बनवायला शिकणे.",
    icon: <Utensils size={28} />,
    image: "/images/subimg/pakruti hall.png",
    theme: "theme-pink"
  },
  {
    id: "११",
    title: "विश्राम कक्ष",
    category: "वाचन & विश्रांती",
    desc: "विश्राम कक्षामध्ये जाऊन आरामखुर्चीवर वाचन करणे, झोपणे व शांत विश्रांती घेणे.",
    icon: <BookOpen size={28} />,
    image: "/images/subimg/vishranti hall.png",
    theme: "theme-purple"
  },
  {
    id: "१२",
    title: "थिएटर हॉल",
    category: "थिएटर & सिनेमा",
    desc: "थिएटर हॉलमध्ये जाऊन टीव्ही, चित्रपट, नाटक इत्यादी पाहणे.",
    icon: <Film size={28} />,
    image: "/images/subimg/karmnuk hall.png",
    theme: "theme-pink"
  },
  {
    id: "१३",
    title: "मंदिर हॉल",
    category: "भजन व नामस्मरण",
    desc: "मंदिर हॉलमध्ये जाऊन भजन, कीर्तन, अभंग पठण, जप आणि नामस्मरण करणे.",
    icon: <Landmark size={28} />,
    image: "/images/subimg/sanskar sampraday hall.png",
    theme: "theme-pink"
  },
  {
    id: "१४",
    title: "हास्य व कराओके हॉल",
    category: "हास्य & कराओके",
    desc: "हास्य व कराओके हॉलमध्ये जाऊन कॉमेडी, गायन कार्यक्रम आणि विनोदी व्हिडिओ पाहणे.",
    icon: <Smile size={28} />,
    image: "/images/subimg/sangit hall.png",
    theme: "theme-purple"
  }
];

const ActivityHallsSection = () => {
  const [selectedHall, setSelectedHall] = useState<HallDetail | null>(null);
  const { isEn } = useLanguage();

  return (
    <section className="ah-section" id="activity-halls">
      
      {/* Header */}
      <Reveal>
        <div className="ah-header">
          {/* Left Badge */}
          <div className="ah-badge-left">
            <Users size={60} color="white" />
          </div>
          
          {/* Right Badge */}
          <div className="ah-badge-right">
            <Award size={30} />
            <span>
              {isEn ? "Joy, Health\n& Values" : "आनंद, आरोग्य\nआणि संस्कार\nयांचा संगम"}
            </span>
          </div>

          <div className="ah-header-subtitle">
            <span style={{ color: '#db2777' }}>❖</span> {isEn ? "Anandshala's" : "आनंदशाळेतील"} <span style={{ color: '#db2777' }}>❖</span>
          </div>
          <h2 className="ah-header-title">
            <span className="text-[#db2777]">विशेष</span> <span className="blue-text">{isEn ? "Activity Halls" : "उपक्रम हॉल्स"}</span>
          </h2>
          <div className="ah-header-desc">
            {isEn
              ? "Fully equipped luxury activity halls for daily joy, recreation and wellness! (Click card to view details)"
              : "आनंदशाळेत दररोज तुमच्या आवडीनुसार मनोरंजक आनंद घेता येईल असे सुसज्जीत हॉल्स! (माहिती पाहण्यासाठी कार्डवर क्लीक करा)"}
          </div>
        </div>
      </Reveal>

      <div className="ah-container">
        {/* Grid of Clean Cards */}
        <div className="ah-grid">
          {hallsData.map((hall, index) => (
            <Reveal key={hall.id} delay={index * 60}>
              <div 
                className={`ah-card-clean ${hall.theme}`}
                onClick={() => setSelectedHall(hall)}
              >
                <div className="ah-card-num">{hall.id}</div>
                
                <div className="ah-card-img-wrapper">
                  <img src={hall.image} alt={hall.title} className="ah-card-img" />
                </div>

                <div className="ah-card-content space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="ah-card-icon">{hall.icon}</div>
                    <h3 className="ah-card-title text-base sm:text-lg font-black text-slate-900">
                      <HighlightText text={hall.title} />
                    </h3>
                  </div>

                  {/* MARATHI DESCRIPTION TEXT ON CARD */}
                  <p className="text-xs text-slate-700 font-extrabold leading-relaxed">
                    <HighlightText text={hall.desc} />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* HIGH-IMPACT ATTRACTIVE FEATURES CARDS STRIP */}
        <Reveal delay={300}>
          <div className="ah-features-strip">
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><Users size={24}/></div>
              <span>सर्व वयोगटांसाठी<br/>उपयुक्त व सोयीचे</span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><ShieldCheck size={24}/></div>
              <span>सुरक्षित आणि<br/>अत्याधुनिक सुसज्ज सुविधा</span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><Heart size={24}/></div>
              <span>आरोग्य, आनंद आणि<br/>संस्कारांचा सुंदर संगम</span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><Award size={24}/></div>
              <span>अनुभवी आणि<br/>समर्पित तज्ज्ञ टीम</span>
            </div>
          </div>
        </Reveal>

        {/* ELEGANT SLEEK CTA BUTTON */}
        <Reveal delay={400}>
          <div className="flex justify-center mt-6">
            <a href="tel:9370237633" className="ah-footer-cta-pill">
              <Sparkles size={18} className="text-amber-300 animate-pulse" />
              <span>आजच भेट द्या आणि आनंदशाळेचा अनुभव घ्या!</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          POPUP MODAL WINDOW: MARATHI DETAILS
         ══════════════════════════════════════════════════════════════ */}
      {selectedHall && typeof document !== "undefined" && createPortal(
        <div 
          className="ah-modal-overlay"
          onClick={() => setSelectedHall(null)}
        >
          <div 
            className="ah-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button 
              className="ah-modal-close-btn"
              onClick={() => setSelectedHall(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* LEFT SIDE: HIGH-RES IMAGE & BADGE */}
            <div className="ah-modal-left-img-box">
              <img src={selectedHall.image} alt={selectedHall.title} className="ah-modal-img" />
              <div className="ah-modal-img-gradient" />
              <div className="ah-modal-img-badge">
                <Sparkles size={16} className="text-amber-300" />
                <span><HighlightText text="आनंदशाळा" /> उपक्रम हॉल {selectedHall.id}</span>
              </div>
            </div>

            {/* RIGHT SIDE: MARATHI DETAILS */}
            <div className="ah-modal-right-content">
              {/* CATEGORY BADGE */}
              <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 text-[#db2777] text-xs font-black px-3.5 py-1.5 rounded-full mb-3 w-fit">
                <span>{selectedHall.category}</span>
              </div>

              {/* TITLE */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-[#db2777] shrink-0 shadow-sm">
                  {selectedHall.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  <HighlightText text={selectedHall.title} />
                </h3>
              </div>

              {/* MARATHI DESCRIPTION */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 mb-5">
                <p className="text-sm sm:text-base text-slate-800 font-extrabold leading-relaxed">
                  <HighlightText text={selectedHall.desc} />
                </p>
              </div>

              {/* CALL BUTTON */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto border-t border-slate-100">
                <a 
                  href="tel:9370237633" 
                  className="flex-1 bg-gradient-to-r from-[#810B38] to-[#db2777] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition"
                >
                  <PhoneCall size={18} />
                  <span>अधिक माहितीसाठी कॉल करा: ९३७०२३७६३३</span>
                </a>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default ActivityHallsSection;
