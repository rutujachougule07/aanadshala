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
  MessageCircle,
  ArrowRight,
  Dumbbell,
  BookOpen,
  Utensils,
  Film,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/use-language";
import { useAdminStore } from "@/lib/admin-store";
import { HighlightText } from "@/components/HighlightText";
import "./ActivityHallsSection.css";

interface HallDetail {
  id: string;
  titleMr: string;
  titleEn: string;
  categoryMr: string;
  categoryEn: string;
  descMr: string;
  descEn: string;
  icon: React.ReactNode;
  image: string;
  theme: string;
}

const hallsData: HallDetail[] = [
  {
    id: "०१",
    titleMr: "बैठे खेळ हॉल",
    titleEn: "Indoor Games Hall",
    categoryMr: "कॅरम, बुद्धिबळ व इनडोअर खेळ",
    categoryEn: "Carrom, Chess & Indoor Games",
    descMr: "बैठे खेळ हॉलमध्ये जाऊन कॅरम, बुद्धिबळ, पत्ते, सापाशिडी इत्यादी बैठे खेळ खेळणे.",
    descEn: "Enjoy Carrom, Chess, Cards, Snake & Ladders, and various indoor board games.",
    icon: <Puzzle size={28} />,
    image: "/images/subimg/baithe-khel.png",
    theme: "theme-pink",
  },
  {
    id: "०२",
    titleMr: "कला दालन",
    titleEn: "Arts & Crafts Hall",
    categoryMr: "चित्रकला, हस्तकला व विणकाम",
    categoryEn: "Painting, Crafts & Knitting",
    descMr: "कला दालनमध्ये जाऊन चित्रकला, हस्तकला आणि विणकाम शिकणे.",
    descEn: "Explore painting, handicrafts, knitting, and artistic expression.",
    icon: <Palette size={28} />,
    image: "/images/subimg/aart-hall.png",
    theme: "theme-blue",
  },
  {
    id: "०३",
    titleMr: "संगीत वाद्य दालन",
    titleEn: "Music & Instruments Hall",
    categoryMr: "तबला, गिटार, पेटी व संगीत आनंद",
    categoryEn: "Harmonium, Tabla & Music",
    descMr:
      "संगीत वाद्य दालनमध्ये जाऊन तबला, गिटार, पेटी, पियानो, वीणा, ढोलकी, बासरी शिकणे आणि संगीताचा आनंद घेणे.",
    descEn: "Learn and play Tabla, Harmonium, Guitar, Piano, Veena, Dholak, and Flute.",
    icon: <Music size={28} />,
    image: "/images/subimg/sangit-hall.png",
    theme: "theme-pink",
  },
  {
    id: "०४",
    titleMr: "माहिती तंत्रज्ञान हॉल",
    titleEn: "IT & Digital Learning Hall",
    categoryMr: "संगणक, मोबाईल व IT ट्रेनिंग",
    categoryEn: "Computer, Mobile & IT Literacy",
    descMr:
      "माहिती तंत्रज्ञान हॉलमध्ये जाऊन संगणक, लॅपटॉप, मोबाईल, इंटरनेट आणि प्रिंटर वापरण्यास शिकणे.",
    descEn: "Learn computer operations, smartphone usage, internet browsing, and digital skills.",
    icon: <Monitor size={28} />,
    image: "/images/subimg/mahiti-tantradyan-hall.png",
    theme: "theme-blue",
  },
  {
    id: "०५",
    titleMr: "करमणूक हॉल",
    titleEn: "Recreation & Socializing Hall",
    categoryMr: "अंताक्षरी, गप्पा-गोष्टी व समूह खेळ",
    categoryEn: "Antakshari, Group Games & Fun",
    descMr:
      "करमणूक हॉलमध्ये जाऊन गप्पा-गोष्टी करणे, अंताक्षरी, पझल गेम्स, जोक्स व पासिंग गेम इत्यादी समूह खेळ खेळणे.",
    descEn: "Engage in social chit-chats, Antakshari, group games, puzzles, and fun activities.",
    icon: <Ticket size={28} />,
    image: "/images/subimg/karmnuk-hall.png",
    theme: "theme-purple",
  },
  {
    id: "०६",
    titleMr: "स्विमिंग पूल",
    titleEn: "Olympic Swimming Pool",
    categoryMr: "ऑलिंपिक मानकांचा स्वच्छ पूल",
    categoryEn: "Olympic Size Clean Pool",
    descMr: "स्विमिंग पूलमध्ये जाऊन पोहणे व पाण्यात खेळण्याचा मनसोक्त आनंद घेणे.",
    descEn: "Enjoy refreshing swims in the temperature-controlled Olympic swimming pool.",
    icon: <Waves size={28} />,
    image: "/images/subimg/swimming-hall.png",
    theme: "theme-blue",
  },
  {
    id: "०७",
    titleMr: "संस्कार व संप्रदाय हॉल",
    titleEn: "Spiritual & Cultural Hall",
    categoryMr: "सांस्कृतिक कार्यक्रम व अध्यात्म",
    categoryEn: "Cultural & Spiritual Events",
    descMr: "संस्कार व संप्रदाय हॉलमध्ये जाऊन विविध सांस्कृतिक कार्यक्रम आणि व्हिडिओ पाहणे.",
    descEn: "Attend spiritual discourses, cultural programs, and inspiring videos.",
    icon: <Landmark size={28} />,
    image: "/images/subimg/sanskar-sampraday-hall.png",
    theme: "theme-pink",
  },
  {
    id: "०८",
    titleMr: "टेबल टेनिस हॉल",
    titleEn: "Table Tennis Hall",
    categoryMr: "टेबल टेनिस व इनडोअर स्पोर्ट्स",
    categoryEn: "Table Tennis & Indoor Sports",
    descMr: "टेबल टेनिस हॉलमध्ये जाऊन टेबल टेनिस खेळण्याचा आनंद घेणे.",
    descEn: "Play indoor Table Tennis on competition-grade tables.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal-tenis.png",
    theme: "theme-purple",
  },
  {
    id: "०९",
    titleMr: "बॅडमिंटन हॉल",
    titleEn: "Indoor Badminton Court",
    categoryMr: "बॅडमिंटन",
    categoryEn: "Badminton",
    descMr: "बॅडमिंटन कोर्टवर जाऊन बॅडमिंटन खेळण्याचा आनंद घेणे.",
    descEn: "Play badminton on synthetic wooden-floored indoor courts.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal-tenis.png",
    theme: "theme-blue",
  },
  {
    id: "१०",
    titleMr: "स्नूकर हॉल",
    titleEn: "Snooker & Billiards Hall",
    categoryMr: "स्नूकर",
    categoryEn: "Snooker",
    descMr: "स्नूकर हॉलमध्ये जाऊन स्नूकर व बिलियर्ड्स खेळणे.",
    descEn: "Relax and play Snooker and Billiards in a climate-controlled hall.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal-tenis.png",
    theme: "theme-pink",
  },
  {
    id: "११",
    titleMr: "स्कॅश हॉल",
    titleEn: "Squash Court",
    categoryMr: "स्कॅश कोर्ट",
    categoryEn: "Squash",
    descMr: "स्कॅश कोर्टवर जाऊन स्कॅश खेळण्याचा आनंद घेणे.",
    descEn: "Experience high-energy squash games in glass-backed courts.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal-tenis.png",
    theme: "theme-purple",
  },
  {
    id: "१२",
    titleMr: "जिम हॉल",
    titleEn: "Hi-Tech AC Gym",
    categoryMr: "व्यायाम & फिटनेस",
    categoryEn: "Gym & Fitness",
    descMr: "आधुनिक उपकरणांनी सुसज्ज जिम हॉलमध्ये जाऊन व्यायाम व फिटनेस सराव करणे.",
    descEn: "Work out using modern imported fitness machinery under expert guidance.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/vyayam-hall.png",
    theme: "theme-blue",
  },
  {
    id: "१३",
    titleMr: "योगा हॉल",
    titleEn: "Yoga & Meditation Hall",
    categoryMr: "योग व प्राणायाम",
    categoryEn: "Yoga & Wellness",
    descMr: "योगा हॉलमध्ये जाऊन तज्ज्ञांच्या मार्गदर्शनाखाली दररोज योगासने व प्राणायाम करणे.",
    descEn: "Practice daily Yoga, Pranayama, and Mindful Meditation.",
    icon: <Sparkles size={28} />,
    image: "/images/subimg/vyayam-hall.png",
    theme: "theme-pink",
  },
  {
    id: "१४",
    titleMr: "झुम्बा हॉल",
    titleEn: "Zumba & Aerobics Hall",
    categoryMr: "झुम्बा & फिटनेस",
    categoryEn: "Zumba Dance",
    descMr: "झुम्बा हॉलमध्ये जाऊन संगीताच्या तालावर झुम्बा आणि फिटनेस सराव करणे.",
    descEn: "Enjoy rhythmic Zumba dance sessions designed for active health.",
    icon: <Music size={28} />,
    image: "/images/subimg/vyayam-hall.png",
    theme: "theme-purple",
  },
  {
    id: "१५",
    titleMr: "भोजन कक्ष",
    titleEn: "Annapurna Food Court",
    categoryMr: "भोजन & आस्वाद",
    categoryEn: "Dining Court",
    descMr: "भोजन कक्षामध्ये जाऊन चहा, नाश्ता आणि जेवण करणे.",
    descEn: "Enjoy delicious, hygienic, and nutritious vegetarian meals & snacks.",
    icon: <Utensils size={28} />,
    image: "/images/subimg/pakruti-hall.png",
    theme: "theme-pink",
  },
  {
    id: "१६",
    titleMr: "विश्रांती हॉल",
    titleEn: "Relaxation & Reading Hall",
    categoryMr: "वाचन & विश्रांती",
    categoryEn: "Reading & Rest",
    descMr: "विश्रांती हॉलमध्ये जाऊन आरामखुर्चीवर वाचन करणे, झोपणे व शांत विश्रांती घेणे.",
    descEn: "Relax on recliners, read newspapers, or enjoy a peaceful afternoon nap.",
    icon: <BookOpen size={28} />,
    image: "/images/subimg/vishranti-hall.png",
    theme: "theme-purple",
  },
  {
    id: "१७",
    titleMr: "थिएटर हॉल",
    titleEn: "Mini Theatre Hall",
    categoryMr: "थिएटर & सिनेमा",
    categoryEn: "Cinema & Theatre",
    descMr: "थिएटर हॉलमध्ये जाऊन टीव्ही, चित्रपट, नाटक इत्यादी पाहणे.",
    descEn: "Watch classic movies, TV shows, dramas & cultural performances.",
    icon: <Film size={28} />,
    image: "/images/subimg/karmnuk-hall.png",
    theme: "theme-pink",
  },
];

