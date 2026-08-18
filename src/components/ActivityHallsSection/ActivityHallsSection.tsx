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
  Film
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
    categoryMr: "इनडोअर गेम्स",
    categoryEn: "Indoor Games",
    descMr: "बैठे खेळ हॉलमध्ये जाऊन कॅरम, बुद्धिबळ, पत्ते, सापाशिडी इत्यादी बैठे खेळ खेळणे.",
    descEn: "Enjoy Carrom, Chess, Cards, Snake & Ladders, and various indoor board games.",
    icon: <Puzzle size={28} />,
    image: "/images/subimg/baithe khel.png",
    theme: "theme-pink"
  },
  {
    id: "०२",
    titleMr: "कला दालन",
    titleEn: "Arts & Crafts Studio",
    categoryMr: "हस्तकला & चित्रकला",
    categoryEn: "Arts & Handicrafts",
    descMr: "कला दालनमध्ये जाऊन चित्रकला, हस्तकला आणि विणकाम शिकणे.",
    descEn: "Explore painting, handicrafts, knitting, and artistic expression.",
    icon: <Palette size={28} />,
    image: "/images/subimg/aart hall.png",
    theme: "theme-blue"
  },
  {
    id: "०३",
    titleMr: "संगीत वाद्य दालन",
    titleEn: "Music & Instruments Hall",
    categoryMr: "गायन व वाद्यवृंद",
    categoryEn: "Vocal & Instrumental Music",
    descMr: "संगीत वाद्य दालनमध्ये जाऊन तबला, गिटार, पेटी, पियानो, वीणा, ढोलकी, बासरी शिकणे आणि संगीताचा आनंद घेणे.",
    descEn: "Learn and play Tabla, Harmonium, Guitar, Piano, Veena, Dholak, and Flute.",
    icon: <Music size={28} />,
    image: "/images/subimg/sangit hall.png",
    theme: "theme-pink"
  },
  {
    id: "०४",
    titleMr: "माहिती तंत्रज्ञान हॉल",
    titleEn: "IT & Digital Learning Hub",
    categoryMr: "डिजिटल लर्निंग & IT",
    categoryEn: "Digital Literacy",
    descMr: "माहिती तंत्रज्ञान हॉलमध्ये जाऊन संगणक, लॅपटॉप, मोबाईल, इंटरनेट आणि प्रिंटर वापरण्यास शिकणे.",
    descEn: "Learn computer operations, smartphone usage, internet browsing, and digital skills.",
    icon: <Monitor size={28} />,
    image: "/images/subimg/mahiti tantradyan hall.png",
    theme: "theme-blue"
  },
  {
    id: "०५",
    titleMr: "करमणूक हॉल",
    titleEn: "Recreation & Socializing Hall",
    categoryMr: "करमणूक & अंताक्षरी",
    categoryEn: "Recreation & Antakshari",
    descMr: "करमणूक हॉलमध्ये जाऊन गप्पा-गोष्टी करणे, अंताक्षरी, पझल गेम्स, जोक्स व पासिंग गेम इत्यादी समूह खेळ खेळणे.",
    descEn: "Engage in social chit-chats, Antakshari, group games, puzzles, and fun activities.",
    icon: <Ticket size={28} />,
    image: "/images/subimg/karmnuk hall.png",
    theme: "theme-purple"
  },
  {
    id: "०६",
    titleMr: "स्विमिंग पूल",
    titleEn: "Olympic Swimming Pool",
    categoryMr: "जलतरण & क्रिडा",
    categoryEn: "Swimming & Sports",
    descMr: "स्विमिंग पूलमध्ये जाऊन पोहणे व पाण्यात खेळण्याचा मनसोक्त आनंद घेणे.",
    descEn: "Enjoy refreshing swims in the temperature-controlled Olympic swimming pool.",
    icon: <Waves size={28} />,
    image: "/images/subimg/swimming hall.png",
    theme: "theme-blue"
  },
  {
    id: "०७",
    titleMr: "संस्कार व संप्रदाय हॉल",
    titleEn: "Spiritual & Cultural Hall",
    categoryMr: "संस्कार & अध्यात्म",
    categoryEn: "Spirituality & Values",
    descMr: "संस्कार व संप्रदाय हॉलमध्ये जाऊन विविध सांस्कृतिक कार्यक्रम आणि व्हिडिओ पाहणे.",
    descEn: "Attend spiritual discourses, cultural programs, and inspiring videos.",
    icon: <Landmark size={28} />,
    image: "/images/subimg/sanskar sampraday hall.png",
    theme: "theme-pink"
  },
  {
    id: "०८",
    titleMr: "टेबल टेनिस हॉल",
    titleEn: "Table Tennis Arena",
    categoryMr: "टेबल टेनिस",
    categoryEn: "Table Tennis",
    descMr: "टेबल टेनिस हॉलमध्ये जाऊन टेबल टेनिस खेळण्याचा आनंद घेणे.",
    descEn: "Play indoor Table Tennis on competition-grade tables.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal tenis.png",
    theme: "theme-purple"
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
    image: "/images/subimg/tebal tenis.png",
    theme: "theme-blue"
  },
  {
    id: "१०",
    titleMr: "स्नूकर हॉल",
    titleEn: "Snooker & Billiards Lounge",
    categoryMr: "स्नूकर",
    categoryEn: "Snooker",
    descMr: "स्नूकर हॉलमध्ये जाऊन स्नूकर व बिलियर्ड्स खेळणे.",
    descEn: "Relax and play Snooker and Billiards in a climate-controlled lounge.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal tenis.png",
    theme: "theme-pink"
  },
  {
    id: "११",
    titleMr: "स्कॅश हॉल",
    titleEn: "Squash Court Arena",
    categoryMr: "स्कॅश कोर्ट",
    categoryEn: "Squash",
    descMr: "स्कॅश कोर्टवर जाऊन स्कॅश खेळण्याचा आनंद घेणे.",
    descEn: "Experience high-energy squash games in glass-backed courts.",
    icon: <Dumbbell size={28} />,
    image: "/images/subimg/tebal tenis.png",
    theme: "theme-purple"
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
    image: "/images/subimg/vyayam hall.png",
    theme: "theme-blue"
  },
  {
    id: "१३",
    titleMr: "योगा हॉल",
    titleEn: "Yoga & Meditation Studio",
    categoryMr: "योग व प्राणायाम",
    categoryEn: "Yoga & Wellness",
    descMr: "योगा हॉलमध्ये जाऊन तज्ज्ञांच्या मार्गदर्शनाखाली दररोज योगासने व प्राणायाम करणे.",
    descEn: "Practice daily Yoga, Pranayama, and Mindful Meditation.",
    icon: <Sparkles size={28} />,
    image: "/images/subimg/vyayam hall.png",
    theme: "theme-pink"
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
    image: "/images/subimg/vyayam hall.png",
    theme: "theme-purple"
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
    image: "/images/subimg/pakruti hall.png",
    theme: "theme-pink"
  },
  {
    id: "१६",
    titleMr: "विश्रांती हॉल",
    titleEn: "Relaxation & Reading Lounge",
    categoryMr: "वाचन & विश्रांती",
    categoryEn: "Reading & Rest",
    descMr: "विश्रांती हॉलमध्ये जाऊन आरामखुर्चीवर वाचन करणे, झोपणे व शांत विश्रांती घेणे.",
    descEn: "Relax on recliners, read newspapers, or enjoy a peaceful afternoon nap.",
    icon: <BookOpen size={28} />,
    image: "/images/subimg/vishranti hall.png",
    theme: "theme-purple"
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
    image: "/images/subimg/karmnuk hall.png",
    theme: "theme-pink"
  }
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

  const activeHalls: HallDetail[] =
    store.siteData.activityHalls && store.siteData.activityHalls.length > 0
      ? store.siteData.activityHalls.map((h, idx) => {
          const fallback = hallsData[idx];
          return {
            id: String(idx + 1).padStart(2, "0"),
            titleMr: h.title,
            titleEn: fallback ? fallback.titleEn : h.title,
            categoryMr: h.category,
            categoryEn: fallback ? fallback.categoryEn : h.category,
            descMr: h.desc,
            descEn: fallback ? fallback.descEn : h.desc,
            icon: fallback?.icon || <Sparkles size={28} />,
            image: h.imageUrl || fallback?.image || "/images/slider1.JPG",
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
            <span>
              {isEn ? "Joy, Health\n& Values" : "आनंद, आरोग्य\nआणि संस्कार\nयांचा संगम"}
            </span>
          </div>

          <div className="ah-header-subtitle">
            <span style={{ color: '#db2777' }}>❖</span> {isEn ? <><span className="text-[#db2777] font-black">Anandshala's</span></> : <><span className="text-[#db2777] font-black">आनंदशाळेतील</span></>} <span style={{ color: '#db2777' }}>❖</span>
          </div>
          <h2 className="ah-header-title text-[26px] sm:text-[36px] md:text-[42px] text-[#0044cc]">
            <span className="blue-text">{isEn ? "Special Activity Halls" : "विशेष उपक्रम हॉल्स"}</span>
          </h2>
          <div className="ah-header-desc">
            <p className="ah-header-desc-text">
              {isEn
                ? "Fully equipped luxury activity halls for daily joy, recreation and wellness!"
                : <><span className="text-[#db2777] font-black">आनंदशाळेत</span> दररोज तुमच्या आवडीनुसार मनोरंजन करून आनंद घेता येईल असे सुसज्जीत हॉल्स!</>}
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
                    <img src={hall.image} alt={title} className="ah-card-img" />
                  </div>

                  <div className="ah-card-content space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="ah-card-icon">{hall.icon}</div>
                      <h3 className="ah-card-title text-base sm:text-lg font-black text-slate-900">
                        <HighlightText text={title} />
                      </h3>
                    </div>

                    <p className="text-xs text-slate-700 font-extrabold leading-relaxed">
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
              <div className="ah-feature-icon"><Users size={24} /></div>
              <span>{isEn ? <>Suitable for 55+<br />Senior Citizens</> : <>५५+ वयोगटातील<br />ज्येष्ठ नागरिकांसाठी उपयुक्त</>}</span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><ShieldCheck size={24} /></div>
              <span>{isEn ? <>Safe &amp; Modern<br />Equipped Facilities</> : <>सुरक्षित आणि<br />अत्याधुनिक सुसज्ज सुविधा</>}</span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><Heart size={24} /></div>
              <span>{isEn ? <>Blending Health,<br />Joy &amp; Values</> : <>आरोग्य, आनंद आणि<br />संस्कारांचा सुंदर संगम</>}</span>
            </div>
            <div className="ah-feature-item">
              <div className="ah-feature-icon"><Award size={24} /></div>
              <span>{isEn ? <>Experienced &amp;<br />Dedicated Team</> : <>अनुभवी आणि<br />समर्पित तज्ज्ञ टीम</>}</span>
            </div>
          </div>
        </Reveal>

        {/* ELEGANT SLEEK CTA BUTTON */}
        <Reveal delay={400}>
          <div className="flex justify-center mt-6">
            <a href="tel:9370237633" className="ah-footer-cta-pill">
              <Sparkles size={18} className="text-amber-300 animate-pulse" />
              <span>{isEn ? "Visit Today & Experience Anandshala!" : "आजच भेट द्या आणि आनंदशाळेचा अनुभव घ्या!"}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          POPUP MODAL WINDOW DETAILS
         ══════════════════════════════════════════════════════════════ */}
      {selectedHall && typeof document !== "undefined" && createPortal(
        <div
          className="ah-modal-overlay"
          onClick={() => setSelectedHall(null)}
        >
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
              <X size={20} />
            </button>

            {/* LEFT SIDE: HIGH-RES IMAGE & BADGE */}
            <div className="ah-modal-left-img-box">
              <img src={selectedHall.image} alt={isEn ? selectedHall.titleEn : selectedHall.titleMr} className="ah-modal-img" />
              <div className="ah-modal-img-gradient" />
              <div className="ah-modal-img-badge">
                <Sparkles size={16} className="text-amber-300" />
                <span>
                  {isEn ? (
                    <><span className="text-pink-400 font-black">Anandshala</span> Hall {selectedHall.id}</>
                  ) : (
                    <><span className="text-pink-400 font-black">आनंदशाळा</span> उपक्रम हॉल {selectedHall.id}</>
                  )}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE: DETAILS */}
            <div className="ah-modal-right-content">
              {/* CATEGORY BADGE */}
              <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-200 text-[#db2777] text-xs font-black px-3.5 py-1.5 rounded-full mb-3 w-fit">
                <span>{isEn ? selectedHall.categoryEn : selectedHall.categoryMr}</span>
              </div>

              {/* TITLE */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-[#db2777] shrink-0 shadow-sm">
                  {selectedHall.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  <HighlightText text={isEn ? selectedHall.titleEn : selectedHall.titleMr} />
                </h3>
              </div>

              {/* DESCRIPTION */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 mb-5">
                <p className="text-sm sm:text-base text-slate-800 font-extrabold leading-relaxed">
                  <HighlightText text={isEn ? selectedHall.descEn : selectedHall.descMr} />
                </p>
              </div>

              {/* CALL BUTTON */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto border-t border-slate-100">
                <a
                  href="tel:9370237633"
                  className="flex-1 bg-gradient-to-r from-[#810B38] to-[#db2777] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition"
                >
                  <PhoneCall size={18} />
                  <span>{isEn ? "Call for details: 9370237633" : "अधिक माहितीसाठी कॉल करा: ९३७०२३७६३३"}</span>
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
