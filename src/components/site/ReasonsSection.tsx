import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/use-language";

const reasonsList = [
  {
    mr: "आमच्याकडे दर्जेदार शिक्षण करून आनंदी जीवन कसे जगता येते ते दाखवण्यासाठी.",
    en: "To demonstrate how joyful life can be lived through quality education here.",
  },
  {
    mr: "पैसा म्हणजे सर्वकाही नाही, मानवता धर्म व इतरांसाठी व स्वतःसाठी जगणे शिकण्यासाठी.",
    en: "To learn that money isn't everything; humanity & living for others matters.",
  },
  {
    mr: "मानव जन्म मिळाला ते आनंदाने जीवन जगण्यासाठी.",
    en: "To honor human birth by living every single day happily.",
  },
  {
    mr: "आपल्या माणसांवर रुसणे, अबोला, ओझे होण्यासाठी जीवन नाही हे सिद्ध करण्यासाठी.",
    en: "To prove life isn't meant for resentment or becoming a burden on anyone.",
  },
  {
    mr: "माझ्या मनातील व जीवनातील राहून गेलेल्या बऱ्याच गोष्टी, खेळ, आवडी-निवडी मला आनंदाने करण्यासाठी.",
    en: "To happily fulfill lifelong unfulfilled hobbies, games, and passions.",
  },
  {
    mr: "मला माझ्या मनासारखे आनंदी व स्वावलंबी जीवन जगता येण्यासाठी.",
    en: "To live a happy and self-reliant life on my own terms.",
  },
  {
    mr: "माझ्या कलागुणांना वाव, मानधन व आत्मसन्मान मिळण्यासाठी.",
    en: "To showcase my artistic talents, earn stipends, and gain self-dignity.",
  },
  {
    mr: "कोणाच्या बंधनात राहून, मन मारून, चार भिंतीत एकटेपणाने जीवन जगावे लागणार नाही यासाठी.",
    en: "To avoid living in restriction, solitude, or suppressed desires within 4 walls.",
  },
  {
    mr: "घरी एक-दोघे राहून, साहित्य आणून, विश्वास ठेवून जीवन जगणे जास्त खर्चिक व त्रासाचे असते, हे समजण्यासाठी.",
    en: "To realize that living alone at home managing groceries is costly & stressful.",
  },
  {
    mr: "आयुष्याला त्रासून-कष्टून मरण मागावे लागणार नाही यासाठी.",
    en: "To live golden years with joy instead of feeling exhausted or hopeless.",
  },
  {
    mr: "एकटेपणाला कंटाळून नैराश्य, चिडचिड होणार नाही यासाठी.",
    en: "To overcome loneliness, depression, and irritability effortlessly.",
  },
  {
    mr: "घरगुती कटकटी, अबोला, त्रास व भांडणापासून मुक्ती मिळवण्यासाठी.",
    en: "To get relief from domestic stress, silence, and daily friction.",
  },
  {
    mr: "स्वतः कमावलेल्या पैशांचा थोडातरी स्वतःसाठी उपभोग घेण्यासाठी.",
    en: "To enjoy at least a portion of hard-earned savings for oneself.",
  },
  {
    mr: "जीवनाची सायंकाळ आनंदाने उत्साहाने मनसोक्त जगून करण्यासाठी.",
    en: "To spend the evening of life enthusiastically and to the fullest.",
  },
  {
    mr: "आप्तजन व स्वतःसाठी खूप गरजेची व अभिमानास्पद गोष्ट आहे.",
    en: "A deeply essential and proud step for oneself and loved ones.",
  },
  {
    mr: "दूर राहून प्रेम, आपुलकी, जिव्हाळा व नातेसंबंध वाढवण्यासाठी.",
    en: "To nurture deeper love, affection, and strong family relationships.",
  },
  {
    mr: "आपल्या वयाच्या विचारांच्या मित्र-मैत्रिणींसोबत माणसांसोबत आनंदाने स्वाभिमानाने जगण्यासाठी.",
    en: "To live with self-respect alongside like-minded peers of one's age group.",
  },
  {
    mr: "मनसोक्त, आनंदी, उत्साही व स्वावलंबी जीवन जगता आले म्हणून देवाचे आभार मानण्यासाठी.",
    en: "To thank Almighty God for a joyful, energetic, and independent life.",
  },
  {
    mr: "नातेवाईक, लोक काय म्हणतील याचा विचार करू नका, स्वतःच्या आनंदासाठी आजच प्रवेश घ्या.",
    en: "Do not worry what society says — take admission for your own happiness.",
  },
  {
    mr: "कल्पना न केलेले, कधी न उपभोगलेले, आपलेपण काय असते ते जग अनुभवण्यासाठी.",
    en: "To experience true warmth and belonging never imagined before.",
  },
  {
    mr: "पैसा असून सुद्धा सर्व सुखसोई उपभोग विकत घेऊ शकत नाहीत परंतु येथे घेऊ शकतो ते दाखवण्यासाठी.",
    en: "To experience comforts money alone cannot buy at home.",
  },
  {
    mr: "प्रचंड पैसा असून सुद्धा ह्या सर्व सोयी सुविधा मी स्वतःच्या घरात करू शकत नाही हे लक्षात घेण्यासाठी.",
    en: "To realize that even with wealth, creating such a 1.5 acre hub at home is impossible.",
  },
  {
    mr: "आपल्या वयाच्या लोकांसोबत गप्पा-गोष्टी-खेळ खेळण्यासाठी.",
    en: "To chat, share stories, and play games with friends of your age.",
  },
];

