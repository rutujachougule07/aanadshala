import React, { useState } from "react";
import { Phone, MessageCircle, Mail, User, MapPin, Building, Send, Map, CheckSquare, Edit3, Clock, Sparkles } from "lucide-react";
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
  const [subject, setSubject] = useState("आनंदशाळा प्रवेश चौकशी");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inquiryCategory = subject.includes("स्पोर्ट्स") || subject.includes("Sports") ? "sports" : "anandshala";
    addInquiry({ name, phone, email, subject, message, category: inquiryCategory });
    setSubmitted(true);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-[#fff5f9] to-[#f0f4ff] font-sans pb-20">
      
      {/* ══════════════════════════════════════════════════════════════
          TOP HEADER HERO SECTION
         ══════════════════════════════════════════════════════════════ */}
      <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 flex flex-col items-center text-center px-4 overflow-hidden">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-pink-200/40 via-purple-200/30 to-blue-200/40 blur-3xl pointer-events-none -z-10" />

        {/* Decorative Grid Patterns */}
        <div className="absolute top-10 left-10 opacity-20 hidden sm:block">
          <div className="grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#db2777]" />)}
          </div>
        </div>
        <div className="absolute top-10 right-10 opacity-20 hidden sm:block">
          <div className="grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-[#1A05A2]" />)}
          </div>
        </div>

        {/* Header Badge */}
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/90 backdrop-blur-md px-5 py-2 text-xs font-black tracking-widest text-[#db2777] shadow-sm uppercase mb-5">
          <Phone size={15} className="text-[#db2777] animate-pulse" />
          <span>{isEn ? "GET IN TOUCH • CONTACT US" : "संपर्क साधा • आजच भेट द्या"}</span>
        </span>

        {/* Header Title */}
        <h1 className="relative z-10 text-4xl sm:text-6xl lg:text-7xl font-black text-[#1A05A2] tracking-tight mb-4 drop-shadow-xs">
          {isEn ? (
            <>Contact <span className="text-[#db2777]">Anandshala</span></>
          ) : (
            <>प्रीतम <span className="text-[#db2777]">आनंदशाळा</span> संपर्क</>
          )}
        </h1>

        <div className="flex items-center justify-center gap-2 my-2">
          <span className="block w-12 h-1 bg-gradient-to-r from-transparent to-[#db2777] rounded-full"></span>
          <span className="block w-3 h-3 rounded-full bg-[#db2777]"></span>
          <span className="block w-12 h-1 bg-gradient-to-l from-transparent to-[#db2777] rounded-full"></span>
        </div>

        <p className="relative z-10 mt-3 max-w-2xl text-base sm:text-lg font-bold text-slate-600 leading-relaxed">
          {isEn
            ? "Reach out to us for admission inquiries, day-picnic passes, accommodation details or campus visits."
            : "प्रवेश, १ दिवस सहल पास, राहण्याची सोय किंवा अधिक माहितीसाठी आजच आमच्याशी संपर्क साधा."}
        </p>

      </div>

      <div className="max-w-[1300px] mx-auto px-4 relative z-10 space-y-12">

        {/* ══════════════════════════════════════════════════════════════
            4 QUICK CONTACT CARDS
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Helpline */}
          <a
            href="tel:+919370237633"
            className="flex items-center gap-4 bg-white rounded-3xl p-5 border-2 border-rose-100 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all group cursor-pointer"
          >
            <div className="flex-shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Phone size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-500 mb-0.5">
                {isEn ? <><span className="text-pink-600">Anandshala</span> Helpline</> : <><span className="text-pink-600">आनंदशाळा</span> हेल्पलाईन</>}
              </p>
              <p className="text-base font-black text-[#be185d] tracking-wide group-hover:text-pink-600 transition-colors">+91-9370237633</p>
            </div>
          </a>

          {/* Card 2: Office */}
          <a
            href="tel:+919423258859"
            className="flex items-center gap-4 bg-white rounded-3xl p-5 border-2 border-purple-100 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all group cursor-pointer"
          >
            <div className="flex-shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Building size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-500 mb-0.5">{isEn ? "Office Contact" : "कार्यालय संपर्क"}</p>
              <p className="text-base font-black text-[#1A05A2] tracking-wide group-hover:text-purple-600 transition-colors">+91-9423258859</p>
            </div>
          </a>

          {/* Card 3: WhatsApp */}
          <a
            href={sportsClub.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white rounded-3xl p-5 border-2 border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group cursor-pointer"
          >
            <div className="flex-shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <MessageCircle size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-500 mb-0.5">{isEn ? "WhatsApp Chat" : "चॅट WhatsApp"}</p>
              <p className="text-base font-black text-emerald-700 tracking-wide group-hover:text-teal-600 transition-colors">+91-9370237633</p>
            </div>
          </a>

          {/* Card 4: Email */}
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 bg-white rounded-3xl p-5 border-2 border-orange-100 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all group cursor-pointer"
          >
            <div className="flex-shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Mail size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-500 mb-0.5">{isEn ? "Email Address" : "ई-मेल पत्ता"}</p>
              <p className="text-xs font-black text-orange-600 tracking-tight truncate group-hover:text-amber-700 transition-colors">{site.email}</p>
            </div>
          </a>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTENT: FORM (LEFT) & ADDRESS + MAP (RIGHT)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INQUIRY FORM */}
          <div className="lg:col-span-6 bg-white rounded-3xl shadow-xl border-2 border-rose-100 overflow-hidden relative p-6 sm:p-8 space-y-6">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#db2777] via-[#a855f7] to-[#1A05A2]" />
            
            <div className="flex items-center gap-4 border-b border-rose-100 pb-5">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-[#db2777] shrink-0 shadow-sm">
                <CheckSquare size={28} />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1A05A2]">
                  {isEn ? "Inquire About Admission & Booking" : "प्रवेश व नोंदणीची चौकशी करा"}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
                  {isEn ? "Fill in the details below — our team will get in touch with you." : "खालील माहिती भरा — आमची टीम लवकरच आपल्याशी संपर्क साधेल."}
                </p>
              </div>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 font-black text-xs sm:text-sm border-2 border-emerald-200 flex items-center gap-3 animate-fade-up">
                <Sparkles size={20} className="text-emerald-600 shrink-0" />
                <span>
                  {isEn ? "✅ Your inquiry has been submitted successfully! We will contact you soon." : "✅ तुमची चौकशी यशस्वीरित्या पाठवली गेली आहे! आम्ही लवकरच संपर्क करू."}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">👤 {isEn ? "Full Name" : "आपले पूर्ण नाव"}</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">📞 {isEn ? "Mobile Number" : "मोबाईल नंबर"}</label>
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

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1.5">✉️ {isEn ? "Email (Optional)" : "ई-मेल पत्ता (पर्यायी)"}</label>
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
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">🎯 {isEn ? "Inquiry Subject" : "चौकशीचा विषय"}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <CheckSquare size={18} />
                  </div>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-800 outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 appearance-none cursor-pointer"
                  >
                    <option value="आनंदशाळा प्रवेश चौकशी">{isEn ? "Anandshala Admission Inquiry" : "आनंदशाळा प्रवेश चौकशी"}</option>
                    <option value="१ दिवस सहल पास">{isEn ? "1 Day Tour Pass" : "१ दिवस सहल पास"}</option>
                    <option value="डे-केअर मन्थली">{isEn ? "Day-Care Monthly Pass" : "डे-केअर मासिक पास"}</option>
                    <option value="आनंदनिवास">{isEn ? "Anandniwas Stay Pass" : "आनंदनिवास निवास पास"}</option>
                    <option value="स्पोर्ट्स क्लब">{isEn ? "Sports Club Membership" : "स्पोर्ट्स क्लब मेंबरशिप"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">📝 {isEn ? "Message / Question" : "आपला संदेश किंवा प्रश्न"}</label>
                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Edit3 size={18} />
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isEn ? "Write your message or query here..." : "आपला संदेश किंवा प्रश्न येथे लिहा..."}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-800 outline-none transition-all focus:border-[#db2777] focus:bg-white focus:ring-2 focus:ring-pink-100 placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-black text-xs sm:text-sm text-white shadow-xl hover:scale-[1.02] transition-transform cursor-pointer bg-gradient-to-r from-[#db2777] to-[#1A05A2]"
              >
                <Send size={18} />
                <span>{isEn ? "Submit Inquiry Form" : "चौकशी अर्ज पाठवा"}</span>
              </button>

            </form>
          </div>

          {/* RIGHT COLUMN: ADDRESS, CENTER TIMINGS & GOOGLE MAP */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address & Timings Card */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-rose-100 overflow-hidden relative p-6 sm:p-8 space-y-5">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1A05A2] via-[#0284c7] to-[#0d9488]" />

              <div className="flex items-start gap-4 border-b border-rose-100 pb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1A05A2] shrink-0 shadow-sm">
                  <MapPin size={28} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1A05A2]">
                    {isEn ? "Visit Us & Address" : "भेट द्या व पत्ता"}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 leading-relaxed">
                    {site.addressMr}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-rose-50/60 rounded-2xl p-3.5 border border-rose-100 flex items-center gap-3">
                  <Building size={20} className="text-[#db2777] shrink-0" />
                  <div>
                    <p className="text-[11px] font-black text-[#810B38]">आनंदशाळेचे केंद्र</p>
                    <p className="text-xs font-bold text-slate-700">इमारती नं. १ ते सर्वे. ५</p>
                  </div>
                </div>

                <div className="bg-blue-50/60 rounded-2xl p-3.5 border border-blue-100 flex items-center gap-3">
                  <Building size={20} className="text-[#1A05A2] shrink-0" />
                  <div>
                    <p className="text-[11px] font-black text-[#1A05A2]">कार्यालय केंद्र</p>
                    <p className="text-xs font-bold text-slate-700">इमारती नं. ६ ते सर्वे. ९</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center gap-3">
                <Clock size={20} className="text-[#db2777] shrink-0" />
                <div>
                  <p className="text-[11px] font-black text-slate-500">आनंदशाळा व कार्यालय वेळ (Timings)</p>
                  <p className="text-xs font-black text-slate-800">सकाळी ११:०० ते सायं. ५:०० (दररोज उघडे)</p>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md relative group">
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

              <a
                href={sportsClub.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 font-black text-xs sm:text-sm text-white shadow-xl hover:scale-[1.02] transition-transform cursor-pointer bg-gradient-to-r from-[#0ea5e9] to-[#0284c7]"
              >
                <Map size={18} />
                <span>{isEn ? "Get Directions on Google Maps" : "Google Maps वर मॅप लोकेशन पहा"}</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;