const ActivityHallsSection = () => {
  const [selectedHall, setSelectedHall] = useState<HallDetail | null>(null);
  const { isEn, formatNum } = useLanguage();
  const store = useAdminStore();

  React.useEffect(() => {
    if (selectedHall) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedHall]);

  const isGenericStageImage = (url: string) => {
    if (!url) return true;
    const lower = url.toLowerCase();
    return (
      lower.includes("screenshot") ||
      lower.includes("imgever") ||
      lower.includes("gallery imgage") ||
      lower.includes("gallery image") ||
      lower.includes("anadshala original") ||
      lower.includes("slider2") ||
      lower.includes("slider4")
    );
  };

  const activeHalls: HallDetail[] =
    store.siteData.activityHalls && store.siteData.activityHalls.length > 0
      ? store.siteData.activityHalls.map((h, idx) => {
        const fallback = hallsData[idx] || hallsData[0];
        const rawImg =
          h.imageUrl && !isGenericStageImage(h.imageUrl)
            ? h.imageUrl
            : fallback.image;
        const cleanImg =
          rawImg.startsWith("data:") ||
          rawImg.startsWith("http:") ||
          rawImg.startsWith("https:") ||
          rawImg.startsWith("blob:") ||
          rawImg.startsWith("/")
            ? rawImg
            : encodeURI(rawImg.replace(/ /g, "-"));
        return {
          id: String(idx + 1).padStart(2, "0"),
          titleMr: h.title,
          titleEn: fallback ? fallback.titleEn : h.title,
          categoryMr: h.category,
          categoryEn: fallback ? fallback.categoryEn : h.category,
          descMr: h.desc,
          descEn: fallback ? fallback.descEn : h.desc,
          icon: fallback?.icon || <Sparkles size={28} />,
          image: cleanImg,
          theme: fallback?.theme || (idx % 2 === 0 ? "theme-pink" : "theme-blue"),
        };
      })
      : hallsData;

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
            <span>{isEn ? "Joy, Health\n& Values" : "आनंद, आरोग्य\nआणि संस्कार\nयांचा संगम"}</span>
          </div>

          <div className="as-badge-pill inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span>{isEn ? "Special Activity Halls" : "विशेष उपक्रम हॉल्स"}</span>
          </div>

          <h2 className="text-2xl sm:text-[35px] font-black text-[#1a05a2] leading-snug tracking-tight text-center mb-3 mt-0" style={{ fontSize: "35px", fontWeight: 900 }}>
            {isEn ? (
              <>
                <span className="text-[#db2777]">Anandshala's</span> Special Activity Halls
              </>
            ) : (
              <>
                <span className="text-[#db2777]">आनंदशाळेतील</span> विशेष उपक्रम हॉल्स
              </>
            )}
          </h2>
          <div className="ah-header-desc">
            <p className="ah-header-desc-text text-[16px] !font-[300] text-black mt-3" style={{ fontSize: "16px", fontWeight: 300, color: "#000000" }}>
              {isEn ? (
                "Fully equipped luxury activity halls for daily joy, recreation and wellness!"
              ) : (
                <>
                  <span className="text-[#db2777] font-black">आनंदशाळेत</span> दररोज तुमच्या
                  आवडीनुसार मनोरंजन करून आनंद घेता येईल असे सुसज्जीत हॉल्स!
                </>
              )}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="ah-container">
        {/* Grid of Clean Cards */}
        <div className="ah-grid">
          {activeHalls.map((hall, index) => {
            const title = isEn ? hall.titleEn : hall.titleMr;
            const desc = isEn ? hall.descEn : hall.descMr;

            return (
              <Reveal key={hall.id} delay={index * 60}>
                <div
                  className={`ah-card-clean ${hall.theme}`}
                  onClick={() => setSelectedHall(hall)}
                >
                  <div className="ah-card-num">{formatNum(hall.id)}</div>

                  <div className="ah-card-img-wrapper">
                    <img
                      src={hall.image}
                      alt={title}
                      className="ah-card-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/slider1.JPG";
                      }}
                    />
                  </div>

                  <div className="ah-card-content">
                    <div className="ah-card-icon text-2xl font-black shadow-md">{hall.icon}</div>

                    <h3 className="ah-card-title">
                      <HighlightText text={title} />
                    </h3>

                    <p className="text-[16px] text-slate-800 font-semibold leading-relaxed mb-1" style={{ color: "#1e293b", fontWeight: 600, fontSize: "16px" }}>
                      <HighlightText text={desc} />
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* HIGH-IMPACT ATTRACTIVE FEATURES CARDS STRIP */}
        <Reveal delay={300}>
          <div className="ah-features-strip">
            <div className="ah-feature-item">
              <div className="ah-feature-icon">
                <Users size={24} />
              </div>
              <span>
                {isEn ? (
                  <>
                    Suitable for 55+
                    <br />
                    Senior Citizens
                  </>
                ) : (
                  <>
                    ५५+ वयोगटातील
                    <br />
                    ज्येष्ठ नागरिकांसाठी उपयुक्त
                  </>
                )}
              </span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon">
                <ShieldCheck size={24} />
              </div>
              <span>
                {isEn ? (
                  <>
                    Safe &amp; Modern
                    <br />
                    Equipped Facilities
                  </>
                ) : (
                  <>
                    सुरक्षित आणि
                    <br />
                    अत्याधुनिक सुसज्ज सुविधा
                  </>
                )}
              </span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon">
                <Heart size={24} />
              </div>
              <span>
                {isEn ? (
                  <>
                    Blending Health,
                    <br />
                    Joy &amp; Values
                  </>
                ) : (
                  <>
                    आरोग्य, आनंद आणि
                    <br />
                    संस्कारांचा सुंदर संगम
                  </>
                )}
              </span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon">
                <Award size={24} />
              </div>
              <span>
                {isEn ? (
                  <>
                    Experienced &amp;
                    <br />
                    Dedicated Team
                  </>
                ) : (
                  <>
                    अनुभवी आणि
                    <br />
                    समर्पित तज्ज्ञ टीम
                  </>
                )}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ELEGANT SLEEK CTA BUTTON */}
        <Reveal delay={400}>
          <div className="flex justify-center mt-6">
            <a
              href={`https://wa.me/919970079090?text=${encodeURIComponent(
                isEn
                  ? "Hi, I want information regarding Anandshala Special Activity Halls (Timings, facilities & entry details). Please share."
                  : "नमस्कार, मला प्रीतम आनंदशाळेतील विशेष उपक्रम हॉल्सची वेळ, उपलब्ध सुविधा व प्रवेशाबाबत माहिती हवी आहे. कृपया माहिती द्यावी.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ah-footer-cta-pill"
            >
              <Sparkles size={18} className="text-amber-300 animate-pulse" />
              <span>
                {isEn
                  ? "Inquire Activity Halls on WhatsApp (9970079090)"
                  : "हॉल्सची वेळ व सुविधांबाबत WhatsApp चौकशी करा (9970079090)"}
              </span>
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          POPUP MODAL WINDOW DETAILS
         ══════════════════════════════════════════════════════════════ */}
      {selectedHall &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="ah-modal-overlay" onClick={() => setSelectedHall(null)}>
            <div
              className="ah-modal-card"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* CLOSE BUTTON */}
              <button
                className="ah-modal-close-btn"
                onClick={() => setSelectedHall(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* HERO IMAGE BANNER */}
              <div className="ah-modal-left-img-box">
                <img
                  src={selectedHall.image}
                  alt={isEn ? selectedHall.titleEn : selectedHall.titleMr}
                  className="ah-modal-img"
                />
                <div className="ah-modal-img-gradient" />
                <div className="ah-modal-img-badge">
                  <Sparkles size={14} className="text-amber-300 animate-pulse" />
                  <span>
                    {isEn ? (
                      <>
                        <span className="text-pink-300 font-black">Anandshala</span> Hall{" "}
                        {selectedHall.id}
                      </>
                    ) : (
                      <>
                        <span className="text-pink-300 font-black">आनंदशाळा</span> उपक्रम हॉल{" "}
                        {selectedHall.id}
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* DETAILS CONTENT BODY */}
              <div className="ah-modal-right-content space-y-4 bg-gradient-to-b from-white via-pink-50/20 to-white">
                {/* CATEGORY BADGE */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#810B38] to-[#db2777] text-white text-xs font-black px-4 py-1.5 rounded-full w-fit shadow-md shadow-pink-600/20 tracking-wide">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>{isEn ? selectedHall.categoryEn : selectedHall.categoryMr}</span>
                </div>

                {/* TITLE WITH LUXURY ICON */}
                <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-3.5 pt-0.5">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#810B38] via-[#a21249] to-[#db2777] text-white flex items-center justify-center shrink-0 shadow-lg shadow-pink-600/25 border border-white/20 text-xl mx-auto sm:mx-0">
                    {selectedHall.icon}
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#541a1a] leading-tight tracking-tight text-center sm:text-left">
                      <HighlightText text={isEn ? selectedHall.titleEn : selectedHall.titleMr} />
                    </h3>
                    <p className="text-xs font-extrabold text-[#be185d] mt-1 text-center sm:text-left">
                      {isEn ? "Preetam Senior Citizen Anandshala Facility" : "प्रीतम ज्येष्ठ नागरिक आनंदशाळा विशेष सुविधा"}
                    </p>
                  </div>
                </div>

                {/* ACCENTUATED DESCRIPTION BOX (CENTER ALIGNED TEXT) */}
                <div className="px-5 py-4.5 sm:px-6 sm:py-5 rounded-2xl bg-gradient-to-br from-pink-50/80 via-rose-50/50 to-purple-50/30 border border-pink-200/90 shadow-xs relative overflow-hidden text-center flex flex-col items-center justify-center my-1">
                  <p
                    className="text-[16px] sm:text-[17px] text-slate-800 font-bold leading-[1.8] text-center max-w-xl mx-auto"
                    style={{ fontFamily: "'Mukta', sans-serif", fontSize: "16.5px", fontWeight: 700, lineHeight: "1.8", color: "#1e293b" }}
                  >
                    <HighlightText text={isEn ? selectedHall.descEn : selectedHall.descMr} />
                  </p>
                </div>

                {/* CALL & WHATSAPP BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 mt-auto border-t border-slate-100">
                  <a
                    href={`https://wa.me/919970079090?text=${encodeURIComponent(
                      isEn
                        ? `Hi, I want information regarding Anandshala ${selectedHall.titleEn} (Hall timings, facilities & membership access). Please share details.`
                        : `नमस्कार, मला प्रीतम आनंदशाळेतील '${selectedHall.titleMr}' (हॉलची वेळ, सुविधा व प्रवेशाबाबत) अधिक माहिती हवी आहे. कृपया माहिती द्यावी.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <MessageCircle size={18} />
                    <span>
                      {isEn
                        ? "Inquire Hall Timings & Access (WhatsApp)"
                        : "हॉल वेळ व प्रवेशाबाबत WhatsApp करा (9970079090)"}
                    </span>
                  </a>
                  <a
                    href="tel:9970079090"
                    className="bg-gradient-to-r from-[#810B38] to-[#db2777] hover:from-[#9c0d45] hover:to-[#f472b6] text-white font-black text-xs sm:text-sm py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
                  >
                    <PhoneCall size={18} />
                    <span>{isEn ? "Call" : "कॉल करा"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};

export default ActivityHallsSection;
