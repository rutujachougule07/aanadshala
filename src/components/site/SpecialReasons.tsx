import React, { useState } from "react";
import {
  BookOpen,
  Lightbulb,
  HandHeart,
  UsersRound,
  Handshake,
  Target,
  Heart,
  Sparkles,
  Smile,
  ShieldCheck,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/lib/use-language";
import "./SpecialReasons.css";

/* ─── Raw reasons data ─── */
const rawReasons = [
  {
    number: "01",
    mr: "माझ्या मनातील व जीवनातील राहून गेलेल्या बऱ्याच गोष्टी, खेळ, आवडी-निवडी मला आनंदाने करण्यासाठी.",
    en: "To happily fulfill lifelong unfulfilled hobbies, games, and passions.",
    icon: "book",
    color: "#E5A315",
    cats: ["all", "anand"],
  },
  {
    number: "02",
    mr: "मला माझ्या मनासारखे आनंदी व स्वावलंबी जीवन जगता येण्यासाठी.",
    en: "To live a happy and self-reliant life on my own terms.",
    icon: "hand",
    color: "#F47D22",
    cats: ["all", "swatantrya"],
  },
  {
    number: "03",
    mr: "माझ्या कलागुणांना वाव, मानधन व आत्मसन्मान मिळण्यासाठी.",
    en: "To showcase my artistic talents, earn stipends, and gain self-dignity.",
    icon: "people",
    color: "#E64248",
    cats: ["all", "swatantrya"],
  },
  {
    number: "04",
    mr: "कोणाच्या बंधनात राहून, मन मारून, चार भिंतीत एकटेपणाने जीवन जगावे लागणार नाही यासाठी.",
    en: "To avoid living in restriction, solitude, or suppressed desires within 4 walls.",
    icon: "target",
    color: "#981867",
    cats: ["all", "swatantrya"],
  },
  {
    number: "05",
    mr: "घरी एक-दोघे राहून, साहित्य आणून, विश्वास ठेवून जीवन जगणे जास्त खर्चिक व त्रासाचे असते, हे समजण्यासाठी.",
    en: "To realize that living alone at home is costly & stressful.",
    icon: "heart",
    color: "#0D9488",
    cats: ["all", "suvidha"],
  },
  {
    number: "06",
    mr: "आयुष्याला त्रासून-कष्टून मरण मागावे लागणार नाही यासाठी.",
    en: "To live golden years with joy instead of feeling exhausted or hopeless.",
    icon: "sparkles",
    color: "#4F46E5",
    cats: ["all", "aarogya"],
  },
  {
    number: "07",
    mr: "एकटेपणाला कंटाळून नैराश्य, चिडचिड होणार नाही यासाठी.",
    en: "To overcome loneliness, depression, and irritability effortlessly.",
    icon: "smile",
    color: "#E11D48",
    cats: ["all", "aarogya"],
  },
  {
    number: "08",
    mr: "घरगुती कटकटी, अबोला, त्रास व भांडणापासून मुक्ती मिळवण्यासाठी.",
    en: "To get relief from domestic stress, silence, and daily friction.",
    icon: "shield",
    color: "#D97706",
    cats: ["all", "swatantrya"],
  },
  {
    number: "09",
    mr: "स्वतः कमावलेल्या पैशांचा थोडातरी स्वतःसाठी उपभोग घेण्यासाठी.",
    en: "To enjoy at least a portion of hard-earned savings for oneself.",
    icon: "star",
    color: "#059669",
    cats: ["all", "anand"],
  },
  {
    number: "10",
    mr: "जीवनाची सायंकाळ आनंदाने उत्साहाने मनसोक्त जगून करण्यासाठी.",
    en: "To spend the evening of life enthusiastically and to the fullest.",
    icon: "award",
    color: "#7C3AED",
    cats: ["all", "anand"],
  },
  {
    number: "11",
    mr: "आप्तजन व स्वतःसाठी खूप गरजेची व अभिमानास्पद गोष्ट आहे.",
    en: "A deeply essential and proud step for oneself and loved ones.",
    icon: "hand",
    color: "#E5A315",
    cats: ["all", "nate"],
  },
  {
    number: "12",
    mr: "दूर राहून प्रेम, आपुलकी, जिव्हाळा व नातेसंबंध वाढवण्यासाठी.",
    en: "To nurture deeper love, affection, and strong family relationships.",
    icon: "heart",
    color: "#F47D22",
    cats: ["all", "nate"],
  },
  {
    number: "13",
    mr: "आपल्या वयाच्या विचारांच्या मित्र-मैत्रिणींसोबत आनंदाने स्वाभिमानाने जगण्यासाठी.",
    en: "To live with self-respect alongside like-minded peers of one's age.",
    icon: "people",
    color: "#E64248",
    cats: ["all", "nate", "anand"],
  },
  {
    number: "14",
    mr: "मनसोक्त जीवन जगता आले म्हणून देवाचे आभार मानण्यासाठी.",
    en: "To thank God for a joyful, energetic, and independent life.",
    icon: "sparkles",
    color: "#981867",
    cats: ["all", "prerana"],
  },
  {
    number: "15",
    mr: "पैसा नसला तरी श्रमदान करून आनंदी जीवन कसे जगता येते ते दाखवण्यासाठी.",
    en: "To demonstrate how joyful life can be lived through voluntary contribution.",
    icon: "smile",
    color: "#0D9488",
    cats: ["all", "prerana"],
  },
  {
    number: "16",
    mr: "पैसा म्हणजे सर्वकाही नाही, मानवता धर्म व इतरांसाठी जगणे शिकण्यासाठी.",
    en: "To learn that money isn't everything; humanity & living for others matters.",
    icon: "target",
    color: "#4F46E5",
    cats: ["all", "prerana"],
  },
  {
    number: "17",
    mr: "मानव जन्म मिळाला ते आनंदाने जीवन जगण्यासाठी.",
    en: "To honor human birth by living every single day happily.",
    icon: "star",
    color: "#E11D48",
    cats: ["all", "aarogya", "prerana"],
  },
  {
    number: "18",
    mr: "आपल्या माणसांवर रुसणे, अबोला, ओझे होण्यासाठी जीवन नाही हे सिद्ध करण्यासाठी.",
    en: "To prove life isn't meant for resentment or becoming a burden on anyone.",
    icon: "shield",
    color: "#D97706",
    cats: ["all", "swatantrya"],
  },
  {
    number: "19",
    mr: "नातेवाईक, लोक काय म्हणतील याचा विचार करू नका, स्वतःच्या आनंदासाठी आजच प्रवेश घ्या.",
    en: "Do not worry what society says — take admission for your own happiness.",
    icon: "award",
    color: "#059669",
    cats: ["all", "swatantrya", "anand"],
  },
  {
    number: "20",
    mr: "कल्पना न केलेले, कधी न उपभोगलेले, आपलेपण काय असते ते अनुभवण्यासाठी.",
    en: "To experience true warmth and belonging never imagined before.",
    icon: "book",
    color: "#7C3AED",
    cats: ["all", "anand", "nate"],
  },
  {
    number: "21",
    mr: "पैसा असून सुद्धा सर्व सुखसोई विकत घेऊ शकत नाहीत परंतु येथे घेऊ शकतो ते दाखवण्यासाठी.",
    en: "To experience comforts money alone cannot buy at home.",
    icon: "hand",
    color: "#E5A315",
    cats: ["all", "suvidha"],
  },
  {
    number: "22",
    mr: "प्रचंड पैसा असून सुद्धा ह्या सर्व सोयी सुविधा स्वतःच्या घरात करू शकत नाही हे लक्षात घेण्यासाठी.",
    en: "To realize that even with wealth, a 1.5-acre hub at home is impossible.",
    icon: "target",
    color: "#F47D22",
    cats: ["all", "suvidha"],
  },
  {
    number: "23",
    mr: "आपल्या वयाच्या लोकांसोबत गप्पा-गोष्टी-खेळ खेळण्यासाठी.",
    en: "To chat, share stories, and play games with friends of your age.",
    icon: "people",
    color: "#E64248",
    cats: ["all", "anand", "nate"],
  },
];

/* ─── Category definitions ─── */
const CATEGORIES = [
  { id: "all", mr: "सर्व", en: "All", icon: "✦" },
  { id: "anand", mr: "आनंद", en: "Joy", icon: "😊" },
  { id: "swatantrya", mr: "स्वातंत्र्य", en: "Freedom", icon: "🕊️" },
  { id: "nate", mr: "नाते", en: "Relations", icon: "❤️" },
  { id: "aarogya", mr: "आरोग्य", en: "Wellness", icon: "🌿" },
  { id: "suvidha", mr: "सुविधा", en: "Facilities", icon: "🏠" },
  { id: "prerana", mr: "प्रेरणा", en: "Purpose", icon: "⭐" },
];

const INITIAL_SHOW = 6;

/* ─── Icon renderer ─── */
function CardIcon({ type }: { type: string }) {
  const props = { size: 16, strokeWidth: 1.8 };
  if (type === "book") return <Lightbulb {...props} />;
  if (type === "hand") return <HandHeart {...props} />;
  if (type === "people") return <UsersRound {...props} />;
  if (type === "target") return <Target {...props} />;
  if (type === "heart") return <Heart {...props} />;
  if (type === "sparkles") return <Sparkles {...props} />;
  if (type === "smile") return <Smile {...props} />;
  if (type === "shield") return <ShieldCheck {...props} />;
  if (type === "star") return <Star {...props} />;
  return <Award {...props} />;
}

export default function SpecialReasons() {
  const { isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const tabsRef = React.useRef<HTMLDivElement>(null);

  const filteredReasons = rawReasons.filter((r) => r.cats.includes(activeTab));
  const visibleReasons = showAll ? filteredReasons : filteredReasons.slice(0, INITIAL_SHOW);
  const hasMore = filteredReasons.length > INITIAL_SHOW;

  function handleTabChange(id: string, e?: React.MouseEvent<HTMLButtonElement>) {
    setActiveTab(id);
    setShowAll(false);
    if (e?.currentTarget && typeof window !== "undefined" && window.innerWidth > 640) {
      e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  const activeCat = CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section className="specialReasonsSection">
      {/* ── HEADING ── */}
      <div className="reasonsHeading">
        <div className="miniHeading">
          <span className="miniDiamond">◆</span>
          <span>{isEn ? "Special Reasons" : "विशेष कारणे"}</span>
          <span className="miniDiamond">◆</span>
        </div>
        <h2>
          {isEn ? (
            <>
              Why Join <span style={{ color: "#db2777" }}>Anandshala</span>?
            </>
          ) : (
            <>
              <span style={{ color: "#db2777" }}>आनंदशाळेतच</span> प्रवेश का घ्यायचा?
            </>
          )}
        </h2>
        <div className="headingOrnament">
          <span />
          <b>❖</b>
          <span />
        </div>
        <p>
          {isEn ? (
            <>
              Discover the 23 reasons that make{" "}
              <span style={{ color: "#db2777", fontWeight: 900 }}>Anandshala</span> truly special.
            </>
          ) : (
            <>
              <span style={{ color: "#db2777", fontWeight: 900 }}>आनंदशाळा</span> खास का आहे ते जाणा
              — २३ विशेष कारणे.
            </>
          )}
        </p>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className="reasonsTabsWrapper">
        <div className="reasonsTabsRow">
          <div className="reasonsTabs" ref={tabsRef}>
            {CATEGORIES.map((cat) => {
              const count = rawReasons.filter((r) => r.cats.includes(cat.id)).length;
              return (
                <button
                  key={cat.id}
                  className={`reasonsTabBtn${activeTab === cat.id ? " active" : ""}`}
                  onClick={(e) => handleTabChange(cat.id, e)}
                >
                  <span className="tabIcon">{cat.icon}</span>
                  <span className="tabLabel">{isEn ? cat.en : cat.mr}</span>
                  <span className="tabCount">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── REASONS GRID ── */}
      <div className="reasonsGridWrapper">
        <div className="reasonsGrid">
          {visibleReasons.map((r, idx) => (
            <div
              key={`${r.number}-${activeTab}`}
              className="reasonCard"
              style={
                {
                  "--card-color": r.color,
                  animationDelay: `${idx * 40}ms`,
                } as React.CSSProperties
              }
            >
              <div className="cardHeader">
                <span className="cardNum">{r.number}</span>
                <div className="cardIcon">
                  <CardIcon type={r.icon} />
                </div>
              </div>
              <div className="cardBody">
                <p className="cardText">{isEn ? r.en : r.mr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── VIEW MORE ── */}
      {hasMore && (
        <div className="viewMoreWrapper">
          <button className="viewMoreBtn" onClick={() => setShowAll((s) => !s)}>
            {showAll ? (
              <>
                <ChevronUp size={15} />
                {isEn ? "Show Less" : "कमी दाखवा"}
              </>
            ) : (
              <>
                <ChevronDown size={15} />
                {isEn
                  ? `View ${filteredReasons.length - INITIAL_SHOW} More Reasons`
                  : `आणखी ${filteredReasons.length - INITIAL_SHOW} कारणे पहा`}
              </>
            )}
          </button>
        </div>
      )}

      {/* ── BOTTOM MESSAGE ── */}
      <div className="bottomMessage">
        <div className="goldLeaf leftLeaf">❧</div>
        <span className="goldStar">★</span>
        <p>
          {isEn ? (
            <>
              The gateway to healthy &amp; blissful golden years opens right here at{" "}
              <span style={{ color: "#db2777", fontWeight: 900 }}>Anandshala</span>...
            </>
          ) : (
            <>
              ज्येष्ठ नागरिकांच्या निरोगी आरोग्य व सुखद जीवनाचे दार येथेच उघडते —{" "}
              <span style={{ color: "#db2777", fontWeight: 900 }}>आनंदशाळा</span>...
            </>
          )}
        </p>
        <span className="goldStar">★</span>
        <div className="goldLeaf rightLeaf">❧</div>
      </div>
    </section>
  );
}
