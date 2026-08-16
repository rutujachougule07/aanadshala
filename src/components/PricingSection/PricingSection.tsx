import React from "react";
import { 
  MapPin, 
  AlertTriangle 
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { HighlightText } from "@/components/HighlightText";
import { useLanguage } from "@/lib/use-language";
import "./PricingSection.css";

interface RateItem {
  id: string;
  idEn: string;
  titleMr: string;
  titleEn: string;
  categoryMr: string;
  categoryEn: string;
  yearly: string;
  monthly: string;
  weekly: string;
  daily: string;
}

const rateItems: RateItem[] = [
  {
    id: "१",
    idEn: "1",
    titleMr: "ज्येष्ठ नागरिक आनंद शाळा (११ ते ५) फी",
    titleEn: "Senior Citizen Day Anandshala Fee (11 AM to 5 PM)",
    categoryMr: "आनंदशाळा दैनिक फी",
    categoryEn: "Day Pass Fee",
    yearly: "३६,०००/-",
    monthly: "३,६००/-",
    weekly: "१,०११/-",
    daily: "१८०/-",
  },
  {
    id: "२",
    idEn: "2",
    titleMr: "आनंद निवास ३ शेअरिंग रेग्युलर रुम फी",
    titleEn: "Anand Nivas 3 Sharing Regular Room Fee",
    categoryMr: "३ व्यक्ती निवास (३ Sharing)",
    categoryEn: "3 Person Stay (3 Sharing)",
    yearly: "३६,०००/-",
    monthly: "३,६००/-",
    weekly: "१,०११/-",
    daily: "१८०/-",
  },
  {
    id: "३",
    idEn: "3",
    titleMr: "आनंद निवास २ शेअरिंग रेग्युलर रुम फी",
    titleEn: "Anand Nivas 2 Sharing Regular Room Fee",
    categoryMr: "२ व्यक्ती निवास (२ Sharing Regular)",
    categoryEn: "2 Person Stay (2 Sharing Regular)",
    yearly: "४८,०००/-",
    monthly: "४,८००/-",
    weekly: "१,३५०/-",
    daily: "२३०/-",
  },
  {
    id: "४",
    idEn: "4",
    titleMr: "आनंद निवास २ शेअरिंग डीलक्स रुम फी",
    titleEn: "Anand Nivas 2 Sharing Deluxe Room Fee",
    categoryMr: "२ व्यक्ती निवास (२ Sharing Deluxe)",
    categoryEn: "2 Person Stay (2 Sharing Deluxe)",
    yearly: "६०,०००/-",
    monthly: "६,०००/-",
    weekly: "१,६८०/-",
    daily: "२९०/-",
  },
  {
    id: "५",
    idEn: "5",
    titleMr: "आनंद निवास २ शेअरिंग प्रीमियर रुम फी",
    titleEn: "Anandshala 2 Sharing Premier Room Fee",
    categoryMr: "२ व्यक्ती निवास (२ Sharing Premier)",
    categoryEn: "2 Person Stay (2 Sharing Premier)",
    yearly: "७२,०००/-",
    monthly: "७,२००/-",
    weekly: "२,०००/-",
    daily: "३५०/-",
  },
  {
    id: "६",
    idEn: "6",
    titleMr: "आनंद शाळा चहा १, नाष्टा १, जेवण १",
    titleEn: "Anandshala 1 Tea, 1 Snack, 1 Meal Plan",
    categoryMr: "खानपान (१ वेळ चहा/नाष्टा/जेवण)",
    categoryEn: "Dining (Single Meal Plan)",
    yearly: "३०,०००/-",
    monthly: "३,०००/-",
    weekly: "८५०/-",
    daily: "१५०/-",
  },
  {
    id: "७",
    idEn: "7",
    titleMr: "आनंद शाळा चहा २, नाष्टा २, जेवण २",
    titleEn: "Anandshala 2 Teas, 2 Snacks, 2 Full Meals Plan",
    categoryMr: "खानपान (पूर्ण आहार सोय)",
    categoryEn: "Dining (Full Meal Plan)",
    yearly: "६०,०००/-",
    monthly: "६,०००/-",
    weekly: "१,७००/-",
    daily: "३००/-",
  },
  {
    id: "८",
    idEn: "8",
    titleMr: "आनंद शाळा स्कुल बसने जाणे-येणे रेग्युलर",
    titleEn: "Anandshala Van Bus Transport (Regular)",
    categoryMr: "वाहतूक (रेग्युलर बस सेवा)",
    categoryEn: "Transport (Regular Bus Route)",
    yearly: "१८,०००/-",
    monthly: "१,८००/-",
    weekly: "५००/-",
    daily: "९०/-",
  },
  {
    id: "९",
    idEn: "9",
    titleMr: "आनंद शाळा स्कुल बसने जाणे-येणे प्रीमियर",
    titleEn: "Anandshala Van Bus Transport (Doorstep Premier)",
    categoryMr: "वाहतूक (दारातून पिकअप सेवा)",
    categoryEn: "Transport (Doorstep Pickup)",
    yearly: "२७,०००/-",
    monthly: "२,७००/-",
    weekly: "७६०/-",
    daily: "१३०/-",
  }
];

export const PricingSection: React.FC = () => {
  const { isEn, formatNum } = useLanguage();

  return (
    <section className="ps-exact-table-section" id="pricing">
      
      {/* ── HEADER BLOCK ── */}
      <Reveal>
        <div className="ps-exact-header text-center">
          <h2 className="ps-main-title">
            {isEn ? (
              <>Preetam Senior Citizen <span className="text-[#db2777]">Anandshala</span> Official Rate Chart</>
            ) : (
              <>प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span> अधिकृत दरपत्रक</>
            )}
          </h2>

          <p className="ps-subtitle">
            {isEn ? (
              <>
                “Live with joy, nurture health, fulfill your dreams by joining <span className="text-[#db2777] font-black">Anandshala</span>.” <br />
                <span className="text-[#c2410c] font-black">Detailed fee structure is provided in the table below:</span>
              </>
            ) : (
              <>
                “आनंदात जगायचं, आरोग्य जपायचं, <span className="text-[#db2777] font-black">आनंदशाळेत</span> येऊन स्वप्न साकारायचं.” <br />
                <span className="text-[#c2410c] font-black">खालील टेबलमध्ये सविस्तर दर दिले आहेत:</span>
              </>
            )}
          </p>
        </div>
      </Reveal>

      {/* ── DESKTOP & TABLET EXACT RATE TABLE ── */}
      <Reveal delay={100}>
        <div className="ps-table-wrapper">
          <table className="ps-exact-table">
            <thead>
              <tr>
                <th className="th-details text-left">{isEn ? "Details & Category" : "तपशील (Details)"}</th>
                <th>{isEn ? "Yearly" : "वार्षिक (Yearly)"}</th>
                <th>{isEn ? "Monthly" : "मासिक (Monthly)"}</th>
                <th>{isEn ? "Weekly" : "आठवडा (Weekly)"}</th>
                <th>{isEn ? "Daily" : "दिवस (Daily)"}</th>
              </tr>
            </thead>
            <tbody>
              {rateItems.map((item) => {
                const title = isEn ? item.titleEn : item.titleMr;
                const category = isEn ? item.categoryEn : item.categoryMr;
                const itemId = isEn ? item.idEn : item.id;

                return (
                  <tr key={item.id} className="ps-table-row">
                    <td className="td-title-cell text-left">
                      <div className="flex items-center gap-3">
                        <span className="row-num">{itemId}</span>
                        <div>
                          <span className="row-cat-label">{category}</span>
                          <div className="row-title-text font-black text-slate-900">
                            <HighlightText text={title} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="price-bold">₹{formatNum(item.yearly)}</td>
                    <td className="price-bold" style={{ color: "#db2777" }}>₹{formatNum(item.monthly)}</td>
                    <td className="price-bold">₹{formatNum(item.weekly)}</td>
                    <td className="price-bold">₹{formatNum(item.daily)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* ── MOBILE CARD LAYOUT (RESPONSIVE FALLBACK) ── */}
      <div className="ps-mobile-cards-list">
        {rateItems.map((item) => {
          const title = isEn ? item.titleEn : item.titleMr;
          const category = isEn ? item.categoryEn : item.categoryMr;
          const itemId = isEn ? item.idEn : item.id;

          return (
            <div key={item.id} className="ps-mobile-item-card">
              <div className="mobile-card-header">
                <span className="mobile-id-badge">{itemId}</span>
                <span className="mobile-cat-tag">{category}</span>
              </div>
              <h3 className="mobile-title-text">
                <HighlightText text={title} />
              </h3>
              
              <div className="mobile-prices-grid">
                <div className="mobile-price-box">
                  <span className="mobile-price-lbl">{isEn ? "Yearly" : "वार्षिक"}</span>
                  <span className="mobile-price-val">₹{formatNum(item.yearly)}</span>
                </div>
                <div className="mobile-price-box highlight">
                  <span className="mobile-price-lbl">{isEn ? "Monthly" : "मासिक"}</span>
                  <span className="mobile-price-val" style={{ color: "#db2777" }}>₹{formatNum(item.monthly)}</span>
                </div>
                <div className="mobile-price-box">
                  <span className="mobile-price-lbl">{isEn ? "Weekly" : "आठवडा"}</span>
                  <span className="mobile-price-val">₹{formatNum(item.weekly)}</span>
                </div>
                <div className="mobile-price-box">
                  <span className="mobile-price-lbl">{isEn ? "Daily" : "दैनिक"}</span>
                  <span className="mobile-price-val">₹{formatNum(item.daily)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center font-black text-slate-800 text-base sm:text-lg md:text-xl mt-4">
        {isEn
          ? "* Curated for senior citizens to experience healthy, happy & peaceful golden years."
          : "* ज्येष्ठ नागरिकांना निरोगी, आनंदी आणि निवांतपणे सोनेरी सायंकाळ अनुभवण्यासाठी."}
      </p>

      {/* ── CONTACT DETAILS FOOTER CARD ── */}
      <Reveal delay={250}>
        <div className="ps-contact-card-footer mt-6">
          <div className="contact-inner flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="contact-left space-y-2">
              <span className="contact-badge">📞 {isEn ? "Direct Contact & Booking" : "थेट संपर्क & बुकिंग"}</span>
              <h3 className="text-2xl font-black text-white">{isEn ? "Shri Abhinay Jagannath Kamaji" : "श्री. अभिनय जगन्नाथ कामाजी"}</h3>
              <p className="flex items-center gap-1.5 text-xs text-rose-200 font-bold">
                <MapPin size={15} />
                <span>{isEn ? "Address: Preetam House Bldg, Madhavnagar Road, Near Jakat Naka, Sangli." : "पत्ता: प्रीतम हाऊस बिल्डिंग, माधवनगर रोड, जकात नाक्या जवळ, सांगली."}</span>
              </p>
              <p className="text-[11px] text-amber-200 font-extrabold flex items-center gap-1">
                <AlertTriangle size={13} className="shrink-0" />
                <span>{isEn ? "Note: Tariff subject to modification as needed. Terms and conditions apply." : "टिप: सदर दरपत्रकात गरजेनुसार व महागाईनुसार योग्य तो बदल केला जाईल. नियम व अटी लागू."}</span>
              </p>
            </div>

            <div className="contact-right-buttons flex flex-col sm:flex-row gap-3">
              <a href="tel:9970079090" className="contact-phone-btn">
                <span>📞 {formatNum("९९७००७९०९०")}</span>
              </a>
              <a href="tel:9423258859" className="contact-phone-btn second">
                <span>📞 {formatNum("९४२३२५८८५९")}</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

    </section>
  );
};

export default PricingSection;
