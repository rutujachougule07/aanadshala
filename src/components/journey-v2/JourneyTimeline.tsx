import { motion } from "framer-motion";
import {
  Lightbulb,
  Flag,
  Heart,
  Building2,
  HeartHandshake,
  Sparkles,
  Palette,
  Clock
} from "lucide-react";
import { HighlightText } from "@/components/HighlightText";
import { useLanguage } from "@/lib/use-language";
import "./journey.css";

const timelineData = [
  {
    id: 1,
    stepNoMr: "१",
    stepNoEn: "1",
    titleMr: "संकल्पनेची सुरुवात",
    titleEn: "Inception of Concept",
    descMr: "श्री. अभिनय जगन्नाथ कामाजी यांच्या स्वप्नातील प्रकल्पातून प्रीतम ज्येष्ठ नागरिक आनंदशाळेची संकल्पना उदयास आली.",
    descEn: "The vision of Preetam Senior Citizen Anandshala originated from the dream project of Shri Abhinay Jagannath Kamaji.",
    color: "#db2777",
    bgColor: "#FDE8F3",
    borderColor: "#FCCEE4",
    nodeIcon: Lightbulb,
    cardIcon: Lightbulb,
    side: "left",
  },
  {
    id: 2,
    stepNoMr: "२",
    stepNoEn: "2",
    titleMr: "भूमिपूजन",
    titleEn: "Bhumipujan Ceremony",
    descMr: "१५ ऑगस्ट २०२३ रोजी स्वातंत्र्य दिन व ज्येष्ठ नागरिक आनंद मेळाव्याच्या शुभमुहूर्तावर भूमिपूजन संपन्न झाले.",
    descEn: "Bhumipujan was solemnly performed on Independence Day, 15th August 2023, during the Senior Citizens' Meet.",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    nodeIcon: Flag,
    cardIcon: Flag,
    side: "right",
  },
  {
    id: 3,
    stepNoMr: "३",
    stepNoEn: "3",
    titleMr: "आनंदशाळेची संकल्पना",
    titleEn: "Anandshala Philosophy",
    descMr: "ज्येष्ठ नागरिकांना आनंदी, उत्साही, निरोगी आणि सुखी जीवन जगता यावे यासाठी प्रीतम ज्येष्ठ नागरिक आनंदशाळेची उभारणी करण्याची संकल्पना.",
    descEn: "The core philosophy is enabling senior citizens to live energetic, healthy, dignified, and joyful golden years.",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    borderColor: "#FFEDD5",
    nodeIcon: Heart,
    cardIcon: Heart,
    side: "left",
  },
  {
    id: 4,
    stepNoMr: "४",
    stepNoEn: "4",
    titleMr: "विविध सुविधांची उभारणी",
    titleEn: "Campus Infrastructure",
    descMr: "आनंद निवास, नियोजित गोशाळा, नियोजित श्रीकृष्ण मंदिर, जलतरण (swimming), आनंदशाळा इमारत, फिटनेस व स्पोर्ट्स कॉम्प्लेक्स, फूड कोर्ट, कार्यक्रम स्टेज, गार्डन, लॉन आणि क्रिकेट व इतर खेळांसाठी मैदान.",
    descEn: "Anand Nivas stay, proposed Gaushala, Krishna Temple, swimming pool, sports complex, food court, stage, gardens & sports grounds.",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    nodeIcon: Building2,
    cardIcon: Building2,
    side: "right",
  },
  {
    id: 5,
    stepNoMr: "५",
    stepNoEn: "5",
    titleMr: "ज्येष्ठ नागरिकांसाठी सेवा व सुविधा",
    titleEn: "Senior Care & Services",
    descMr: "जाण्या-येण्याची सुविधा, राहण्याची व्यवस्था, कला शिक्षण, चहा, नाश्ता, जेवण, दवाखाना (रोज २ तास सकाळी १० ते १२ आणि सायंकाळी ४ ते ६), वाचनालय, गार्डन, जलतरण (swimming), बॅडमिंटन, जिम, टेबल टेनिस, पूल टेबल, पिकलबॉल, विविध इनडोअर व आउटडोअर खेळ, नियोजित श्रीकृष्ण मंदिर आणि नियोजित गोशाळा.",
    descEn: "Commute transport, accommodation, arts, food court meals, in-house clinic (10-12 AM & 4-6 PM), library, swimming, gym, indoor-outdoor games & temple.",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    nodeIcon: HeartHandshake,
    cardIcon: HeartHandshake,
    side: "left",
  },
  {
    id: 6,
    stepNoMr: "६",
    stepNoEn: "6",
    titleMr: "आनंदशाळेचा शुभारंभ",
    titleEn: "Grand Opening",
    descMr: "२६ जानेवारी २०२६ रोजी प्रीतम ज्येष्ठ नागरिक आनंदशाळेचा शुभारंभ.",
    descEn: "Grand Opening of Preetam Senior Citizen Anandshala scheduled for 26th January 2026.",
    color: "#E11D48",
    bgColor: "#FFF1F2",
    borderColor: "#FECDD3",
    nodeIcon: Sparkles,
    cardIcon: Sparkles,
    side: "right",
  },
  {
    id: 7,
    stepNoMr: "७",
    stepNoEn: "7",
    titleMr: "विविध उपक्रमांची सुरुवात",
    titleEn: "Activity Programs",
    descMr: "बैठे खेळ, चित्रकला, हस्तकला, विणकाम, संगीत वाद्ये, संगणक व माहिती तंत्रज्ञान, मनोरंजन, पोहणे, विविध खेळ, व्यायाम, योगा, ध्यान, झुंबा, नृत्य, पाककला, वाचन व विश्रांती, थिएटर, भजन-कीर्तन आणि हास्य व कराओके असे विविध उपक्रम.",
    descEn: "Indoor games, arts, music, IT learning, swimming, Yoga, Meditation, Zumba, dance, cooking, theatre & Karaoke sessions.",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    borderColor: "#BAE6FD",
    nodeIcon: Palette,
    cardIcon: Palette,
    side: "left",
  },
  {
    id: 8,
    stepNoMr: "८",
    stepNoEn: "8",
    titleMr: "आनंदशाळेचे वेळापत्रक",
    titleEn: "Daily Timetable",
    descMr: "सकाळी ११ ते सायंकाळी ५ या वेळेत विविध तास व उपक्रमांचे नियोजन करण्यात आले आहे. गरजेनुसार वेळापत्रक दर महिन्याला बदलता येते.",
    descEn: "Daily 11:00 AM to 5:00 PM scheduled activity periods curated to keep every day active and engaging.",
    color: "#D97706",
    bgColor: "#FEF3C7",
    borderColor: "#FDE68A",
    nodeIcon: Clock,
    cardIcon: Clock,
    side: "right",
  },
];

