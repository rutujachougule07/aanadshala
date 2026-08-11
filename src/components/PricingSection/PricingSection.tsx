import React, { useState } from "react";
import { createPortal } from "react-dom";
import { 
  Sparkles, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  X, 
  Clock,
  ArrowRight,
  ShieldCheck,
  Coffee,
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import "./PricingSection.css";

interface RateItem {
  id: string;
  title: string;
  category: string;
  yearly: string;
  monthly: string;
  weekly: string;
  daily: string;
  desc: string;
  features: string[];
}

const rateItems: RateItem[] = [
  {
    id: "१",
    title: "ज्येष्ठ नागरिक आनंद शाळा (११ ते ५) फी",
    category: "आनंदशाळा दैनिक फी",
    yearly: "३६,०००/-",
    monthly: "३,६००/-",
    weekly: "१,०११/-",
    daily: "१८०/-",
    desc: "सकाळी ११:०० ते ५:०० वेळेत दैनिक हजेरी. सर्व १५ उपक्रम हॉल्स, योग, प्राणायाम, ध्यानधारणा, वाचनालय व मित्र सोबती सोयी.",
    features: [
      "सकाळी ११:०० ते ५:०० हजेरी व सहवास",
      "योगा, प्राणायाम व नियमित ध्यानधारणा मार्गदर्शन",
      "१५ विविध विशेष उपक्रम हॉल्सचा अमर्याद वापर",
      "पुस्तके, वर्तमानपत्रे आणि चर्चा कट्टा सोय"
    ]
  },
  {
    id: "२",
    title: "आनंद निवास ३ शेअरिंग रेग्युलर रुम फी",
    category: "३ व्यक्ती निवास (३ Sharing)",
    yearly: "३६,०००/-",
    monthly: "३,६००/-",
    weekly: "१,०११/-",
    daily: "१८०/-",
    desc: "३ व्यक्ती शेअरिंग आरामदायक रूम. आरामदायी बेड, कपाट, टेबल व गरजू ज्येष्ठ नागरिकांसाठी आवश्यक सर्व प्राथमिक सोयी.",
    features: [
      "३ व्यक्ती शेअरिंग प्रशस्त रूम",
      "३ प्लायवूड बेड, वैयक्तिक वॉर्डरोब (कपाट) सोय",
      "नियमित खोली स्वच्छता व बेडशीट बदल सेवा",
      "२४ तास वैद्यकीय मदत आणि केअरटेकर सोय"
    ]
  },
  {
    id: "३",
    title: "आनंद निवास २ शेअरिंग रेग्युलर रुम फी",
    category: "२ व्यक्ती निवास (२ Sharing Regular)",
    yearly: "४८,०००/-",
    monthly: "४,८००/-",
    weekly: "१,३५०/-",
    daily: "२३०/-",
    desc: "२ व्यक्ती शेअरिंग रेग्युलर रूम. दुहेरी सोयींनी युक्त राहणे, आरामदायी कपाटे व हवेशीर परिसर.",
    features: [
      "२ व्यक्ती शेअरिंग हवेशीर खोली",
      "२ स्वतंत्र बेड, २ स्वतंत्र लाकडी कपाटे",
      "टी.व्ही. व आरामदायी चेअर्सची व्यवस्था",
      "२४ तास गरम व थंड पाण्याची सोय"
    ]
  },
  {
    id: "४",
    title: "आनंद निवास २ शेअरिंग डीलक्स रुम फी",
    category: "२ व्यक्ती निवास (२ Sharing Deluxe)",
    yearly: "६०,०००/-",
    monthly: "६,०००/-",
    weekly: "१,६८०/-",
    daily: "२९०/-",
    desc: "२ व्यक्ती शेअरिंग सुसज्ज डीलक्स रूम. सुंदर इंटीरियर, वातानुकूलित (A.C) / एअर कुलर सोय व काचेचा टीपॉय.",
    features: [
      "डबल बेड, काचेचा टीपॉय व विशेष डिझाईन",
      "वातानुकूलित (A.C.) किंवा एअर कुलर व्यवस्था",
      "वैयक्तिक टी.व्ही. व आरामदायी सोफा/खुर्च्या",
      "प्रिमियम स्वच्छता आणि रूम केअर सुविधा"
    ]
  },
  {
    id: "५",
    title: "आनंद निवास २ शेअरिंग प्रीमियर रुम फी",
    category: "२ व्यक्ती निवास (२ Sharing Premier)",
    yearly: "७२,०००/-",
    monthly: "७,२००/-",
    weekly: "२,०००/-",
    daily: "३५०/-",
    desc: "२ व्यक्ती शेअरिंग लक्झरी प्रीमियर रूम. वॉर्डरोब बेडरूम सेट, टी.व्ही. शोकेस, प्रिमियम फर्निचर व रूम सर्व्हिस.",
    features: [
      "लक्झरी बेडरूम सेट व संपूर्ण वॉर्डरोब युनिट",
      "टी.व्ही. शोकेस व प्रिमियम अंतर्गत सजावट",
      "विशेष रूम सर्व्हिस व चहा-पाणी खोलीत सेवा",
      "अतिशय शांत, व्ही.आय.पी. लक्झरी कम्फर्ट"
    ]
  },
  {
    id: "६",
    title: "आनंद शाळा चहा १, नाष्टा १, जेवण १",
    category: "खानपान (१ वेळ चहा/नाष्टा/जेवण)",
    yearly: "३०,०००/-",
    monthly: "३,०००/-",
    weekly: "८५०/-",
    daily: "१५०/-",
    desc: "दिवसभरात १ वेळ ताजा चहा, १ वेळ सकस स्वादिष्ट नाष्टा आणि १ वेळ घरगुती पद्धतीचे पौष्टिक शाकाहारी भोजन.",
    features: [
      "१ वेळ चहा & १ वेळ नाष्टा सोय",
      "१ वेळ दुपारी किंवा रात्रीचे घरगुती जेवण",
      "सेंद्रिय व आरोग्यदायी पदार्थांचा वापर",
      "डायबिटीज व इतर पथ्यांच्या जेवणाची विशेष काळजी"
    ]
  },
  {
    id: "७",
    title: "आनंद शाळा चहा २, नाष्टा २, जेवण २",
    category: "खानपान (पूर्ण आहार सोय)",
    yearly: "६०,०००/-",
    monthly: "६,०००/-",
    weekly: "१,७००/-",
    daily: "३००/-",
    desc: "२ वेळ गरमागरम चहा, २ वेळ सकस नाष्टा आणि २ वेळ पूर्ण सात्विक जेवण (दुपारचे व रात्रीचे जेवण).",
    features: [
      "२ वेळ चहा & २ वेळ नाष्टा रोज",
      "दुपारचे आणि रात्रीचे संपूर्ण भोजन (सात्विक आहार)",
      "आहारात दररोज गोड पदार्थ व सॅलडचा समावेश",
      "स्वच्छ, हायजिनिक व वातानुकूलित डायनिंग हॉल"
    ]
  },
  {
    id: "८",
    title: "आनंद शाळा स्कुल बसने जाणे-येणे रेग्युलर",
    category: "वाहतूक (रेग्युलर बस सेवा)",
    yearly: "१८,०००/-",
    monthly: "१,८००/-",
    weekly: "५००/-",
    daily: "९०/-",
    desc: "सांगली शहरातील ठरवून दिलेल्या मुख्य थांब्यांवरून आनंदशाळेत नियमित सुरक्षित बसने प्रवास सेवा.",
    features: [
      "सुरक्षित व हवेशीर बस प्रवास सोय",
      "ठरलेल्या वेळेवर पिकअप व ड्रॉप व्यवस्था",
      "प्रशिक्षित बस चालक आणि विशेष मदतनीस",
      "ज्येष्ठ नागरिकांसाठी चढण्या-उतरण्यास सुलभ व्यवस्था"
    ]
  },
  {
    id: "९",
    title: "आनंद शाळा स्कुल बसने जाणे-येणे प्रीमियर",
    category: "वाहतूक (दारातून पिकअप सेवा)",
    yearly: "२७,०००/-",
    monthly: "२,७००/-",
    weekly: "७६०/-",
    daily: "१३०/-",
    desc: "वापरकर्त्यांच्या थेट घराच्या दारातून पिकअप व ड्रॉप सेवा देणारी प्रिमियम ट्रान्सपोर्ट सोय.",
    features: [
      "थेट घराच्या पायरीवरून पिकअप आणि ड्रॉप सेवा",
      "वातानुकूलित (A.C.) किंवा अत्यंत आरामदायी कार/व्हॅन",
      "वैयक्तिक सामान चढविणे-उतरविणे मदत",
      "विशेष वैयक्तिक ट्रॅकिंग व काळजी"
    ]
  }
];

export const PricingSection: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<RateItem | null>(null);

  return (
    <section className="ps-exact-table-section" id="pricing">
      
      {/* ── HEADER BLOCK ── */}
      <Reveal>
        <div className="ps-exact-header text-center">
          <div className="ps-badge-offer">
            <Sparkles size={16} className="text-amber-500 animate-pulse" />
            <span>भारतातील पहिलीच • ॲडव्हान्स् बुकींग शुभारंभ ऑफर</span>
          </div>

          <h2 className="ps-main-title">
            प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span> अधिकृत दरपत्रक
          </h2>

          <p className="ps-subtitle">
            “आनंदात जगायचं, आरोग्य जपायचं, आनंदशाळेत येऊन स्वप्न साकारायचं.” <br />
            <span className="text-[#c2410c] font-black">खालील टेबलमध्ये सविस्तर दर दिले आहेत. अधिक तपशीलासाठी कोणत्याही ओळीवर क्लीक करा:</span>
          </p>
        </div>
      </Reveal>

      {/* ── DESKTOP & TABLET INTERACTIVE COMPARISON TABLE ── */}
      <Reveal delay={100}>
        <div className="ps-table-wrapper">
          <table className="ps-exact-table">
            <thead>
              <tr>
                <th className="th-details text-left">तपशील (Details)</th>
                <th>वार्षिक (Yearly)</th>
                <th>मासिक (Monthly)</th>
                <th>आठवडा (Weekly)</th>
                <th>दिवस (Daily)</th>
              </tr>
            </thead>
            <tbody>
              {rateItems.map((item) => (
                <tr 
                  key={item.id} 
                  className="ps-table-row group"
                  onClick={() => setSelectedRow(item)}
                >
                  <td className="td-title-cell text-left">
                    <div className="flex items-center gap-3">
                      <span className="row-num">{item.id}</span>
                      <div>
                        <span className="row-cat-label">{item.category}</span>
                        <div className="row-title-text group-hover:text-[#db2777] transition-colors">
                          {item.title}
                        </div>
                      </div>
                      <span className="info-help-btn opacity-0 group-hover:opacity-100 transition-opacity">
                        <HelpCircle size={15} />
                      </span>
                    </div>
                  </td>
                  <td className="price-bold">₹{item.yearly}</td>
                  <td className="price-bold" style={{color: '#db2777'}}>₹{item.monthly}</td>
                  <td className="price-bold">₹{item.weekly}</td>
                  <td className="price-bold">₹{item.daily}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* ── MOBILE CARD LAYOUT (RESPONSIVE FALLBACK) ── */}
      <div className="ps-mobile-cards-list">
        {rateItems.map((item) => (
          <div 
            key={item.id}
            className="ps-mobile-item-card"
            onClick={() => setSelectedRow(item)}
          >
            <div className="mobile-card-header">
              <span className="mobile-id-badge">{item.id}</span>
              <span className="mobile-cat-tag">{item.category}</span>
            </div>
            <h3 className="mobile-title-text">{item.title}</h3>
            
            <div className="mobile-prices-grid">
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">वार्षिक</span>
                <span className="mobile-price-val">₹{item.yearly}</span>
              </div>
              <div className="mobile-price-box highlight">
                <span className="mobile-price-lbl">मासिक</span>
                <span className="mobile-price-val" style={{color: '#db2777'}}>₹{item.monthly}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">आठवडा</span>
                <span className="mobile-price-val">₹{item.weekly}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">दैनिक</span>
                <span className="mobile-price-val">₹{item.daily}</span>
              </div>
            </div>

            <div className="mobile-click-more">
              <span>तपशील आणि वैशिष्ट्ये पहा</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center font-bold text-slate-500 text-xs sm:text-sm mt-3.5">
        * ज्येष्ठ नागरिकांना निरोगी, आनंदी आणि निवांतपणे सोनेरी सायंकाळ अनुभवण्यासाठी.
      </p>

      {/* ── ONE DAY PICNIC PASS VIP GOLDEN TICKET SECTION ── */}
      <Reveal delay={150}>
        <div className="ps-golden-ticket-container">
          <div className="ps-golden-ticket">
            {/* Left Portion of Ticket */}
            <div className="ticket-body-left">
              <div className="ticket-header-strip">
                <span className="ticket-vip-tag">विशेष ऑफर प्रवेश पास</span>
                <span className="ticket-limit-tag">एक व्यक्तीसाठी</span>
              </div>

              <h3 className="ticket-title">एक दिवस सहल भेट प्रवेश पास (1 Day Picnic Pass)</h3>
              
              <p className="ticket-desc">
                ☕ चहा, स्वादिष्ट नाष्टा, घरगुती जेवण, परिसर दर्शन, मनोरंजक खेळ व सर्व १५ विशेष आनंदशाळा उपक्रमांचा आनंद घेता येईल.
              </p>

              <div className="ticket-rules-grid">
                <div className="ticket-rule-item">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>वेळ: सकाळी ११:०० ते ५:०० पर्यंत.</span>
                </div>
                <div className="ticket-rule-item">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>हा पास स्वतः, ५ वर्षापुढील मुले किंवा ज्येष्ठ नागरिकांसाठी वापरता येईल.</span>
                </div>
                <div className="ticket-rule-item">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>इतरांना किंवा ज्येष्ठ नागरिकांना पास भेट देऊन पुण्य व आशीर्वाद मिळवा.</span>
                </div>
                <div className="ticket-rule-item">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>पेमेंट देताना योग्य सही व शिक्का बघून घेणे आवश्यक आहे.</span>
                </div>
              </div>

              <div className="ticket-slogan">
                <span>🎨 रंगोपन, निसर्ग, आरोग्य व समाधानाचा एकत्र ठिकाण!</span>
                <span className="block mt-1 text-xs text-amber-200">
                  आपल्या घरात ज्येष्ठ आजी-आजोबा नसतील किंवा मुलांना त्यांचे प्रेम मिळत नसेल, तर नक्की त्यांना एक दिवस सहलीला घेऊन या!
                </span>
              </div>
            </div>

            {/* Right Stub Portion of Ticket */}
            <div className="ticket-stub-right">
              <div className="stub-notch-top" />
              <div className="stub-notch-bottom" />
              
              <div className="stub-content">
                <div className="stub-label">पास दर</div>
                <div className="stub-price">₹६००/-</div>
                <div className="stub-time-badge">वेळ: ११ ते ५</div>
                <div className="stub-gst">GST Extra</div>
                
                <a href="tel:9970079090" className="stub-call-btn">
                  <span>आजच बुक करा</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── OPTIONAL SERVICES SECTION ── */}
      <Reveal delay={200}>
        <div className="ps-extra-services-card">
          <div className="extra-header">
            <Coffee size={24} className="text-pink-600 animate-bounce" />
            <h3>जास्तीचे पेमेंट करून खालील अतिरीक्त सुविधा घेऊ शकता:</h3>
          </div>
          <p className="extra-desc">
            स्पेशल चहा, उत्कृष्ट कॉफी, नाष्टा, गरमागरम सूप, जेवण, सॅलड, आईस्क्रीम, मिठाई, लॉन्ड्री (कपडे धुणे), प्रिमियम फर्निचर, आवश्यक उपकरणे व बरंच काही...!
          </p>
        </div>
      </Reveal>

      {/* ── CONTACT DETAILS CARD ── */}
      <Reveal delay={250}>
        <div className="ps-contact-card-footer">
          <div className="contact-inner flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="contact-left space-y-2">
              <span className="contact-badge">📞 थेट संपर्क & बुकिंग</span>
              <h3 className="text-2xl font-black text-white">श्री. अभिनव ज. कामाजी</h3>
              <p className="flex items-center gap-1.5 text-xs text-rose-200 font-bold">
                <MapPin size={15} />
                <span>पत्ता: प्रीतम हाऊस बिल्डिंग, माधवनगर रोड, जकात नाक्या जवळ, सांगली.</span>
              </p>
              <p className="text-[11px] text-amber-200 font-extrabold flex items-center gap-1">
                <AlertTriangle size={13} className="shrink-0" />
                <span>टिप: सदर दरपत्रकात गरजेनुसार व महागाईनुसार योग्य तो बदल केला जाईल. नियम व अटी लागू.</span>
              </p>
            </div>

            <div className="contact-right-buttons flex flex-col sm:flex-row gap-3">
              <a href="tel:9970079090" className="contact-phone-btn">
                <span>📞 ९९७००७९०९०</span>
              </a>
              <a href="tel:9423258859" className="contact-phone-btn second">
                <span>📞 ९४२३२५८८५९</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── PORTAL MODAL DIALOG ON CLICK ROW ── */}
      {selectedRow && typeof document !== "undefined" && createPortal(
        <div className="ps-modal-overlay" onClick={() => setSelectedRow(null)}>
          <div className="ps-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="ps-modal-close-btn" onClick={() => setSelectedRow(null)}>
              <X size={20} />
            </button>

            <div className="ps-modal-top-banner">
              <span className="ps-modal-cat">{selectedRow.category}</span>
              <h3 className="ps-modal-title">{selectedRow.title}</h3>
            </div>

            <div className="ps-modal-body">
              <p className="ps-modal-desc">{selectedRow.desc}</p>

              <div className="ps-modal-features-box">
                <h4 className="features-title">✨ वैशिष्ट्ये व समाविष्ट सोयी:</h4>
                <div className="space-y-2.5">
                  {selectedRow.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-800 text-xs sm:text-sm font-black">
                      <CheckCircle2 size={18} className="text-[#db2777] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Details table inside Modal */}
              <div className="ps-modal-all-prices-table">
                <h4 className="features-title">💰 सर्व कालावधींचे सविस्तर दर:</h4>
                <div className="modal-prices-grid-4">
                  <div className="modal-price-box-item">
                    <span className="lbl">वार्षिक</span>
                    <span className="val">₹{selectedRow.yearly}</span>
                  </div>
                  <div className="modal-price-box-item highlight">
                    <span className="lbl">मासिक</span>
                    <span className="val">₹{selectedRow.monthly}</span>
                  </div>
                  <div className="modal-price-box-item">
                    <span className="lbl">आठवडा</span>
                    <span className="val">₹{selectedRow.weekly}</span>
                  </div>
                  <div className="modal-price-box-item">
                    <span className="lbl">दैनिक</span>
                    <span className="val">₹{selectedRow.daily}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <a 
                  href="tel:9970079090" 
                  className="w-full bg-gradient-to-r from-[#541A1A] to-[#db2777] text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition"
                >
                  <PhoneCall size={18} />
                  <span>प्रवेशासाठी थेट संपर्क: ९९७००७९०९०</span>
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

export default PricingSection;
