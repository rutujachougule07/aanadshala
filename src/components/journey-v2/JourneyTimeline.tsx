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
import "./journey.css";

const timelineData = [
  {
    id: 1,
    stepNo: "१",
    title: "संकल्पनेची सुरुवात",
    description: "श्री. अभिनय जगन्नाथ कामाजी यांच्या स्वप्नातील प्रकल्पातून प्रीतम ज्येष्ठ नागरिक आनंदशाळेची संकल्पना उदयास आली.",
    color: "#db2777",
    bgColor: "#FDE8F3",
    borderColor: "#FCCEE4",
    nodeIcon: Lightbulb,
    cardIcon: Lightbulb,
    side: "left",
  },
  {
    id: 2,
    stepNo: "२",
    title: "भूमिपूजन",
    description: "१५ ऑगस्ट २०२३ रोजी स्वातंत्र्य दिन व ज्येष्ठ नागरिक आनंद मेळाव्याच्या शुभमुहूर्तावर भूमिपूजन संपन्न झाले.",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    nodeIcon: Flag,
    cardIcon: Flag,
    side: "right",
  },
  {
    id: 3,
    stepNo: "३",
    title: "आनंदशाळेची संकल्पना",
    description: "ज्येष्ठ नागरिकांना आनंदी, उत्साही, निरोगी आणि सुखी जीवन जगता यावे यासाठी प्रीतम ज्येष्ठ नागरिक आनंदशाळेची उभारणी करण्याची संकल्पना.",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    borderColor: "#FFEDD5",
    nodeIcon: Heart,
    cardIcon: Heart,
    side: "left",
  },
  {
    id: 4,
    stepNo: "४",
    title: "विविध सुविधांची उभारणी",
    description: "आनंद निवास, नियोजित गोशाळा, नियोजित श्रीकृष्ण मंदिर, जलतरण तलाव, आनंदशाळा इमारत, फिटनेस व स्पोर्ट्स कॉम्प्लेक्स, फूड कोर्ट, प्युअर व्हेज हॉटेल, कार्यक्रम स्टेज, गार्डन, लॉन आणि क्रिकेट व इतर खेळांसाठी मैदान.",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    nodeIcon: Building2,
    cardIcon: Building2,
    side: "right",
  },
  {
    id: 5,
    stepNo: "५",
    title: "ज्येष्ठ नागरिकांसाठी सेवा व सुविधा",
    description: "जाण्या-येण्याची सुविधा, राहण्याची व्यवस्था, कला शिक्षण, चहा, नाश्ता, जेवण, दवाखाना, वाचनालय, गार्डन, जलतरण तलाव, बॅडमिंटन, जिम, टेनिस, विविध इनडोअर व आउटडोअर खेळ, मंदिर, गोशाळा, कमाईच्या संधी आणि रोजगार सुविधा.",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    nodeIcon: HeartHandshake,
    cardIcon: HeartHandshake,
    side: "left",
  },
  {
    id: 6,
    stepNo: "६",
    title: "आनंदशाळेचा शुभारंभ",
    description: "२६ जानेवारी २०२६ रोजी प्रीतम ज्येष्ठ नागरिक आनंदशाळेचा शुभारंभ.",
    color: "#E11D48",
    bgColor: "#FFF1F2",
    borderColor: "#FECDD3",
    nodeIcon: Sparkles,
    cardIcon: Sparkles,
    side: "right",
  },
  {
    id: 7,
    stepNo: "७",
    title: "विविध उपक्रमांची सुरुवात",
    description: "बैठे खेळ, चित्रकला, हस्तकला, विणकाम, संगीत वाद्ये, संगणक व माहिती तंत्रज्ञान, मनोरंजन, पोहणे, विविध खेळ, व्यायाम, योगा, ध्यान, झुंबा, नृत्य, पाककला, वाचन व विश्रांती, थिएटर, भजन-कीर्तन आणि हास्य व कराओके असे विविध उपक्रम.",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    borderColor: "#BAE6FD",
    nodeIcon: Palette,
    cardIcon: Palette,
    side: "left",
  },
  {
    id: 8,
    stepNo: "८",
    title: "आनंदशाळेचे वेळापत्रक",
    description: "सकाळी ११ ते संध्याकाळी ५ या वेळेत विविध तास व उपक्रमांचे नियोजन करण्यात आले आहे. गरजेनुसार वेळापत्रक दर महिन्याला बदलता येते.",
    color: "#D97706",
    bgColor: "#FEF3C7",
    borderColor: "#FDE68A",
    nodeIcon: Clock,
    cardIcon: Clock,
    side: "right",
  },
];

export default function JourneyTimeline() {
  return (
    <section className="journey-exact-v2 my-6 sm:my-10" id="milestones">
      {/* Background Dot Grid */}
      <div className="journey-dot-grid" />

      <div className="journey-exact-container">
        {/* HEADER */}
        <div className="journey-exact-header text-center max-w-4xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="journey-exact-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-50 border border-pink-200 text-[#810B38] font-black text-xs sm:text-sm mb-4 shadow-xs"
          >
            <span>🌿</span>
            <span>प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span> — प्रकल्पाचे टप्पे</span>
            <span>🌿</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="journey-exact-title text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
          >
            प्रकल्पाची वाटचाल व <span className="text-[#db2777]">महत्त्वाचे टप्पे</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="journey-exact-subtitle text-slate-600 font-extrabold text-sm sm:text-lg mt-3"
          >
            संकल्पनेपासून ते भव्य शुभारंभापर्यंतचा प्रेरणादायी प्रवास...
          </motion.p>

          {/* Ornamental Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="journey-ornament flex items-center justify-center gap-3 mt-4"
          >
            <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#db2777]"></span>
            <span className="text-[#db2777] font-black text-sm">❖</span>
            <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#db2777]"></span>
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
                        टप्पा {item.stepNo}
                      </div>

                      <div className="card-inner flex items-start justify-between gap-4 p-5 sm:p-6 bg-white rounded-3xl shadow-xl border-2 border-slate-100">
                        <div className="card-text-content space-y-2 text-left">
                          <h3 className="card-title text-lg sm:text-xl font-black text-slate-900 leading-snug">
                            {item.id}. <HighlightText text={item.title} />
                          </h3>
                          <p className="card-desc text-xs sm:text-sm text-slate-700 font-extrabold leading-relaxed">
                            <HighlightText text={item.description} />
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
                        टप्पा {item.stepNo}
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
                            {item.id}. <HighlightText text={item.title} />
                          </h3>
                          <p className="card-desc text-xs sm:text-sm text-slate-700 font-extrabold leading-relaxed">
                            <HighlightText text={item.description} />
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
          className="quote-standalone-container mt-12"
        >
          <div className="quote-standalone-card">
            <div className="quote-mark quote-start">“</div>
            <p className="quote-text">
              आनंदात जगायचं, आरोग्य जपायचं,<br />
              <HighlightText text="आनंदशाळेत" /> येऊन स्वप्न साकारायचं.
            </p>
            <p className="quote-author">– डॉ. नितीन ओक, अभिनेते</p>
            <div className="quote-mark quote-end">”</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
