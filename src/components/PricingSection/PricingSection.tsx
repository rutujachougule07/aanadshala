import React from "react";
import { MapPin, AlertTriangle, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { HighlightText } from "@/components/HighlightText";
import { useLanguage } from "@/lib/use-language";
import { useAdminStore, initialRateItems, RateItem } from "@/lib/admin-store";
import "./PricingSection.css";


export const PricingSection: React.FC = () => {
  const { isEn, formatNum } = useLanguage();
  const { pricingItems } = useAdminStore();
  const rateItems = pricingItems && pricingItems.length > 0 ? pricingItems : initialRateItems;

  return (
    <section className="ps-exact-table-section" id="pricing">
      {/* ── HEADER BLOCK ── */}
      <Reveal>
        <div className="ps-exact-header text-center">
          <h2 className="ps-main-title">
            {isEn ? (
              <>
                Preetam Senior Citizen <span className="text-[#db2777]">Anandshala</span> Official
                Rate Chart
              </>
            ) : (
              <>
                प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777]">आनंदशाळा</span> अधिकृत
                दरपत्रक
              </>
            )}
          </h2>

          <p className="ps-subtitle !font-[300] text-black text-[18px]" style={{ fontWeight: 300, color: "#000000", fontSize: "18px" }}>
            {isEn ? (
              <>
                “Live with joy, nurture health, fulfill your dreams by joining{" "}
                <span className="text-[#db2777] font-black text-[18px]" style={{ fontSize: "18px" }}>Anandshala</span>.” <br />
                <span className="text-[#c2410c] !font-[300] text-[18px]" style={{ fontWeight: 300, fontSize: "18px" }}>
                  Detailed fee structure is provided in the table below:
                </span>
              </>
            ) : (
              <>
                “आनंदात जगायचं, आरोग्य जपायचं,{" "}
                <span className="text-[#db2777] font-black text-[18px]" style={{ fontSize: "18px" }}>आनंदशाळेत</span> येऊन स्वप्न साकारायचं.”{" "}
                <br />
                <span className="text-[#c2410c] !font-[300] text-[18px]" style={{ fontWeight: 300, fontSize: "18px" }}>
                  खालील टेबलमध्ये सविस्तर दर दिले आहेत:
                </span>
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
                <th className="th-details text-left">
                  {isEn ? "Details & Category" : "तपशील (Details)"}
                </th>
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
                    <td className="price-bold" style={{ color: "#db2777" }}>
                      ₹{formatNum(item.monthly)}
                    </td>
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
                  <span className="mobile-price-val" style={{ color: "#db2777" }}>
                    ₹{formatNum(item.monthly)}
                  </span>
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

      <div className="flex justify-center my-10 md:my-12">
        <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-50 via-rose-100 to-purple-50 border-2 border-pink-300 shadow-lg text-[#be185d] font-black text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto">
          <Sparkles className="w-6 h-6 text-pink-600 shrink-0 animate-pulse" />
          <span>
            {isEn
              ? "Curated for senior citizens to experience healthy, happy & peaceful golden years."
              : "ज्येष्ठ नागरिकांना निरोगी, आनंदी आणि निवांतपणे सोनेरी सायंकाळ अनुभवण्यासाठी."}
          </span>
          <Sparkles className="w-6 h-6 text-pink-600 shrink-0 animate-pulse" />
        </div>
      </div>

      {/* ── CONTACT DETAILS FOOTER CARD ── */}
      <Reveal delay={250}>
        <div className="ps-contact-card-footer mt-0">
          <div className="contact-inner flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
            <div className="contact-left space-y-3.5">
              <span className="contact-badge">
                📞 {isEn ? "Direct Contact & Booking" : "थेट संपर्क & बुकिंग"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isEn ? "Shri Abhinay Jagannath Kamaji" : "श्री. अभिनय जगन्नाथ कामाजी"}
              </h3>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-rose-200 font-bold">
                <MapPin size={16} />
                <span>
                  {isEn
                    ? "Address: Preetam House Bldg, Madhavnagar Road, Near Jakat Naka, Sangli."
                    : "पत्ता: प्रीतम हाऊस बिल्डिंग, माधवनगर रोड, जकात नाक्या जवळ, सांगली."}
                </span>
              </p>
              <p className="text-[12px] text-amber-200 font-extrabold flex items-center gap-1.5 pt-1">
                <AlertTriangle size={14} className="shrink-0" />
                <span>
                  {isEn
                    ? "Note: Tariff subject to modification as needed. Terms and conditions apply."
                    : "टिप: सदर दरपत्रकात गरजेनुसार व महागाईनुसार योग्य तो बदल केला जाईल. नियम व अटी लागू."}
                </span>
              </p>
            </div>

            <div className="contact-right-buttons flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <a
                href={`https://wa.me/919370237633?text=${encodeURIComponent("Hi, I am interested in your product/service: Preetam Anandshala Membership & Stay Rate Chart. Please provide more details.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-phone-btn bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700"
              >
                <span>
                  💬 {isEn ? "WhatsApp Inquiry (9370237633)" : "WhatsApp चौकशी (९३७०२३७६३३)"}
                </span>
              </a>
              <a href="tel:9370237633" className="contact-phone-btn second">
                <span>📞 {formatNum("९३७०२३७६३३")}</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default PricingSection;