/* ── Icon set cycling across 4 colour themes (amber → orange → crimson → purple) ── */
const themes = [
  {
    color: "#D97706",
    borderColor: "#F59E0B",
    gradId: "grad-amber",
    icon: (
      <svg className="size-10 stroke-[#D97706] stroke-[1.8] fill-none" viewBox="0 0 24 24">
        <path d="M12 2a6 6 0 0 1 6 6c0 2.2-1.2 4.2-3 5.3V16a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.7C7.2 12.2 6 10.2 6 8a6 6 0 0 1 6-6z" />
        <path d="M9 21h6" />
        <path d="M4 19a10 10 0 0 0 16 0" />
      </svg>
    ),
  },
  {
    color: "#EA580C",
    borderColor: "#F97316",
    gradId: "grad-orange",
    icon: (
      <svg className="size-10 stroke-[#EA580C] stroke-[1.8] fill-none" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="3" />
        <path d="M12 14c-3 0-6 1.5-6 4v1h12v-1c0-2.5-3-4-6-4z" />
        <path d="M4 18c-1.5 0-3 1-3 2v2h22v-2c0-1-1.5-2-3-2" />
      </svg>
    ),
  },
  {
    color: "#BE123C",
    borderColor: "#F43F5E",
    gradId: "grad-crimson",
    icon: (
      <svg className="size-10 stroke-[#BE123C] stroke-[1.8] fill-none" viewBox="0 0 24 24">
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l6.6-6.6a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.5 1.5" />
        <path d="M18 10 13.4 5.4a1 1 0 0 0-1.4 0L4 13.4a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0L12 13" />
      </svg>
    ),
  },
  {
    color: "#7E22CE",
    borderColor: "#A855F7",
    gradId: "grad-purple",
    icon: (
      <svg className="size-10 stroke-[#7E22CE] stroke-[1.8] fill-none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
] as const;

/* ── Single reason card ── */
function ReasonCard({ reason, index }: { reason: (typeof reasonsList)[number]; index: number }) {
  const { isEn } = useLanguage();
  const t = themes[index % 4];
  const numStr = String(index + 1).padStart(2, "0");

  return (
    /* Extra top padding so the floating teardrop pin badge sits above the card */
    <div
      className="relative w-75 sm:w-80 shrink-0 group/card cursor-pointer"
      style={{ paddingTop: "40px" }}
    >
      {/* ── 3-D Coloured backing panel (shifted right + down) ── */}
      <div
        className="absolute left-5 right-0 top-11 bottom-0 rounded-4xl transition-transform duration-500 group-hover/card:translate-x-1.5 group-hover/card:translate-y-1 shadow-lg"
        style={{ backgroundColor: t.color }}
      />

      {/* ── Main white card ── */}
      <div
        className="relative z-10 w-full rounded-4xl bg-white dark:bg-slate-900 border border-[#E6D2BF]/80 shadow-[0_10px_40px_rgba(0,0,0,0.10)] group-hover/card:-translate-y-2 group-hover/card:shadow-[0_20px_55px_rgba(0,0,0,0.20)] transition-all duration-500 flex flex-col items-center text-center"
        style={{ minHeight: "340px", padding: "48px 28px 28px" }}
      >
        {/* ── Teardrop pin badge ── */}
        <div className="absolute z-20" style={{ top: "-38px", left: "20px" }}>
          <svg
            width="58"
            height="74"
            viewBox="0 0 58 74"
            fill="none"
            className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.22)]"
          >
            {/* Solid coloured teardrop */}
            <path
              d="M29 0 C45 0 58 13 58 29 C58 46 29 74 29 74 C29 74 0 46 0 29 C0 13 13 0 29 0 Z"
              fill={t.color}
            />
            {/* Inner highlight ring */}
            <path
              d="M29 4 C42 4 54 15 54 29 C54 43 29 68 29 68 C29 68 4 43 4 29 C4 15 16 4 29 4 Z"
              fill="none"
              stroke="rgba(255,255,255,0.30)"
              strokeWidth="1.5"
            />
            {/* White number */}
            <text
              x="29"
              y="34"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="18"
              fontWeight="900"
              fontFamily="inherit"
              letterSpacing="-0.5"
            >
              {numStr}
            </text>
          </svg>
        </div>

        {/* ── Concentric-circle icon ── */}
        <div
          className="size-24 rounded-full grid place-items-center border-2 shadow-[0_6px_20px_rgba(0,0,0,0.07)] group-hover/card:scale-105 group-hover/card:rotate-6 transition-transform duration-500"
          style={{
            borderColor: t.color,
            background: "radial-gradient(circle, #FFFDF9 60%, #F7EACD 100%)",
          }}
        >
          <div
            className="size-19 rounded-full grid place-items-center border-dashed border"
            style={{ borderColor: t.color }}
          >
            {t.icon}
          </div>
        </div>

        {/* ── Reason text ── */}
        <p className="mt-5 text-sm font-extrabold text-[#3B0E17] dark:text-white leading-relaxed">
          {isEn ? reason.en : reason.mr}
        </p>

        {/* ── 7-dot bottom divider ── */}
        <div className="mt-auto pt-5 flex items-center justify-center gap-1.25">
          {[0.3, 0.5, 0.7, 1, 0.7, 0.5, 0.3].map((op, di) => (
            <span
              key={di}
              className="rounded-full"
              style={{
                backgroundColor: t.color,
                opacity: op,
                width: di === 3 ? "14px" : "6px",
                height: di === 3 ? "14px" : "6px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Full section ── */
export function ReasonsSection() {
  const { isEn } = useLanguage();

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-linear-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#FFFDF9] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-[#E6D2BF]">
      {/* SVG gradient definitions for teardrop pins */}
      <svg className="absolute size-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="rs-grad-amber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="rs-grad-orange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="rs-grad-crimson" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
          <linearGradient id="rs-grad-purple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7E22CE" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-page relative z-10 max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#CC0D50] font-extrabold bg-[#CC0D50]/10 px-4 py-1.5 rounded-full border border-[#CC0D50]/20">
            ✦ {isEn ? "Special Reasons" : "विशेष कारणे"} ✦
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A05A2] dark:text-white tracking-tight drop-shadow-sm">
            {isEn
              ? "Why Join Anandshala? (23 Special Reasons)"
              : "आनंदशाळेतच प्रवेश का घ्यायचा? (२३ विशेष कारणे)"}
          </h2>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-0.375 w-16 bg-linear-to-r from-transparent via-[#CC0D50]/50 to-transparent" />
            <span className="text-[#CC0D50] text-sm font-bold">❦</span>
            <div className="h-0.375 w-16 bg-linear-to-r from-transparent via-[#CC0D50]/50 to-transparent" />
          </div>
          <p className="text-sm sm:text-base text-foreground/80 font-bold max-w-2xl mx-auto">
            {isEn
              ? "Our goal is the overall development and bright future of every senior citizen."
              : "आमचं ध्येय आहे प्रत्येक विद्यार्थ्याचा सर्वांगीण विकास आणि उज्ज्वल भविष्य."}
          </p>
        </Reveal>

        {/* ── Infinite marquee carousel ── */}
        <div className="relative overflow-x-hidden group/marquee pb-8">
          {/* Side fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-r from-[#FAF5EE] dark:from-slate-950 to-transparent z-30" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-linear-to-l from-[#FAF5EE] dark:from-slate-950 to-transparent z-30" />

          <div
            className="flex w-max animate-marquee gap-7 group-hover/marquee:paused pt-10"
            style={{ animationDuration: "110s" }}
          >
            {/* Two identical loops create a seamless infinite effect */}
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-8">
                {reasonsList.map((reason, i) => (
                  <ReasonCard key={i} reason={reason} index={i} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom gold trust laurel ribbon ── */}
        <div className="mt-12 text-center">
          <span className="inline-flex items-center gap-3 rounded-full bg-white dark:bg-slate-900 border-2 border-[#D99A26] px-8 py-4 text-xs sm:text-sm font-black text-[#541A1A] dark:text-amber-200 shadow-2xl backdrop-blur-md">
            <span className="text-amber-500 text-lg">🌾 ★</span>
            <span>
              {isEn
                ? "The gateway to healthy & blissful golden years opens right here at Anandshala..."
                : "ज्येष्ठ नागरिकांच्या निरोगी आरोग्य व सुखद जीवनाचे दार येथेच उघडते — आनंदशाळा..."}
            </span>
            <span className="text-amber-500 text-lg">★ 🌾</span>
          </span>
        </div>
      </div>
    </section>
  );
}
