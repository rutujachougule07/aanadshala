import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAdminStore } from "@/lib/admin-store";
import { useLanguage } from "@/lib/use-language";
import {
  CalendarDays,
  Activity,
  Gamepad2,
  Dumbbell,
  Crown,
  Book,
  Music,
  Footprints,
  Coffee,
  ShieldCheck,
  Award,
  Trophy,
  X,
  HeartPulse,
  User,
  Users,
  Clock,
  Zap,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Info,
  Check,
  Gift
} from "lucide-react";
import { HighlightText } from "@/components/HighlightText";
import "@/components/PricingSection/PricingSection.css";
import "./SportsPricingSection.css";

const sportsClubPhones = ["9370237633", "9370237634"];

interface SportsRateItem {
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

const sportsRateItems: SportsRateItem[] = [
  {
    id: "१",
    idEn: "1",
    titleMr: "जिम & बॉडीबिल्डिंग (Gym & Bodybuilding)",
    titleEn: "Gym & Bodybuilding",
    categoryMr: "अत्याधुनिक जिम (AC GYM)",
    categoryEn: "AC Gym Hall",
    yearly: "१८,०००/-",
    monthly: "३,५००/-",
    weekly: "१,०००/-",
    daily: "२००/-",
  },
  {
    id: "२",
    idEn: "2",
    titleMr: "ऑलिंपिक स्विमिंग पूल (Olympic Swimming Pool)",
    titleEn: "Olympic Swimming Pool",
    categoryMr: "जलतरण सोय (SWIMMING POOL)",
    categoryEn: "Swimming Pool",
    yearly: "१८,०००/-",
    monthly: "३,५००/-",
    weekly: "१,०००/-",
    daily: "२००/-",
  },
  {
    id: "३",
    idEn: "3",
    titleMr: "इनडोअर बॅडमिंटन कोर्ट्स (Indoor Badminton)",
    titleEn: "Indoor Badminton",
    categoryMr: "इनडोअर कोर्ट्स (BADMINTON)",
    categoryEn: "Badminton Courts",
    yearly: "१८,०००/-",
    monthly: "३,५००/-",
    weekly: "१,०००/-",
    daily: "२००/-",
  },
  {
    id: "४",
    idEn: "4",
    titleMr: "पिकलबॉल कोर्ट (Pickleball Court)",
    titleEn: "Pickleball Court",
    categoryMr: "ट्रेंडिंग स्पोर्ट्स (PICKLEBALL)",
    categoryEn: "Pickleball Sport",
    yearly: "१८,०००/-",
    monthly: "३,५००/-",
    weekly: "१,०००/-",
    daily: "२००/-",
  },
  {
    id: "५",
    idEn: "5",
    titleMr: "योग & ध्यान कक्ष (Yoga & Meditation)",
    titleEn: "Yoga & Meditation Hall",
    categoryMr: "वेलनेस (YOGA & MEDITATION)",
    categoryEn: "Yoga & Wellness",
    yearly: "१५,०००/-",
    monthly: "२,५००/-",
    weekly: "८००/-",
    daily: "१५०/-",
  },
  {
    id: "६",
    idEn: "6",
    titleMr: "झुंबा & फिटनेस डान्स (Zumba & Fitness Dance)",
    titleEn: "Zumba & Fitness Dance",
    categoryMr: "कार्डिओ डान्स (ZUMBA DANCE)",
    categoryEn: "Zumba Dance",
    yearly: "१५,०००/-",
    monthly: "२,५००/-",
    weekly: "८००/-",
    daily: "१५०/-",
  },
  {
    id: "७",
    idEn: "7",
    titleMr: "टेबल टेनिस & इनडोअर गेम्स (Table Tennis)",
    titleEn: "Table Tennis & Indoor Games",
    categoryMr: "इनडोअर गेम्स (TABLE TENNIS)",
    categoryEn: "Table Tennis",
    yearly: "१२,०००/-",
    monthly: "२,०००/-",
    weekly: "६००/-",
    daily: "१००/-",
  },
  {
    id: "८",
    idEn: "8",
    titleMr: "स्नूकर & पूल टेबल्स (Snooker & Pool)",
    titleEn: "Snooker & Pool",
    categoryMr: "इनडोअर गेम्स (SNOOKER & POOL)",
    categoryEn: "Snooker & Pool",
    yearly: "१५,०००/-",
    monthly: "२,५००/-",
    weekly: "८००/-",
    daily: "१५०/-",
  },
];

interface PackageDetail {
  title: string;
  duration: string;
  rackRate: string;
  offerPrice: string;
  savings: string;
  facilityNote?: string;
  benefits: string[];
}

const SportsPricingSection = () => {
  const store = useAdminStore();
  const { isEn, formatNum } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("12 Months Package");
  const [selectedDetail, setSelectedDetail] = useState<PackageDetail | null>(null);

  const [durationFilter, setDurationFilter] = useState<"all" | "day" | "month" | "year">("all");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    package: "12 Months Package"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = (planName: string) => {
    setSelectedPlan(planName);
    setFormData((prev) => ({ ...prev, package: planName }));
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleOpenDetailModal = (detail: PackageDetail) => {
    setSelectedDetail(detail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    store.addInquiry({
      name: formData.name,
      phone: formData.phone,
      email: "",
      subject: `Sports Club Membership Inquiry (${formData.package})`,
      message: `Admission / Membership Inquiry: Online registration for ${formData.package}.`,
      category: "sports",
    });
    setIsSubmitted(true);
  };

  // Package Data Objects for easy re-use
  const pkgDayPass: PackageDetail = {
    title: isEn ? "Sports Club Day Pass" : "स्पोर्ट्स क्लब डे पास (Day Pass)",
    duration: isEn ? "1 Day Pass" : "१ दिवस (Day Pass)",
    rackRate: isEn ? "₹ 500" : "₹ ५००",
    offerPrice: isEn ? "₹ 300" : "₹ ३००",
    savings: isEn ? "All sports facilities for 1 Day!" : "सर्व क्रीडा सोयी एका दिवसासाठी!",
    facilityNote: isEn
      ? "Access Olympic Swimming Pool, 24x7 Gym & all indoor games for 1 day."
      : "ऑलिंपिक स्विमिंग पूल, २४x७ जीम व सर्व इनडोअर गेम्स एका दिवसासाठी वापरा",
    benefits: isEn
      ? [
        "Unlimited 1-day access to Olympic Swimming Pool",
        "24x7 Gym & indoor games access",
        "Complimentary tea & light snacks"
      ]
      : [
        "ऑलिंपिक स्विमिंग पूल अमर्याद १ दिवस वापर",
        "२४x७ जिम व इनडोअर गेम्स वापर",
        "चहा व अल्पोपहार सोय विनामूल्य"
      ]
  };

  const pkgFreeTrialPass: PackageDetail = {
    title: isEn ? "Free 1-Day Trial Pass" : "१-दिवसाचा फ्री ट्रायअल पास (Free 1-Day Trial Pass)",
    duration: isEn ? "1 Day (Free 1-Day Demo Pass)" : "१ दिवस (विनामूल्य १-दिवस ट्रायल डेमो पास)",
    rackRate: isEn ? "₹ 500" : "₹ ५००",
    offerPrice: isEn ? "₹ 0 (Free 1-Day Trial)" : "₹ ० (मोफत १-दिवस ट्रायअल)",
    savings: isEn ? "100% Free Pass • Zero Fee, Zero Conditions!" : "१००% मोफत पास • शून्य शुल्क, शून्य अट!",
    facilityNote: isEn
      ? "Experience Olympic Swimming Pool, 24x7 Gym & sports facilities firsthand for free."
      : "ऑलिंपिक स्विमिंग पूल, २४x७ जीम व क्रीडा सोयींचा प्रत्यक्ष विनामूल्य अनुभव घ्या",
    benefits: isEn
      ? [
        "Free unlimited entry to Olympic Swimming Pool",
        "24x7 Hi-Tech AC Gym & fitness assessment free",
        "Free 1-on-1 consultation with certified trainers",
        "Free access to Library, Jogging Track & Music Hall",
        "Complimentary tea & snacks"
      ]
      : [
        "विनामूल्य ऑलिंपिक स्विमिंग पूल अमर्याद entry",
        "२४x७ हायटेक AC जिम व फिटनेस असेसमेंट मोफत",
        "प्रमाणित फिटनेस तज्ञांसोबत १-ऑन-१ विनामूल्य सल्लागार",
        "ग्रंथालय, जॉगिंग ट्रॅक व म्युझिक हॉल ॲक्सेस विनामूल्य",
        "चहा व अल्पोपहार सोय विनामूल्य"
      ]
  };

  const pkg12Months: PackageDetail = {
    title: isEn ? "12 Months (1 Year) Membership Package" : "१२ महिने (१ वर्ष) मेंबरशिप पॅकेज",
    duration: isEn ? "12 Months (1 Year)" : "१२ महिने (12 Months / 1 Year)",
    rackRate: isEn ? "₹ 18,000" : "₹ १८,०००",
    offerPrice: isEn ? "₹ 11,999" : "₹ ११,९९९",
    savings: isEn ? "Save ₹ 6,001! (33% OFF)" : "₹ ६,००१ ची भरघोस बचत! (33% OFF)",
    facilityNote: isEn
      ? "Access to 1 chosen facility (Gym, Olympic Pool, Pickleball, Badminton, Squash, Snooker, or TT)"
      : "जिम, ऑलिंपिक स्विमिंग पूल, पिकलबॉल, इनडोअर बॅडमिंटन, स्क्वॅश, स्नूकर किंवा टेबल टेनिस पैकी एका विशिष्ट सुविधेचा प्रवेश",
    benefits: isEn
      ? [
        "Unlimited access to 1 chosen facility (Gym/Pool/Badminton/Pickleball/Squash/Snooker/TT)",
        "Free unlimited access to Library & Music Hall",
        "Free access to Fitness Garden & World-Class Jogging Track",
        "Complimentary Steam Bath facility",
        "Free guidance from certified personal trainers",
        "Free fitness assessment & diet chart session"
      ]
      : [
        "निवडलेल्या एका मुख्य सोयीचा (Gym/Pool/Badminton/Pickleball/Squash/Snooker/TT) अमर्याद प्रवेश",
        "ग्रंथालय (Library) व म्युझिक हॉल (Music Hall) मोफत विनामूल्य प्रवेश",
        "फिटनेस गार्डन व जागतिक दर्जाचा जॉगिंग ट्रॅक मोफत प्रवेश",
        "स्टीम बाथ (Steam Bath) सुविधा मोफत उपलब्ध",
        "प्रमाणित वैयक्तिक फिटनेस ट्रेनर्सचे मोफत मार्गदर्शन",
        "मोफत फिटनेस असेसमेंट व डाएट चार्ट सेशन"
      ]
  };

  const pkg6Months: PackageDetail = {
    title: isEn ? "6 Months Membership Package" : "६ महिने मेंबरशिप पॅकेज",
    duration: isEn ? "6 Months" : "६ महिने (6 Months)",
    rackRate: isEn ? "₹ 12,000" : "₹ १२,०००",
    offerPrice: isEn ? "₹ 6,999" : "₹ ६,९९९",
    savings: isEn ? "Save ₹ 5,001! (42% OFF)" : "₹ ५,००१ ची भरघोस बचत! (42% OFF)",
    facilityNote: isEn
      ? "Access to 1 chosen facility"
      : "जिम, ऑलिंपिक स्विमिंग पूल, पिकलबॉल, इनडोअर बॅडमिंटन, स्क्वॅश, स्नूकर किंवा टेबल टेनिस पैकी एका विशिष्ट सुविधेचा प्रवेश",
    benefits: isEn
      ? [
        "Unlimited 6-month access to 1 main facility",
        "Free access to Library & Music Hall",
        "Free access to Fitness Garden & Jogging Track",
        "Steam Bath facility available",
        "Free consultation from certified fitness trainers"
      ]
      : [
        "निवडलेल्या एका मुख्य सोयीचा (Gym/Pool/Badminton/Pickleball/Squash/Snooker/TT) अमर्याद प्रवेश",
        "ग्रंथालय (Library) व म्युझिक हॉल (Music Hall) मोफत विनामूल्य प्रवेश",
        "फिटनेस गार्डन व जागतिक दर्जाचा जॉगिंग ट्रॅक मोफत प्रवेश",
        "स्टीम बाथ (Steam Bath) सुविधा उपलब्ध",
        "प्रमाणित फिटनेस ट्रेनर्सचे मोफत मार्गदर्शन"
      ]
  };

  const pkg3Months: PackageDetail = {
    title: isEn ? "3 Months Membership Package" : "३ महिने मेंबरशिप पॅकेज",
    duration: isEn ? "3 Months" : "३ महिने (3 Months)",
    rackRate: isEn ? "₹ 7,500" : "₹ ७,५००",
    offerPrice: isEn ? "₹ 3,999" : "₹ ३,९९९",
    savings: isEn ? "Save ₹ 3,501! (47% OFF)" : "₹ ३,५०१ ची भरघोस बचत! (47% OFF)",
    facilityNote: isEn ? "Access to 1 chosen facility" : "जिम, ऑलिंपिक स्विमिंग पूल, पिकलबॉल, इनडोअर बॅडमिंटन, स्क्वॅश, स्नूकर किंवा टेबल टेनिस पैकी एका विशिष्ट सुविधेचा प्रवेश",
    benefits: isEn
      ? [
        "Unlimited 3-month access to 1 chosen facility",
        "Free Library & Music Hall access",
        "Free Fitness Garden & Jogging Track access",
        "Free indoor sitting games"
      ]
      : [
        "निवडलेल्या एका मुख्य सोयीचा अमर्याद प्रवेश",
        "ग्रंथालय व म्युझिक हॉल मोफत प्रवेश",
        "फिटनेस गार्डन व जॉगिंग ट्रॅक मोफत प्रवेश",
        "इनडोअर सिटिंग गेम्स सोयी मोफत"
      ]
  };

  const pkg1Month: PackageDetail = {
    title: isEn ? "1 Month Trial Package" : "१ महिना ट्रायलर पॅकेज",
    duration: isEn ? "1 Month" : "१ महिना (1 Month)",
    rackRate: isEn ? "₹ 3,500" : "₹ ३,५००",
    offerPrice: isEn ? "₹ 1,499" : "₹ १,४९९",
    savings: isEn ? "Save ₹ 2,001! (57% OFF)" : "₹ २,००१ ची बचत! (57% OFF)",
    facilityNote: isEn ? "Access to 1 chosen facility" : "जिम, ऑलिंपिक स्विमिंग पूल, पिकलबॉल, इनडोअर बॅडमिंटन, स्क्वॅश, स्नूकर किंवा टेबल टेनिस पैकी एका विशिष्ट सुविधेचा प्रवेश",
    benefits: isEn
      ? [
        "Unlimited 1-month access to 1 main facility",
        "Free Library & Music Hall access",
        "Free Outdoor Fitness Garden & Jogging Track"
      ]
      : [
        "निवडलेल्या एका मुख्य सोयीचा १ महिना अमर्याद प्रवेश",
        "ग्रंथालय व म्युझिक हॉल मोफत प्रवेश",
        "आउटडोअर फिटनेस गार्डन व जॉगिंग ट्रॅक मोफत"
      ]
  };

  return (
    <>
      <section className="ps-exact-table-section" id="sports-pricing">

        {/* ── HEADER BLOCK (MATCHING ANANDSHALA RATE CARD) ── */}
        <div className="ps-exact-header text-center mb-6">
          <h2 className="typo-heading-main text-[#0044cc] leading-tight text-center my-2">
            {isEn ? (
              <>Preetam Sports & Fitness Club <span className="text-[#db2777]">Official Rate Chart</span></>
            ) : (
              <>प्रीतम स्पोर्ट्स अँड फिटनेस क्लब <span className="text-[#db2777]">अधिकृत दरपत्रक</span></>
            )}
          </h2>

          <p className="ps-subtitle typo-subheading max-w-3xl mx-auto text-slate-700 mt-2">
            {isEn
              ? "These rates apply to a membership for one single facility (Gym, Swimming Pool, Pickleball, Badminton, Table Tennis, Squash or Snooker):"
              : "हे दर एका विशिष्ट सुविधेसाठी (जिम, स्विमिंग पूल, पिकलबॉल, बॅडमिंटन, टेबल टेनिस, स्क्वॅश किंवा स्नूकर) लागू आहेत:"}
          </p>
        </div>

        {/* ── DESKTOP & TABLET EXACT 4-ROW SPORTS RATE TABLE (MATCHING ANANDSHALA SCREENSHOT) ── */}
        <div className="ps-table-wrapper max-w-5xl mx-auto">
          <table className="ps-exact-table w-full">
            <thead>
              <tr>
                <th className="th-details text-left py-4 px-5">{isEn ? "Membership Duration" : "कालावधी (MEMBERSHIP DURATION)"}</th>
                <th className="py-4 px-4 text-center">{isEn ? "Rack Rate (₹)" : "मूळ दर (RACK RATE ₹)"}</th>
                <th className="py-4 px-4 text-center">{isEn ? "Pre-Launch Offer (₹)" : "प्री-लाँच दर (OFFER ₹)"}</th>
                <th className="py-4 px-4 text-center">{isEn ? "Savings (₹)" : "एकूण बचत (SAVINGS ₹)"}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="ps-table-row">
                <td className="td-title-cell text-left py-4 px-5 font-black text-slate-900 text-base">
                  <div className="flex items-center gap-3">
                    <span className="row-num">{formatNum("1")}</span>
                    <div>
                      <span className="row-cat-label">{isEn ? "1 YEAR PACKAGE" : "१२ महिने पॅकेज"}</span>
                      <div className="row-title-text font-black text-slate-900 text-base">
                        {isEn ? "12 Months (1 Year)" : "12 Months (१२ महिने / १ वर्ष)"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="price-bold text-slate-900 text-center font-black text-base">₹ {formatNum("18,000")}</td>
                <td className="price-bold text-center font-black text-[#db2777] text-lg sm:text-xl">₹ {formatNum("11,999")}</td>
                <td className="price-bold text-center font-black text-[#059669] bg-[#ebfbf3] text-base">₹ {formatNum("6,001")} {isEn ? "Savings" : "बचत"}</td>
              </tr>

              <tr className="ps-table-row">
                <td className="td-title-cell text-left py-4 px-5 font-black text-slate-900 text-base">
                  <div className="flex items-center gap-3">
                    <span className="row-num">{formatNum("2")}</span>
                    <div>
                      <span className="row-cat-label">{isEn ? "HALF YEAR PACKAGE" : "६ महिने पॅकेज"}</span>
                      <div className="row-title-text font-black text-slate-900 text-base">
                        {isEn ? "6 Months" : "6 Months (६ महिने)"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="price-bold text-slate-900 text-center font-black text-base">₹ {formatNum("12,000")}</td>
                <td className="price-bold text-center font-black text-[#db2777] text-lg sm:text-xl">₹ {formatNum("6,999")}</td>
                <td className="price-bold text-center font-black text-[#059669] bg-[#ebfbf3] text-base">₹ {formatNum("5,001")} {isEn ? "Savings" : "बचत"}</td>
              </tr>

              <tr className="ps-table-row">
                <td className="td-title-cell text-left py-4 px-5 font-black text-slate-900 text-base">
                  <div className="flex items-center gap-3">
                    <span className="row-num">{formatNum("3")}</span>
                    <div>
                      <span className="row-cat-label">{isEn ? "3 MONTHS PACKAGE" : "३ महिने पॅकेज"}</span>
                      <div className="row-title-text font-black text-slate-900 text-base">
                        {isEn ? "3 Months" : "3 Months (३ महिने)"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="price-bold text-slate-900 text-center font-black text-base">₹ {formatNum("7,500")}</td>
                <td className="price-bold text-center font-black text-[#db2777] text-lg sm:text-xl">₹ {formatNum("3,999")}</td>
                <td className="price-bold text-center font-black text-[#059669] bg-[#ebfbf3] text-base">₹ {formatNum("3,501")} {isEn ? "Savings" : "बचत"}</td>
              </tr>

              <tr className="ps-table-row">
                <td className="td-title-cell text-left py-4 px-5 font-black text-slate-900 text-base">
                  <div className="flex items-center gap-3">
                    <span className="row-num">{formatNum("4")}</span>
                    <div>
                      <span className="row-cat-label">{isEn ? "1 MONTH PACKAGE" : "१ महिना पॅकेज"}</span>
                      <div className="row-title-text font-black text-slate-900 text-base">
                        {isEn ? "1 Month" : "1 Month (१ महिना)"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="price-bold text-slate-900 text-center font-black text-base">₹ {formatNum("3,500")}</td>
                <td className="price-bold text-center font-black text-[#db2777] text-lg sm:text-xl">₹ {formatNum("1,499")}</td>
                <td className="price-bold text-center font-black text-[#059669] bg-[#ebfbf3] text-base">₹ {formatNum("2,001")} {isEn ? "Savings" : "बचत"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── MOBILE RESPONSIVE CARDS (4 EXACT ROWS) ── */}
        <div className="ps-mobile-cards-list">
          <div className="ps-mobile-item-card">
            <div className="mobile-card-header">
              <span className="mobile-id-badge">{formatNum("1")}</span>
              <span className="mobile-cat-tag">12 Months</span>
            </div>
            <div className="mobile-title-text font-black">{isEn ? "12 Months (1 Year)" : "12 Months (१२ महिने / १ वर्ष)"}</div>
            <div className="mobile-prices-grid grid-cols-3">
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Rack Rate" : "मूळ दर"}</span>
                <span className="mobile-price-val text-slate-900 font-black">₹ {formatNum("18,000")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Offer Rate" : "ऑफर दर"}</span>
                <span className="mobile-price-val text-[#db2777]">₹ {formatNum("11,999")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Savings" : "बचत"}</span>
                <span className="mobile-price-val text-[#059669]">₹ {formatNum("6,001")}</span>
              </div>
            </div>
          </div>

          <div className="ps-mobile-item-card">
            <div className="mobile-card-header">
              <span className="mobile-id-badge">{formatNum("2")}</span>
              <span className="mobile-cat-tag">6 Months</span>
            </div>
            <div className="mobile-title-text font-black">{isEn ? "6 Months" : "6 Months (६ महिने)"}</div>
            <div className="mobile-prices-grid grid-cols-3">
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Rack Rate" : "मूळ दर"}</span>
                <span className="mobile-price-val text-slate-900 font-black">₹ {formatNum("12,000")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Offer Rate" : "ऑफर दर"}</span>
                <span className="mobile-price-val text-[#db2777]">₹ {formatNum("6,999")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Savings" : "बचत"}</span>
                <span className="mobile-price-val text-[#059669]">₹ {formatNum("5,001")}</span>
              </div>
            </div>
          </div>

          <div className="ps-mobile-item-card">
            <div className="mobile-card-header">
              <span className="mobile-id-badge">{formatNum("3")}</span>
              <span className="mobile-cat-tag">3 Months</span>
            </div>
            <div className="mobile-title-text font-black">{isEn ? "3 Months" : "3 Months (३ महिने)"}</div>
            <div className="mobile-prices-grid grid-cols-3">
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Rack Rate" : "मूळ दर"}</span>
                <span className="mobile-price-val text-slate-900 font-black">₹ {formatNum("7,500")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Offer Rate" : "ऑफर दर"}</span>
                <span className="mobile-price-val text-[#db2777]">₹ {formatNum("3,999")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Savings" : "बचत"}</span>
                <span className="mobile-price-val text-[#059669]">₹ {formatNum("3,501")}</span>
              </div>
            </div>
          </div>

          <div className="ps-mobile-item-card">
            <div className="mobile-card-header">
              <span className="mobile-id-badge">{formatNum("4")}</span>
              <span className="mobile-cat-tag">1 Month</span>
            </div>
            <div className="mobile-title-text font-black">{isEn ? "1 Month" : "1 Month (१ महिना)"}</div>
            <div className="mobile-prices-grid grid-cols-3">
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Rack Rate" : "मूळ दर"}</span>
                <span className="mobile-price-val text-slate-900 font-black">₹ {formatNum("3,500")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Offer Rate" : "ऑफर दर"}</span>
                <span className="mobile-price-val text-[#db2777]">₹ {formatNum("1,499")}</span>
              </div>
              <div className="mobile-price-box">
                <span className="mobile-price-lbl">{isEn ? "Savings" : "बचत"}</span>
                <span className="mobile-price-val text-[#059669]">₹ {formatNum("2,001")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── III. PREETAM ELITE – FAMILY LIFETIME MEMBERSHIP SECTION ── */}
        <div className="ps-elite-wrapper max-w-5xl mx-auto mt-8 bg-gradient-to-br from-amber-50/90 via-white to-pink-50/90 border-2 border-amber-300/80 rounded-3xl p-6 sm:p-8 shadow-xl text-slate-900 relative overflow-hidden text-left">
          {/* Background Decorative Glow */}
          <div className="absolute -top-12 -right-12 size-40 bg-gradient-to-br from-amber-300/30 to-pink-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-amber-200/80 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs mb-2 shadow-xs">
                  <span>👑</span>
                  <span>{isEn ? "Elite Family Membership" : "प्रीतम एलिट १० वर्षे मेंबरशिप"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {isEn ? "PREETAM ELITE – Family Lifetime Membership" : "प्रीतम एलिट – फॅमिली १० वर्षे मेंबरशिप (Preetam Elite)"}
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <a
                  href="tel:+919370237633"
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>📞</span>
                  <span>{isEn ? "Call 93702 37633" : "कॉल करा: 93702 37633"}</span>
                </a>

                <a
                  href={`https://wa.me/919370237633?text=${encodeURIComponent(isEn ? "Hello, I want to inquire about Preetam Elite 10 Years Membership." : "नमस्कार, मला प्रीतम एलिट १० वर्षे फॅमिली मेंबरशिप बद्दल चौकशी करायची आहे.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-slate-700 mb-6 bg-white/90 p-3.5 rounded-2xl border border-amber-200/70 shadow-xs">
              ℹ️ {isEn ? (
                "This is a comprehensive membership package offering extensive access and benefits for 10 years across all amenities."
              ) : (
                "हा संपूर्ण कुटुंबासाठी (४ सदस्यांसाठी) सलग १० वर्षे सर्व स्पोर्ट्स व ॲक्टिव्हिटी सुविधांचा आनंद देणारा अत्यंत समृद्ध मेंबरशिप पॅकेज आहे."
              )}
            </p>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-hidden rounded-2xl border-2 border-amber-200/80 shadow-md bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-100/90 via-amber-50 to-pink-50 border-b border-amber-200 text-amber-950 font-black text-sm">
                    <th className="py-3.5 px-5 w-1/3 border-r border-amber-200/60">{isEn ? "Feature" : "वैशिष्ट्य"}</th>
                    <th className="py-3.5 px-5">{isEn ? "Details" : "तपशील"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100 text-xs sm:text-sm font-extrabold text-slate-800">
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-3.5 px-5 font-black text-amber-900 flex items-center gap-2 border-r border-amber-100">
                      <span>⏳</span>
                      <span>{isEn ? "Duration" : "कालावधी"}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-900 font-black">{isEn ? "10 Years" : "१० वर्षे"}</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-3.5 px-5 font-black text-amber-900 flex items-center gap-2 border-r border-amber-100">
                      <span>👨‍👩‍👧‍👦</span>
                      <span>{isEn ? "Members Included" : "समाविष्ट सदस्य"}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-900 font-black">{isEn ? "4 Members" : "कुटुंबातील ४ सदस्य"}</td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-3.5 px-5 font-black text-amber-900 flex items-center gap-2 border-r border-amber-100">
                      <span>🏆</span>
                      <span>{isEn ? "Access Included" : "समाविष्ट सुविधा"}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-900 font-bold">
                      {isEn ? "Access to all Sports Facilities and Activity Zone Facilities" : "सर्व स्पोर्ट्स क्लब सुविधा आणि ॲक्टिव्हिटी झोन सुविधांचा अमर्याद प्रवेश"}
                    </td>
                  </tr>
                  <tr className="hover:bg-amber-50/50 transition">
                    <td className="py-3.5 px-5 font-black text-amber-900 flex items-center gap-2 border-r border-amber-100">
                      <span>📝</span>
                      <span>{isEn ? "Access Note" : "टीप / नोंद"}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-extrabold">
                      {isEn ? "Slot-based access; pre-booking is required." : "स्लॉट-आधारित प्रवेश; पूर्व-बुकिंग आवश्यक आहे."}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block sm:hidden space-y-3">
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs">
                <span className="text-amber-900 font-black text-xs block mb-1">{isEn ? "⏳ Duration" : "⏳ कालावधी"}</span>
                <span className="text-slate-900 font-black text-sm">{isEn ? "10 Years" : "१० वर्षे"}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs">
                <span className="text-amber-900 font-black text-xs block mb-1">{isEn ? "👨‍👩‍👧‍👦 Members Included" : "👨‍👩‍👧‍👦 समाविष्ट सदस्य"}</span>
                <span className="text-slate-900 font-black text-sm">{isEn ? "4 Members" : "कुटुंबातील ४ सदस्य"}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs">
                <span className="text-amber-900 font-black text-xs block mb-1">{isEn ? "🏆 Access Included" : "🏆 समाविष्ट सुविधा"}</span>
                <span className="text-slate-900 font-bold text-xs">{isEn ? "Access to all Sports Facilities and Activity Zone Facilities" : "सर्व स्पोर्ट्स क्लब सुविधा आणि ॲक्टिव्हिटी झोन सुविधांचा प्रवेश"}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-xs">
                <span className="text-amber-900 font-black text-xs block mb-1">{isEn ? "📝 Access Note" : "📝 टीप / नोंद"}</span>
                <span className="text-slate-700 font-bold text-xs">{isEn ? "Slot-based access; pre-booking is required." : "स्लॉट-आधारित प्रवेश; पूर्व-बुकिंग आवश्यक."}</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Package Detail Information Modal */}
      {selectedDetail && createPortal(
        <div
          className="sp-modal-overlay"
          onClick={() => setSelectedDetail(null)}
        >
          <div
            className="sp-modal-content max-w-lg border-2 border-pink-400/50 shadow-2xl animate-fade-down pt-8 pr-10 pb-6 pl-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sp-modal-close" onClick={() => setSelectedDetail(null)}>
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-pink-600 font-extrabold text-xs mb-1 pt-2">
              <Sparkles size={16} />
              <span>{isEn ? "Membership Package Details" : "मेंबरशिप पॅकेज तपशील माहिती"}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 pr-6">
              {selectedDetail.title}
            </h3>

            {/* Price Badge inside Detail Modal */}
            <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-4 rounded-2xl border border-pink-200 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-bold">{isEn ? "Regular Price: " : "मूळ दर (Rack Rate): "}<span className="line-through text-slate-400">{selectedDetail.rackRate}</span></div>
                  <div className="text-2xl font-black text-pink-600">{selectedDetail.offerPrice} <span className="text-xs text-slate-600 font-bold">/-</span></div>
                </div>
                <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-black">
                  {selectedDetail.savings}
                </div>
              </div>

              {selectedDetail.facilityNote && (
                <div className="mt-3 pt-3 border-t border-pink-200/60 text-xs font-bold text-slate-700">
                  📍 {selectedDetail.facilityNote}
                </div>
              )}
            </div>

            {/* Included Benefits List */}
            <h4 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>पॅकेजमध्ये समाविष्ट असणाऱ्या सोयी (Included Benefits):</span>
            </h4>

            <ul className="space-y-2.5 mb-6">
              {selectedDetail.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-800 text-xs font-bold bg-white p-3 rounded-xl border border-pink-100 shadow-xs">
                  <span className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const planName = selectedDetail.title;
                  setSelectedDetail(null);
                  handleOpenModal(planName);
                }}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-black text-xs sm:text-sm shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🔥 या पॅकेजसाठी नोंदणी करा</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={`https://wa.me/91${sportsClubPhones[0]}?text=नमस्कार,%20मला%20${encodeURIComponent(selectedDetail.title)}%20बद्दल%20अधिक%20माहिती%20हवी%20आहे.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2"
              >
                💬 WhatsApp
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* Inquiry Form Modal via Portal */}
      {isModalOpen && createPortal(
        <div
          className="sp-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="sp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sp-modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>

            {!isSubmitted ? (
              <>
                <h3 className="sp-modal-title">आजच ऑनलाईन नोंदणी करा</h3>
                <p className="sp-modal-desc">
                  खालील माहिती भरा. प्रीतम स्पोर्ट्स क्लब टीम आपल्याशी त्वरित संपर्क साधेल!
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="sp-form-group">
                    <label>१. आपले संपूर्ण नाव *</label>
                    <input
                      type="text"
                      placeholder="उदा. राहुल सचिन पाटील"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="sp-form-group">
                    <label>२. संपर्क मोबाईल नंबर *</label>
                    <input
                      type="tel"
                      placeholder="उदा. 9876543210"
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="sp-form-group">
                    <label>३. निवडलेले पॅकेज (Package)</label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="bg-[#0f172a] text-white font-bold"
                    >
                      <option value="१-दिवसाचा फ्री ट्रायअल पास (Free 1-Day Trial Pass)" className="bg-[#0f172a] text-white font-bold">१-दिवसाचा फ्री ट्रायअल पास (मोफत)</option>
                      <option value="1 Day Pass (₹300)" className="bg-[#0f172a] text-white font-bold">१ दिवस डे-पास (₹३००)</option>
                      <option value="12 Months Package" className="bg-[#0f172a] text-white font-bold">१२ महिने पॅकेज (₹११,९९९)</option>
                      <option value="6 Months Package" className="bg-[#0f172a] text-white font-bold">६ महिने पॅकेज (₹६,९९९)</option>
                      <option value="3 Months Package" className="bg-[#0f172a] text-white font-bold">३ महिने पॅकेज (₹३,९९९)</option>
                      <option value="1 Month Package" className="bg-[#0f172a] text-white font-bold">१ महिना पॅकेज (₹१,४९९)</option>
                      <option value="Annual Special Offer" className="bg-[#0f172a] text-white font-bold">विशेष वार्षिक ऑफर (₹१२,००० + GST)</option>
                      <option value="Preetam Elite Lifetime Membership" className="bg-[#0f172a] text-white font-bold">प्रीतम एलिट १० वर्षे फॅमिली मेंबरशिप</option>
                    </select>
                  </div>

                  <button type="submit" className="sp-submit-btn cursor-pointer">
                    ऑनलाईन फॉर्म सबमिट करा →
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="size-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  अभिनंदन! नोंदणी सबमिट झाली.
                </h3>
                <p className="text-sm font-bold text-slate-300 mb-6">
                  धन्यवाद <strong>{formData.name}</strong>! तुमची मेंबरशिप चौकशी सबमिट झाली आहे. आमची टीम लवकरच फोन करेल.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/91${sportsClubPhones[0]}?text=नमस्कार,%20मी%20मेंबरशिप%20फॉर्म%20भरला%20आहे.%20माझे%20नाव:%20${encodeURIComponent(formData.name)}%20पॅकेज:%20${encodeURIComponent(formData.package)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-emerald-600 text-white font-black text-xs shadow-lg flex items-center justify-center gap-2"
                  >
                    💬 WhatsApp वर संपर्क करा
                  </a>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-full bg-white/10 text-white font-black text-xs border border-white/20"
                  >
                    बंद करा
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default SportsPricingSection;