export default function JourneyTimeline() {
  const { isEn } = useLanguage();

  return (
    <section className="journey-exact-v2 my-6 sm:my-10" id="milestones">
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
            <span>🌿</span>
            <span>
              {isEn ? (
                <>Preetam Senior Citizen <span className="text-[#db2777]">Anandshala</span> — Project Milestones</>
              ) : (
                <>प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span> — प्रकल्पाचे टप्पे</>
              )}
            </span>
            <span>🌿</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="journey-exact-title text-[26px] sm:text-[36px] md:text-[42px] font-black text-[#0044cc] leading-snug tracking-tight"
          >
            {isEn ? "Project Journey & Key Milestones" : "प्रकल्पाची वाटचाल व महत्त्वाचे टप्पे"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="journey-exact-subtitle text-xs sm:text-sm md:text-base font-medium text-slate-500 mt-2 tracking-wide"
          >
            {isEn
              ? "An inspiring journey from initial concept to grand opening..."
              : "संकल्पनेपासून ते भव्य शुभारंभापर्यंतचा प्रेरणादायी प्रवास..."}
          </motion.p>

          {/* Ornamental Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="journey-ornament flex items-center justify-center gap-3 mt-3"
          >
            <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#db2777]"></span>
            <span className="text-[#db2777] font-black text-xs">❖</span>
            <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#db2777]"></span>
          </motion.div>
        </div>

        {/* TIMELINE GRID */}
        <div className="journey-exact-timeline relative">
          {/* Center Vertical Dashed Line */}
          <div className="journey-center-line">
            <div className="line-dashed" />
            <div className="line-end-circle" />
          </div>

          {timelineData.map((item) => {
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
                            {item.id}. <HighlightText text={title} />
                          </h3>
                          <p className="card-desc text-xs sm:text-sm text-slate-700 font-extrabold leading-relaxed">
                            <HighlightText text={description} />
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
                            {item.id}. <HighlightText text={title} />
                          </h3>
                          <p className="card-desc text-xs sm:text-sm text-slate-700 font-extrabold leading-relaxed">
                            <HighlightText text={description} />
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

        {/* DEDICATED BOTTOM STANDALONE QUOTE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="quote-standalone-container mt-12 px-4"
        >
          <div className="quote-standalone-card">
            <div className="quote-mark quote-start text-left">“</div>
            <p className="quote-text text-center">
              {isEn ? (
                <>
                  Live with joy, nurture health,<br />
                  Fulfill your dreams by joining <HighlightText text="Anandshala" />.
                </>
              ) : (
                <>
                  आनंदात जगायचं, आरोग्य जपायचं,<br />
                  <HighlightText text="आनंदशाळेत" /> येऊन स्वप्न साकारायचं.
                </>
              )}
            </p>
            <div className="quote-mark quote-end text-right">”</div>
            <p className="quote-author text-center">
              {isEn ? "– Dr. Girish Oak, Actor & Brand Ambassador" : "– डॉ. गिरीश ओक, अभिनेते व ब्रँड ॲम्बेसेडर"}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
