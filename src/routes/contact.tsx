import React, { useState, useRef, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  User,
  MapPin,
  Building,
  Send,
  Map,
  CheckSquare,
  Edit3,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import { site, sportsClub } from "@/lib/site-info";
import { useLanguage } from "@/lib/use-language";

function Contact() {
  const { addInquiry } = useAdminStore();
  const { isEn } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const optionsList = [
    {
      value: isEn ? "Anandshala Admission Inquiry" : "आनंदशाळा प्रवेश चौकशी",
      label: isEn ? (
        <>
          <span className="text-[#db2777] font-black">Anandshala</span>
          <span className="text-slate-800 font-bold"> Admission Inquiry</span>
        </>
      ) : (
        <>
          <span className="text-[#db2777] font-black">आनंदशाळा</span>
          <span className="text-slate-800 font-bold"> प्रवेश चौकशी</span>
        </>
      ),
    },
    {
      value: isEn ? "1 Day Tour Pass" : "१ दिवस सहल पास",
      label: (
        <span className="text-slate-800 font-bold">
          {isEn ? "1 Day Tour Pass" : "१ दिवस सहल पास"}
        </span>
      ),
    },
    {
      value: isEn ? "Day-Care Monthly Pass" : "डे-केअर मासिक पास",
      label: (
        <span className="text-slate-800 font-bold">
          {isEn ? "Day-Care Monthly Pass" : "डे-केअर मासिक पास"}
        </span>
      ),
    },
    {
      value: isEn ? "Anandshala Stay Pass" : "आनंदशाळा निवास पास",
      label: isEn ? (
        <>
          <span className="text-[#db2777] font-black">Anandshala</span>
          <span className="text-slate-800 font-bold"> Stay Pass</span>
        </>
      ) : (
        <>
          <span className="text-[#db2777] font-black">आनंदशाळा</span>
          <span className="text-slate-800 font-bold"> निवास पास</span>
        </>
      ),
    },
    {
      value: isEn ? "Sports Club Membership" : "स्पोर्ट्स क्लब मेंबरशिप",
      label: (
        <span className="text-slate-800 font-bold">
          {isEn ? "Sports Club Membership" : "स्पोर्ट्स क्लब मेंबरशिप"}
        </span>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inquiryCategory =
      subject.includes("स्पोर्ट्स") || subject.includes("Sports") ? "sports" : "anandshala";
    addInquiry({
      name,
      phone,
      email,
      subject: subject || "आनंदशाळा प्रवेश चौकशी",
      message,
      category: inquiryCategory,
    });
    setSubmitted(true);
    setName("");
    setPhone("");
    setEmail("");
    setSubject("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f8fafc] via-[#fff5f9] to-[#f0f4ff] font-sans pb-20">
      {/* ══════════════════════════════════════════════════════════════
          TOP HEADER HERO SECTION
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative pt-6 pb-8 sm:pt-10 sm:pb-12 flex flex-col items-center text-center px-4 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-r from-pink-200/40 via-purple-200/30 to-blue-200/40 blur-3xl pointer-events-none -z-10" />

        {/* Decorative Grid Patterns */}
        <div className="absolute top-4 left-10 opacity-20 hidden sm:block">
          <div className="grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#db2777]" />
            ))}
          </div>
        </div>
        <div className="absolute top-4 right-10 opacity-20 hidden sm:block">
          <div className="grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#1A05A2]" />
            ))}
          </div>
        </div>

        {/* Header Badge */}
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 backdrop-blur-md px-5 py-2 text-xs font-black tracking-widest text-[#db2777] shadow-sm uppercase mb-5">
          <Phone size={15} className="text-[#db2777] animate-pulse" />
          <span>{isEn ? "GET IN TOUCH • CONTACT US" : "संपर्क साधा • आजच भेट द्या"}</span>
        </span>

        {/* Header Title */}
        <h1 className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A05A2] tracking-tight mb-4 drop-shadow-xs">
          {isEn ? (
            <>
              Contact Preetam <span className="text-[#db2777]">Anandshala</span>
            </>
          ) : (
            <>
              प्रीतम <span className="text-[#db2777]">आनंदशाळा</span> संपर्क
            </>
          )}
        </h1>

        <div className="flex items-center justify-center gap-2 my-2">
          <span className="block w-12 h-1 bg-linear-to-r from-transparent to-[#db2777] rounded-full"></span>
          <span className="block w-3 h-3 rounded-full bg-[#db2777]"></span>
          <span className="block w-12 h-1 bg-linear-to-l from-transparent to-[#db2777] rounded-full"></span>
        </div>

        <p className="relative z-10 mt-3 max-w-2xl text-base sm:text-lg font-bold text-slate-600 leading-relaxed">
          {isEn
            ? "Contact us today for more information."
            : "अधिक माहितीसाठी आजच आमच्याशी संपर्क साधा."}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* ══════════════════════════════════════════════════════════════
            4 QUICK CONTACT CARDS (2x2 COMPACT FIT GRID)
           ══════════════════════════════════════════════════════════════ */}
        <div className="max-w-155 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {/* Card 1: Helpline */}
          <a
            href="tel:+919370237633"
            className="flex items-center gap-3 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border-2 border-rose-100 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all group cursor-pointer"
          >
            <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Phone size={20} />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-slate-500 mb-0.5 truncate">
                {isEn ? (
                  <>
                    <span className="text-pink-600">Anandshala</span> Helpline
                  </>
                ) : (
                  <>
                    <span className="text-pink-600">आनंदशाळा</span> हेल्पलाईन
                  </>
                )}
              </p>
              <p className="text-xs sm:text-sm font-black text-[#be185d] tracking-wide whitespace-nowrap group-hover:text-pink-600 transition-colors">
                +91-9370237633
              </p>
            </div>
          </a>

          {/* Card 2: Office */}
          <a
            href="tel:+919423258859"
            className="flex items-center gap-3 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border-2 border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all group cursor-pointer"
          >
            <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Building size={20} />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-slate-500 mb-0.5 truncate">
                {isEn ? "Office Contact" : "कार्यालय संपर्क"}
              </p>
              <p className="text-xs sm:text-sm font-black text-[#1A05A2] tracking-wide whitespace-nowrap group-hover:text-purple-600 transition-colors">
                +91-9423258859
              </p>
            </div>
          </a>

          {/* Card 3: WhatsApp */}
          <a
            href={sportsClub.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border-2 border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group cursor-pointer"
          >
            <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <MessageCircle size={20} />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-slate-500 mb-0.5 truncate">
                {isEn ? "WhatsApp Chat" : "चॅट WhatsApp"}
              </p>
              <p className="text-xs sm:text-sm font-black text-emerald-700 tracking-wide whitespace-nowrap group-hover:text-teal-600 transition-colors">
                +91-9370237633
              </p>
            </div>
          </a>

          {/* Card 4: Email */}
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 border-2 border-orange-100 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all group cursor-pointer"
          >
            <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Mail size={20} />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-[11px] sm:text-xs font-black text-slate-500 mb-0.5 truncate">
                {isEn ? "Email Address" : "ई-मेल पत्ता"}
              </p>
              <p
                className="text-[11px] sm:text-xs font-black text-orange-600 tracking-tight truncate group-hover:text-amber-700 transition-colors"
                title={site.email}
              >
                {site.email}
              </p>
            </div>
          </a>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            VISIT US & ADDRESS CARD (ULTRA-ATTRACTIVE PREMIUM DESIGN)
           ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-2 border-pink-200/80 overflow-hidden relative p-6 sm:p-7 space-y-5 transition-all hover:shadow-2xl hover:shadow-pink-100/50">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#db2777] via-[#a855f7] to-[#1A05A2]" />

          {/* Title & Address Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center border-b border-pink-100 pb-5">
            <div className="lg:col-span-5 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#db2777] to-[#9333ea] flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-200">
                <MapPin size={28} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1A05A2]">
                  {isEn ? "Visit Us & Address" : "भेट द्या व पत्ता"}
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  {isEn ? (
                    <>
                      Preetam Senior Citizen{" "}
                      <span className="text-[#db2777] font-black">Anandshala</span>, Sangli
                    </>
                  ) : (
                    <>
                      प्रीतम ज्येष्ठ नागरिक{" "}
                      <span className="text-[#db2777] font-black">आनंदशाळा</span>, सांगली
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-linear-to-br from-pink-50/80 via-purple-50/40 to-blue-50/80 rounded-2xl p-4 border border-pink-100/80 shadow-sm">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs font-black text-[#1A05A2] mb-0.5">
                    {isEn ? "Official Postal Address" : "अधिकृत पत्ता"}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
                    {isEn ? site.addressEn : site.addressMr}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Horizontal Sub-Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Anandshala Center */}
            <div className="bg-linear-to-br from-rose-50/90 to-pink-100/60 rounded-2xl p-4 border-2 border-rose-200/80 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-pink-200 shrink-0">
                <Building size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-[#810B38]">
                  <span className="text-[#db2777] font-black">
                    {isEn ? "Anandshala" : "आनंदशाळेचे"}
                  </span>
                  {isEn ? " Campus" : " केंद्र"}
                </p>
                <span className="inline-block bg-white/90 border border-pink-200 text-[#db2777] text-[11px] font-black px-2.5 py-0.5 rounded-full mt-1 shadow-2xs">
                  {isEn ? "Building 1 to Survey 5" : "इमारती नं. १ ते सर्वे. ५"}
                </span>
              </div>
            </div>

            {/* Office Center */}
            <div className="bg-linear-to-br from-indigo-50/90 to-blue-100/60 rounded-2xl p-4 border-2 border-blue-200/80 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-[#1A05A2] to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-200 shrink-0">
                <Building size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-[#1A05A2]">
                  {isEn ? "Office Center" : "कार्यालय केंद्र"}
                </p>
                <span className="inline-block bg-white/90 border border-blue-200 text-[#1A05A2] text-[11px] font-black px-2.5 py-0.5 rounded-full mt-1 shadow-2xs">
                  {isEn ? "Building 6 to Survey 9" : "इमारती नं. ६ ते सर्वे. ९"}
                </span>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-linear-to-br from-amber-50/90 to-orange-100/60 rounded-2xl p-4 border-2 border-amber-200/80 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-amber-200 shrink-0">
                <Clock size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-amber-900">
                  <span className="text-[#db2777] font-black">
                    {isEn ? "Anandshala" : "आनंदशाळा"}
                  </span>{" "}
                  {isEn ? "& Office Timings" : "व कार्यालय वेळ"}
                </p>
                <span className="inline-block bg-white/90 border border-amber-200 text-amber-800 text-[11px] font-black px-2.5 py-0.5 rounded-full mt-1 shadow-2xs">
                  {isEn ? "11 AM - 5 PM (Daily)" : "सकाळी ११:०० ते सायं. ५:००"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            INQUIRY FORM CARD
           ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-rose-100 overflow-hidden relative p-6 sm:p-8 space-y-6">
          <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#db2777] via-[#a855f7] to-[#1A05A2]" />

          <div className="flex items-center gap-4 border-b border-rose-100 pb-5">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-[#db2777] shrink-0 shadow-sm">
              <CheckSquare size={28} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1A05A2]">
                {isEn ? "Inquire About Admission & Booking" : "प्रवेश व नोंदणीची चौकशी करा"}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
                {isEn
                  ? "Fill in the details below — our team will get in touch with you."
                  : "खालील माहिती भरा — आमची टीम लवकरच आपल्याशी संपर्क साधेल."}
              </p>
            </div>
          </div>

          {submitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 font-black text-xs sm:text-sm border-2 border-emerald-200 flex items-center gap-3 animate-fade-up">
              <Sparkles size={20} className="text-emerald-600 shrink-0" />
              <span>
                {isEn
                  ? "✅ Your inquiry has been submitted successfully! We will contact you soon."
                  : "✅ तुमची चौकशी यशस्वीरित्या पाठवली गेली आहे! आम्ही लवकरच संपर्क करू."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Full Name & Mobile Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  👤 {isEn ? "Full Name" : "आपले पूर्ण नाव"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isEn ? "e.g. Ramesh Kamble" : "उदा. रमेश कांबळे"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-800 outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  📞 {isEn ? "Mobile Number" : "मोबाईल नंबर"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone size={18} />
                  </div>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isEn ? "10-digit Mobile No." : "१० अंकी मोबाईल नंबर"}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-800 outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Inquiry Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  ✉️ {isEn ? "Email (Optional)" : "ई-मेल पत्ता (पर्यायी)"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-800 outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">
                  🎯 {isEn ? "Inquiry Subject" : "चौकशीचा विषय"}
                </label>
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full text-left rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-10 text-xs font-bold outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 flex items-center justify-between cursor-pointer"
                  >
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <CheckSquare size={18} />
                    </div>

                    <span className="truncate">
                      {!subject ? (
                        <span className="text-slate-400 font-normal">
                          {isEn ? "-- Select Subject --" : "-- विषय निवडा --"}
                        </span>
                      ) : subject.includes("आनंदशाळा") || subject.includes("Anandshala") ? (
                        <>
                          <span className="text-[#db2777] font-black">
                            {isEn ? "Anandshala" : "आनंदशाळा"}
                          </span>
                          <span className="text-slate-800 font-bold">
                            {isEn ? " Admission Inquiry" : " प्रवेश चौकशी"}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-800 font-bold">{subject}</span>
                      )}
                    </span>

                    <div
                      className={`absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 transition-transform ${dropdownOpen ? "rotate-180 text-[#db2777]" : ""}`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border-2 border-pink-100 shadow-2xl z-50 overflow-hidden py-1 animate-fade-in">
                      {optionsList.map((opt, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSubject(opt.value);
                            setDropdownOpen(false);
                          }}
                          className={`px-4 py-2.5 text-xs cursor-pointer transition-colors hover:bg-pink-50/70 flex items-center justify-between ${subject === opt.value ? "bg-pink-50/90 font-black" : ""}`}
                        >
                          <div>{opt.label}</div>
                          {subject === opt.value && (
                            <Sparkles size={14} className="text-[#db2777]" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                📝 {isEn ? "Message / Question" : "आपला संदेश किंवा प्रश्न"}
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Edit3 size={18} />
                </div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isEn
                      ? "Write your message or query here..."
                      : "आपला संदेश किंवा प्रश्न येथे लिहा..."
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-800 outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-black text-xs sm:text-sm text-white shadow-xl hover:scale-[1.02] transition-transform cursor-pointer bg-linear-to-r from-[#db2777] to-[#1A05A2]"
            >
              <Send size={18} />
              <span>{isEn ? "Submit Inquiry Form" : "चौकशी अर्ज पाठवा"}</span>
            </button>
          </form>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SEPARATE STANDALONE GOOGLE MAP CARD (AT VERY BOTTOM ABOVE NAVBAR)
           ══════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden relative p-5 sm:p-6 space-y-4 mb-8">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#0ea5e9] via-[#0284c7] to-[#1A05A2]" />

          <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0284c7]">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#1A05A2]">
                  📍 {isEn ? "Google Maps Location" : "गूगल मॅप लोकेशन"}
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  {isEn ? (
                    <>
                      Preetam Senior Citizen{" "}
                      <span className="text-[#db2777] font-black">Anandshala</span> Campus
                    </>
                  ) : (
                    <>
                      प्रीतम ज्येष्ठ नागरिक{" "}
                      <span className="text-[#db2777] font-black">आनंदशाळा</span> परिसर
                    </>
                  )}
                </p>
              </div>
            </div>

            <a
              href={sportsClub.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3.5 py-2 font-black text-xs text-white shadow-md hover:scale-105 transition-transform bg-linear-to-r from-[#0ea5e9] to-[#0284c7]"
            >
              <Map size={15} />
              <span>{isEn ? "Open in Google Maps App" : "Google Maps App मध्ये उघडा"}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-8 h-48 sm:h-52 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md">
              <iframe
                title="Preetam Anandshala Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.8!2d74.58!3d16.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUxJzM2LjAiTiA3NMKwMzQnNDguMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center space-y-1">
                <p className="text-xs font-black text-[#1A05A2]">
                  📍 {isEn ? "Direct Navigation" : "थेट नेव्हिगेशन"}
                </p>
                <p className="text-xs font-bold text-slate-600 leading-relaxed">
                  {isEn ? (
                    <>
                      <span className="text-[#db2777] font-black">Anandshala</span> campus
                      navigation
                    </>
                  ) : (
                    <>
                      <span className="text-[#db2777] font-black">आनंदशाळा</span> संकुलात येण्यासाठी
                      थेट गूगल मॅप्स नेव्हिगेशन वापरा.
                    </>
                  )}
                </p>
              </div>
              <a
                href={sportsClub.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-black text-xs sm:text-sm text-white shadow-lg hover:scale-[1.01] transition-transform cursor-pointer bg-linear-to-r from-[#0ea5e9] to-[#0284c7]"
              >
                <Map size={16} />
                <span>
                  {isEn ? "Get Directions on Google Maps" : "Google Maps वर मॅप लोकेशन पहा"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
