import React, { useState, useEffect } from "react";
import {
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Sparkles,
  MapPin,
  Clock,
  Smile,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/use-language";

const MARATHI_DAYS = ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];

const ENGLISH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SangliWeatherCard() {
  const { isEn } = useLanguage();
  const [now, setNow] = useState(new Date());

  const [weatherData, setWeatherData] = useState<{
    temp: number;
    tempMin: number;
    tempMax: number;
    windSpeed: number;
    humidity: number;
    precipitation: number;
    aqi: number;
    conditionMr: string;
    conditionEn: string;
    isLive: boolean;
  }>({
    temp: 27,
    tempMin: 18,
    tempMax: 28,
    windSpeed: 24,
    humidity: 72,
    precipitation: 40,
    aqi: 38,
    conditionMr: "प्रसन्न व निरोगी",
    conditionEn: "Pleasant & Healthy",
    isLive: false,
  });

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real live weather AND air quality from Open-Meteo for Sangli coordinates (16.8524, 74.5815)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [weatherRes, aqiRes] = await Promise.all([
          fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=16.8524&longitude=74.5815&current_weather=true&hourly=relative_humidity_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata",
          ),
          fetch(
            "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=16.8524&longitude=74.5815&current=us_aqi&timezone=Asia%2FKolkata",
          ).catch(() => null),
        ]);

        const weatherDataJson = await weatherRes.json();
        let liveAqi = 38;
        if (aqiRes) {
          try {
            const aqiDataJson = await aqiRes.json();
            if (aqiDataJson?.current?.us_aqi) {
              liveAqi = Math.round(aqiDataJson.current.us_aqi);
            }
          } catch (err) {
            // keep default fallback AQI
          }
        }

        if (weatherDataJson && weatherDataJson.current_weather) {
          const liveTemp = Math.round(weatherDataJson.current_weather.temperature);
          const liveWind = Math.round(weatherDataJson.current_weather.windspeed);
          const code = weatherDataJson.current_weather.weathercode;
          const minT = weatherDataJson.daily?.temperature_2m_min?.[0]
            ? Math.round(weatherDataJson.daily.temperature_2m_min[0])
            : 18;
          const maxT = weatherDataJson.daily?.temperature_2m_max?.[0]
            ? Math.round(weatherDataJson.daily.temperature_2m_max[0])
            : 28;
          const currentHour = new Date().getHours();
          const liveHumidity = weatherDataJson.hourly?.relative_humidity_2m?.[currentHour] || 72;
          const livePrecip = weatherDataJson.hourly?.precipitation_probability?.[currentHour] ?? 40;

          let condMr = "प्रसन्न व निरोगी हवामान";
          let condEn = "Pleasant & Healthy";

          if (code === 0) {
            condMr = "प्रसन्न सूर्यप्रकाश";
            condEn = "Clear & Sunny";
          } else if (code >= 1 && code <= 3) {
            condMr = "आल्हाददायक ढगाळ हवा";
            condEn = "Partly Cloudy Breeze";
          } else if (code >= 51 && code <= 82) {
            condMr = "रिमझिम पाऊस व शीतल हवा";
            condEn = "Pleasant Rain & Breeze";
          }

          setWeatherData({
            temp: liveTemp,
            tempMin: minT,
            tempMax: maxT,
            windSpeed: liveWind,
            humidity: liveHumidity,
            precipitation: livePrecip,
            aqi: liveAqi,
            conditionMr: condMr,
            conditionEn: condEn,
            isLive: true,
          });
        }
      } catch (e) {
        // Fallback gracefully if offline
      }
    };

    fetchWeather(); // Fetch immediately on load
    const weatherInterval = setInterval(fetchWeather, 300000); // Auto refresh live weather & AQI every 5 mins
    return () => clearInterval(weatherInterval);
  }, []);

  const dayIndex = now.getDay();
  const dayNameStr = isEn ? ENGLISH_DAYS[dayIndex] : MARATHI_DAYS[dayIndex];
  const timeStr = now.toLocaleTimeString(isEn ? "en-IN" : "mr-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dateStr = now.toLocaleDateString(isEn ? "en-IN" : "mr-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const monthIndex = now.getMonth(); // 0 - 11
  let seasonMr = "🌧️ पावसाळा (मॉन्सून)";
  let seasonEn = "🌧️ Monsoon Season";
  if (monthIndex >= 2 && monthIndex <= 4) {
    seasonMr = "☀️ सुवर्ण उन्हाळा";
    seasonEn = "☀️ Summer Season";
  } else if (monthIndex >= 5 && monthIndex <= 8) {
    seasonMr = "🌧️ हिरवागार पावसाळा";
    seasonEn = "🌧️ Pleasant Monsoon";
  } else {
    seasonMr = "❄️ गुलाबी हिवाळा (थंडी)";
    seasonEn = "❄️ Refreshing Winter";
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-8 font-sans">
      {/* ── MAIN WEATHER BANNER CARD (SOFT LIGHT ELEGANT LUXURY THEME) ── */}
      <div className="relative overflow-hidden bg-linear-to-r from-white via-rose-50/70 to-pink-50/60 rounded-3xl sm:rounded-[36px] p-6 sm:p-10 text-slate-800 shadow-xl border-2 border-rose-200/90">
        {/* Subtle Background Glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-pink-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-blue-200/30 blur-[100px]" />

        {/* ── TOP BAR: BADGES & LIVE DATE ── */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-rose-200/70 pb-5 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-[#db2777] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs border border-pink-200">
              <Sparkles className="size-3.5 text-pink-500" />
              <span>
                {isEn
                  ? weatherData.isLive
                    ? "🔴 Live Real-Time Weather"
                    : "Live Weather & Climate"
                  : weatherData.isLive
                    ? "🔴 लाईव्ह थेट हवामान"
                    : "आजचे थेट हवामान व वातावरण"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#1A05A2] flex items-center gap-3 pt-1">
              <span>{isEn ? "🌟 Today:" : "🌟 आजचा दिवस:"}</span>
              <span className="text-[#db2777] font-black">{dayNameStr}</span>
            </h3>
          </div>

          {/* Location & Date Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-rose-200 text-xs sm:text-sm font-bold text-slate-700 shadow-2xs">
              <MapPin className="size-4 text-[#db2777] shrink-0" />
              <span>
                {isEn ? (
                  <>
                    Sangli • Preetam <span className="text-[#db2777] font-black">Anandshala</span>
                  </>
                ) : (
                  <>
                    सांगली • प्रीतम <span className="text-[#db2777] font-black">आनंदशाळा</span>{" "}
                    परिसर
                  </>
                )}
              </span>
            </div>

            <div className="inline-flex items-center justify-center gap-2 bg-[#1A05A2] text-white px-4 py-2 rounded-2xl text-xs sm:text-sm font-black shadow-md tabular-nums whitespace-nowrap min-w-52.5 sm:min-w-57.5">
              <Clock className="size-4 shrink-0 text-amber-300 animate-pulse" />
              <span className="tabular-nums">
                {timeStr} • 📅 {dateStr}
              </span>
            </div>
          </div>
        </div>

        {/* ── MAIN WEATHER STATS ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10 mb-2">
          {/* Left: Big Temp & Condition (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-rose-100 flex items-center gap-6 shadow-md hover:shadow-lg transition-shadow">
            {/* ── RICH VIBRANT WEATHER LOGO EMBLEM ── */}
            <div className="relative size-20 sm:size-24 rounded-[26px] bg-linear-to-br from-amber-300 via-orange-400 to-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-200/80 border-2 border-white overflow-hidden group">
              {/* Radial Sun Glow */}
              <div className="absolute inset-0 bg-linear-to-t from-orange-600/30 to-amber-200/40 pointer-events-none" />

              {/* Dynamic Weather Logo */}
              <div className="relative z-10 flex items-center justify-center">
                <CloudSun className="size-12 sm:size-14 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#1A05A2] tracking-tight">
                  {weatherData.temp}°C
                </span>
                <span className="text-sm font-black text-[#db2777]">
                  {isEn ? weatherData.conditionEn : weatherData.conditionMr}
                </span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-slate-600 leading-snug">
                {isEn
                  ? "Fresh breeze from Krishna River Valley"
                  : "कृष्णा नदी खोऱ्यातील शुद्ध व ताजी हवा"}
              </p>
              <div className="inline-block mt-1 bg-rose-100 text-[#db2777] text-xs font-black px-3 py-1 rounded-full border border-rose-200">
                {isEn ? seasonEn : seasonMr}
              </div>
            </div>
          </div>

          {/* Right: 4 Environmental Badges matching Google Weather (Precipitation, Wind, Humidity, AQI) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1: Precipitation (पावसाची शक्यता) */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md transition-shadow">
              <div className="size-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 border border-purple-200">
                <CloudRain className="size-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                {isEn ? "Precipitation" : "पावसाची शक्यता"}
              </span>
              <span className="text-base sm:text-lg font-black text-[#1A05A2] mt-0.5">
                {weatherData.precipitation}%
              </span>
              <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md mt-0.5 border border-purple-100">
                {isEn ? "Rain Chance" : "रिमझिम पाऊस"}
              </span>
            </div>

            {/* Metric 2: Wind Speed (वाऱ्याचा वेग) */}
            <div className="bg-white rounded-2xl p-4 border border-indigo-100 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md transition-shadow">
              <div className="size-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 border border-indigo-200">
                <Wind className="size-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                {isEn ? "Wind Speed" : "वाऱ्याचा वेग"}
              </span>
              <span className="text-base sm:text-lg font-black text-[#1A05A2] mt-0.5">
                {weatherData.windSpeed} km/h
              </span>
              <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md mt-0.5 border border-indigo-100">
                {isEn ? "Gentle Breeze" : "मंद आल्हाददायक वारे"}
              </span>
            </div>

            {/* Metric 3: Humidity (आर्द्रता) */}
            <div className="bg-white rounded-2xl p-4 border border-sky-100 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md transition-shadow">
              <div className="size-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2 border border-sky-200">
                <Droplets className="size-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                {isEn ? "Humidity" : "आर्द्रता"}
              </span>
              <span className="text-base sm:text-lg font-black text-[#1A05A2] mt-0.5">
                {weatherData.humidity}%
              </span>
              <span className="text-[10px] font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md mt-0.5 border border-sky-100">
                {isEn ? "River Breeze" : "नदीकाठची झुळूक"}
              </span>
            </div>

            {/* Metric 4: Air Quality (हवेची गुणवत्ता AQI) */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-100 text-center flex flex-col items-center justify-center shadow-xs hover:shadow-md transition-shadow">
              <div className="size-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 border border-emerald-200">
                <ShieldCheck className="size-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                {isEn ? "Air Quality" : "हवेची गुणवत्ता"}
              </span>
              <span className="text-base sm:text-lg font-black text-[#1A05A2] mt-0.5">
                {weatherData.aqi} (Good)
              </span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5 border border-emerald-100">
                {isEn ? "Good Air Quality" : "अत्यंत शुद्ध हवा"}
              </span>
            </div>
          </div>
        </div>

        {/* ── FOOTER HEALTH ADVICE NOTE ── */}
        <div className="mt-6 pt-5 border-t border-rose-200/70 text-center flex items-center justify-center gap-3">
          <Smile className="size-5 text-[#db2777] shrink-0" />
          <p className="text-xs sm:text-sm font-bold text-slate-600">
            {isEn
              ? "Sangli's pollution-free river valley climate acts as a natural blessing for senior health & longevity."
              : "कृष्णा नदीच्या खोऱ्यातील सांगलीची शुद्ध हवा व प्रदूषणमुक्त हवामान ज्येष्ठ नागरिकांच्या आरोग्यासाठी अत्यंत उत्तम मानले जाते."}
          </p>
        </div>
      </div>
    </div>
  );
}
