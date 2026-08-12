import React from "react";
import { 
  MapPin, 
  AlertTriangle 
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { HighlightText } from "@/components/HighlightText";
import "./PricingSection.css";

interface RateItem {
  id: string;
  title: string;
  category: string;
  yearly: string;
  monthly: string;
  weekly: string;
  daily: string;
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
  },
  {
    id: "२",
    title: "आनंद निवास ३ शेअरिंग रेग्युलर रुम फी",
    category: "३ व्यक्ती निवास (३ Sharing)",
    yearly: "३६,०००/-",
    monthly: "३,६००/-",
    weekly: "१,०११/-",
    daily: "१८०/-",
  },
  {
    id: "३",
    title: "आनंद निवास २ शेअरिंग रेग्युलर रुम फी",
    category: "२ व्यक्ती निवास (२ Sharing Regular)",
    yearly: "४८,०००/-",
    monthly: "४,८००/-",
    weekly: "१,३५०/-",
    daily: "२३०/-",
  },
  {
    id: "४",
    title: "आनंद निवास २ शेअरिंग डीलक्स रुम फी",
    category: "२ व्यक्ती निवास (२ Sharing Deluxe)",
    yearly: "६०,०००/-",
    monthly: "६,०००/-",
    weekly: "१,६८०/-",
    daily: "२९०/-",
  },
  {
    id: "५",
    title: "आनंद निवास २ शेअरिंग प्रीमियर रुम फी",
    category: "२ व्यक्ती निवास (२ Sharing Premier)",
    yearly: "७२,०००/-",
    monthly: "७,२००/-",
    weekly: "२,०००/-",
    daily: "३५०/-",
  },
  {
    id: "६",
    title: "आनंद शाळा चहा १, नाष्टा १, जेवण १",
    category: "खानपान (१ वेळ चहा/नाष्टा/जेवण)",
    yearly: "३०,०००/-",
    monthly: "३,०००/-",
    weekly: "८५०/-",
    daily: "१५०/-",
  },
  {
    id: "७",
    title: "आनंद शाळा चहा २, नाष्टा २, जेवण २",
    category: "खानपान (पूर्ण आहार सोय)",
    yearly: "६०,०००/-",
    monthly: "६,०००/-",
    weekly: "१,७००/-",
    daily: "३००/-",
  },
  {
    id: "८",
    title: "आनंद शाळा स्कुल बसने जाणे-येणे रेग्युलर",
    category: "वाहतूक (रेग्युलर बस सेवा)",
    yearly: "१८,०००/-",
    monthly: "१,८००/-",
    weekly: "५००/-",
    daily: "९०/-",
  },
  {
    id: "९",
    title: "आनंद शाळा स्कुल बसने जाणे-येणे प्रीमियर",
    category: "वाहतूक (दारातून पिकअप सेवा)",
    yearly: "२७,०००/-",
    monthly: "२,७००/-",
    weekly: "७६०/-",
    daily: "१३०/-",
  }
];

export const PricingSection: React.FC = () => {
  return (
    <section className="ps-exact-table-section" id="pricing">
      
      {/* ── HEADER BLOCK ── */}
      <Reveal>
        <div className="ps-exact-header text-center">
          <h2 className="ps-main-title">
            प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span> अधिकृत दरपत्रक
          </h2>

          <p className="ps-subtitle">
            “आनंदात जगायचं, आरोग्य जपायचं, <span className="text-[#db2777] font-black">आनंदशाळेत</span> येऊन स्वप्न साकारायचं.” <br />
            <span className="text-[#c2410c] font-black">खालील टेबलमध्ये सविस्तर दर दिले आहेत:</span>
          </p>
        </div>
      </Reveal>

      {/* ── DESKTOP & TABLET EXACT RATE TABLE ── */}
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
                <tr key={item.id} className="ps-table-row">
                  <td className="td-title-cell text-left">
                    <div className="flex items-center gap-3">
                      <span className="row-num">{item.id}</span>
                      <div>
                        <span className="row-cat-label">{item.category}</span>
                        <div className="row-title-text font-black text-slate-900">
                          <HighlightText text={item.title} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="price-bold">₹{item.yearly}</td>
                  <td className="price-bold" style={{ color: "#db2777" }}>₹{item.monthly}</td>
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
          <div key={item.id} className="ps-mobile-item-card">
            <div className="mobile-card-header">
              <span className="mobile-id-badge">{item.id}</span>
              <span className="mobile-cat-tag">{item.category}</span>
            </div>
            <h3 className="mobile-title-text">
              <HighlightText text={item.title} />
            </h3>
            
            <div className="mobile-prices-grid">
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">वार्षिक</span>
                <span className="mobile-price-val">₹{item.yearly}</span>
              </div>
              <div className="mobile-price-box highlight">
                <span className="mobile-price-lbl">मासिक</span>
                <span className="mobile-price-val" style={{ color: "#db2777" }}>₹{item.monthly}</span>
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
          </div>
        ))}
      </div>

      <p className="text-center font-extrabold text-slate-700 text-xs sm:text-sm mt-4">
        * ज्येष्ठ नागरिकांना निरोगी, आनंदी आणि निवांतपणे सोनेरी सायंकाळ अनुभवण्यासाठी.
      </p>

      {/* ── CONTACT DETAILS FOOTER CARD ── */}
      <Reveal delay={250}>
        <div className="ps-contact-card-footer mt-6">
          <div className="contact-inner flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="contact-left space-y-2">
              <span className="contact-badge">📞 थेट संपर्क & बुकिंग</span>
              <h3 className="text-2xl font-black text-white">श्री. अभिनय जगन्नाथ कामाजी</h3>
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

    </section>
  );
};

export default PricingSection;
