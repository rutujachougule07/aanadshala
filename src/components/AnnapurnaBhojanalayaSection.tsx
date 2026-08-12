import React, { useState } from "react";
import { 
  Utensils, 
  Coffee, 
  Sun, 
  Moon, 
  Clock, 
  Heart, 
  Sparkles, 
  Printer, 
  Calendar, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Download,
  Share2
} from "lucide-react";
import { initialBhojanalayaConfig, FoodScheduleRow, FoodRateItem, ExtraFoodItem } from "@/lib/admin-store";

const DAYS_MAP: Record<number, string> = {
  0: "रविवार",
  1: "सोमवार",
  2: "मंगळवार",
  3: "बुधवार",
  4: "गुरुवार",
  5: "शुक्रवार",
  6: "शनिवार",
};

export default function AnnapurnaBhojanalayaSection() {
  const config = initialBhojanalayaConfig;
  const [selectedDay, setSelectedDay] = useState<string>("ALL");
  const [showOriginalPoster, setShowOriginalPoster] = useState<boolean>(false);

  // Get current day of week in Marathi
  const todayDate = new Date();
  const currentDayIndex = todayDate.getDay();
  const todayMarathi = DAYS_MAP[currentDayIndex] || "सोमवार";

  const todayItem = config.weeklySchedule.find((item: FoodScheduleRow) => item.day === todayMarathi) || config.weeklySchedule[0];

  const filteredSchedule = selectedDay === "ALL" 
    ? config.weeklySchedule 
    : config.weeklySchedule.filter((item: FoodScheduleRow) => item.day === selectedDay);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `=====================================================
  प्रीतम ज्येष्ठ नागरिक आनंदशाळा • अन्नपूर्णा भोजनालय
            अन्नपूर्णा भोजनालय वेळापत्रक व दरपत्रक
=====================================================

अन्नपूर्णा भोजनालयाची वेळ:
• सकाळी चहा व नाष्टा: सकाळी ७:०० ते ९:००
• दुपारचे जेवण: दुपारी १:०० ते २:००
• सायंकाळी चहा व नाष्टा: सायंकाळी ५:०० ते ६:००

साप्ताहिक आहार वेळापत्रक:
-----------------------------------------------------
${config.weeklySchedule.map((row: FoodScheduleRow) => `
[${row.day}]
• सकाळी चहा: ${row.morningTea} (७ ते ९)
• सकाळी नाष्टा: ${row.morningBreakfast} (८ ते ९)
• दुपार जेवण: ${row.afternoonLunch} (१२:१५ ते १ व १:१५ ते २)
• सायंकाळी चहा नाष्टा: ${row.eveningSnack} (५ ते ६)
• रात्रीचे जेवण: ${row.nightDinner} (८ ते ९)
`).join('\n-----------------------------------------------------\n')}

-----------------------------------------------------
अधिक माहिती व नोंदणीसाठी संपर्क:
प्रीतम ज्येष्ठ नागरिक आनंदशाळा, सांगली.
📞 फोन: ९३७०२३७६३३
`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "अन्नपूर्णा_भोजनालय_वेळापत्रक.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#fffcfd] via-[#fff5f8] to-[#fdf2f5] py-8 sm:py-12 px-3 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── MAIN DECORATIVE HEADER CARD ── */}
        <div className="relative overflow-hidden bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 shadow-xl border-4 border-rose-200 text-center">
          {/* Top Decorative Border Pattern */}
          <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-rose-500 via-amber-400 via-pink-500 to-rose-600" />
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-50 border border-rose-200 text-[#810B38] font-black text-xs sm:text-sm mb-4 shadow-xs">
            <span className="text-amber-500 text-base">🌸</span>
            <span>प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777] font-black">आनंदशाळा</span> • अन्नपूर्णा भोजनालय</span>
            <span className="text-amber-500 text-base">🌸</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#810B38] tracking-tight leading-tight drop-shadow-sm max-w-4xl mx-auto">
            प्रीतम ज्येष्ठ नागरिक <span className="text-[#db2777] font-black">आनंदशाळा</span> अन्नपूर्णा भोजनालय वेळापत्रक व दरपत्रक
          </h2>

          <div className="mt-3 text-slate-700 font-extrabold text-sm sm:text-lg max-w-3xl mx-auto flex flex-col items-center justify-center gap-1">
            <p className="flex items-center justify-center gap-2">
              <span className="text-rose-500">🍲</span>
              <span>ताजा, सात्विक व पौष्टिक शाकाहारी आहार</span>
              <span className="text-rose-500">🍲</span>
            </p>
            <p className="text-slate-800 font-extrabold text-xs sm:text-base">
              आरोग्यदायी सहवास व स्वाद
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black shadow-xs">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>सकाळी चहा व नाष्टा ७ ते ९ • दुपारचे जेवण १ ते २ • सायंकाळी चहा व नाष्टा ५ ते ६</span>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#810B38] to-[#db2777] hover:opacity-95 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>वेळापत्रक डाउनलोड करा</span>
            </button>
          </div>
        </div>

        {/* ── TODAY'S FEATURED MENU CARD ── */}
        <div className="bg-gradient-to-r from-[#810B38] via-[#a2134c] to-[#900c3f] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none">
            <Utensils className="w-72 h-72" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/20 pb-5 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>आजचा विशेष आहार मेनू</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
                <span>🌟 आजचा दिवस:</span>
                <span className="text-amber-300 underline decoration-amber-400 decoration-wavy underline-offset-4">
                  {todayMarathi}
                </span>
              </h3>
            </div>

            <div className="text-xs sm:text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
              📅 {todayDate.toLocaleDateString("mr-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>

          {/* Today's Meals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            
            {/* Morning Breakfast */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 flex flex-col justify-between hover:bg-white/20 transition-colors">
              <div>
                <div className="flex items-center justify-between text-amber-200 text-xs font-black mb-1">
                  <span>🥣 सकाळी नाष्टा</span>
                  <span>७ ते ९</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                  {todayItem.morningBreakfast.replace("उतपा", "उत्तपा").replace("उपीट", "उत्तपा")}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-white/15 text-[11px] text-rose-100 font-semibold">
                ☕ गरमागरम चहा आणि नाष्टा
              </div>
            </div>

            {/* Lunch */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 flex flex-col justify-between hover:bg-white/20 transition-colors">
              <div>
                <div className="flex items-center justify-between text-amber-200 text-xs font-black mb-1">
                  <span>🍱 दुपारचे जेवण</span>
                  <span>१ ते २</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                  {todayItem.afternoonLunch}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-white/15 text-[11px] text-rose-100 font-semibold">
                👌 मनसोक्त आहार
              </div>
            </div>

            {/* Evening Tea */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 flex flex-col justify-between hover:bg-white/20 transition-colors">
              <div>
                <div className="flex items-center justify-between text-amber-200 text-xs font-black mb-1">
                  <span>☕ सायंकाळी चहा व नाष्टा</span>
                  <span>५ ते ६</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                  {todayItem.eveningTeaSnack === "चहा + बिस्कीट" ? "चहा व बिस्किट" : todayItem.eveningTeaSnack}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-white/15 text-[11px] text-rose-100 font-semibold">
                🫖 गरमागरम चहा व बिस्किट
              </div>
            </div>

            {/* Night Dinner */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 flex flex-col justify-between hover:bg-white/20 transition-colors">
              <div>
                <div className="flex items-center justify-between text-amber-200 text-xs font-black mb-1">
                  <span>🌙 रात्रीचे जेवण</span>
                  <span>८ ते ९</span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                  {todayItem.nightDinner}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-white/15 text-[11px] text-rose-100 font-semibold">
                ✨ पचनास हलका व सात्विक आहार
              </div>
            </div>

          </div>
        </div>

        {/* ── DAY FILTER BUTTONS ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white p-3 rounded-2xl shadow-sm border border-rose-100">
          <button
            onClick={() => setSelectedDay("ALL")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              selectedDay === "ALL"
                ? "bg-[#810B38] text-white shadow-md scale-105"
                : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-[#810B38]"
            }`}
          >
            🗓️ संपूर्ण ७ दिवसांचे वेळापत्रक
          </button>
          {config.weeklySchedule.map((item: FoodScheduleRow) => {
            const isToday = item.day === todayMarathi;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedDay === item.day
                    ? "bg-[#810B38] text-white shadow-md scale-105"
                    : isToday
                    ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                    : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-[#810B38]"
                }`}
              >
                <span>{item.day}</span>
                {isToday && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-md font-black">
                    आज
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── TABLE 1: WEEKLY FOOD MENU SCHEDULE ── */}
        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#810B38] via-rose-700 to-[#810B38] px-6 py-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-black flex items-center gap-2">
              <span>📅</span>
              <span>अन्नपूर्णा भोजनालय साप्ताहिक वेळापत्रक</span>
            </h3>
            <span className="text-xs bg-white/20 text-white font-extrabold px-3 py-1 rounded-full border border-white/30">
              सोमवार ते रविवार नियमित सेवा
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-center border-collapse">
              <thead>
                <tr className="bg-rose-50 text-[#810B38] font-black text-sm border-b-2 border-rose-200">
                  <th className="py-3.5 px-3 border-r border-rose-100 w-[7%]">अ.क्र.</th>
                  <th className="py-3.5 px-3 border-r border-rose-100 w-[11%]">वार</th>
                  <th className="py-3.5 px-3 border-r border-rose-100 w-[10%]">सकाळी चहा (७ ते ९)</th>
                  <th className="py-3.5 px-3 border-r border-rose-100 w-[20%]">सकाळी नाष्टा (७ ते ९)</th>
                  <th className="py-3.5 px-3 border-r border-rose-100 w-[26%]">दुपारचे जेवण (१ ते २)</th>
                  <th className="py-3.5 px-3 border-r border-rose-100 w-[13%]">सायंकाळी चहा व नाष्टा (५ ते ६)</th>
                  <th className="py-3.5 px-3 w-[13%]">रात्रीचे जेवण (८ ते ९)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {filteredSchedule.map((row: FoodScheduleRow) => {
                  const isToday = row.day === todayMarathi;
                  return (
                    <tr
                      key={row.srNo}
                      className={`transition-colors ${
                        isToday
                          ? "bg-amber-50/90 font-bold border-l-4 border-l-amber-500 hover:bg-amber-100/80"
                          : row.srNo % 2 === 0
                          ? "bg-slate-50/50 hover:bg-rose-50/40"
                          : "bg-white hover:bg-rose-50/40"
                      }`}
                    >
                      <td className="py-3.5 px-3 font-black text-slate-500 border-r border-slate-200">
                        {row.srNo}
                      </td>
                      <td className="py-3.5 px-3 border-r border-slate-200 font-black text-[#810B38]">
                        <div className="flex flex-col items-center">
                          <span>{row.day}</span>
                          {isToday && (
                            <span className="mt-1 bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black shadow-xs animate-pulse">
                              आजचा मेनू
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 border-r border-slate-200 text-slate-800 font-bold">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-900 text-xs font-black">
                          {row.morningTea}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 border-r border-slate-200 font-bold text-slate-900 text-left">
                        {row.morningBreakfast.replace("उतपा", "उत्तपा").replace("उपीट", "उत्तपा")}
                      </td>
                      <td className="py-3.5 px-4 border-r border-slate-200 font-extrabold text-[#810B38] text-left leading-relaxed">
                        {row.afternoonLunch}
                      </td>
                      <td className="py-3.5 px-3 border-r border-slate-200 font-bold text-slate-900 text-left">
                        {row.eveningTeaSnack}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-slate-900 text-left">
                        {row.nightDinner}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TABLES 2 & 3: RATE LIST & EXTRA ITEMS (2-COLUMN GRID) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: BASIC RATE CARD (पदार्थ दरपत्रक) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-rose-200 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-rose-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#810B38] text-white flex items-center justify-center text-xl font-black shadow-md">
                  💰
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#810B38]">पदार्थ दरपत्रक</h3>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#810B38] to-rose-700 text-white font-black">
                      <th className="py-2.5 px-4">पदार्थ (Item)</th>
                      <th className="py-2.5 px-3 text-center">१ वेळ</th>
                      <th className="py-2.5 px-3 text-center">१ महिना</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-bold text-slate-800">
                    {config.rateList.map((rate: FoodRateItem, idx: number) => {
                      const isCombo = rate.item.includes("कॉम्बो") || rate.item.includes("1 चहा");
                      return (
                        <tr
                          key={idx}
                          className={isCombo ? "bg-amber-50 font-black text-[#810B38]" : idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                        >
                          <td className="py-2.5 px-4">
                            <span className={isCombo ? "text-[#810B38] font-black" : ""}>
                              {rate.item}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-black text-rose-700">
                            {rate.oneTime}
                          </td>
                          <td className="py-2.5 px-3 text-center font-black text-emerald-700">
                            {rate.oneMonth !== "—" ? rate.oneMonth : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>


          </div>

          {/* RIGHT COLUMN: EXTRA ITEMS AVAILABLE (आवडी व गरजेचे ज्यादाचे पदार्थ) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-200 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-amber-100 pb-4 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl font-black shadow-md">
                  🍨
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">आवडीनुसार व गरजेनुसार ज्यादाचे पदार्थ उपलब्ध</h3>
                </div>
              </div>

              {/* Grid of extra items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {config.extraItems.map((extra: ExtraFoodItem, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-200/80 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                        {extra.name === "फ्रूट सलाद" ? "फ्रूट सॅलड" : extra.name}
                      </span>
                      {extra.daySpecial && (
                        <span className="bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded-md font-black shrink-0">
                          {extra.daySpecial}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-right">
                      <span className="inline-block bg-white text-[#810B38] font-black text-xs px-2.5 py-1 rounded-xl shadow-xs border border-rose-200">
                        {extra.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

        </div>

        {/* ── FOOTER HEALTH ADVICE NOTE CARD ── */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-[#810B38] rounded-3xl p-6 sm:p-8 text-white shadow-xl text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-amber-200 px-4 py-1.5 rounded-full text-xs font-black border border-white/30">
              ❤️ आरोग्यदायी आहाराचा संदेश ❤️
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black leading-relaxed tracking-wide drop-shadow-md">
              “{config.healthNote}”
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
}
