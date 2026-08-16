import { useState, useEffect } from "react";

export type Language = "mr" | "en";

let globalLang: Language = "mr";
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("anandshala_lang") as Language | null;
  if (saved === "mr" || saved === "en") {
    globalLang = saved;
  }
}

const listeners = new Set<() => void>();

export function setLanguage(lang: Language) {
  globalLang = lang;
  if (typeof window !== "undefined") {
    localStorage.setItem("anandshala_lang", lang);
  }
  listeners.forEach((listener) => listener());
}

const mrDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function toEnDigits(str: string | number): string {
  if (str === null || str === undefined) return "";
  let s = String(str);
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(mrDigits[i], 'g'), enDigits[i]);
  }
  return s;
}

export function toMrDigits(str: string | number): string {
  if (str === null || str === undefined) return "";
  let s = String(str);
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(enDigits[i], 'g'), mrDigits[i]);
  }
  return s;
}

export function formatNum(str: string | number, isEn: boolean): string {
  return isEn ? toEnDigits(str) : toMrDigits(str);
}

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(globalLang);

  useEffect(() => {
    const handleUpdate = () => setLangState(globalLang);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === "mr" ? "en" : "mr";
    setLanguage(nextLang);
  };

  const isEn = lang === "en";
  const isMr = lang === "mr";

  const t = (mr: string, en: string) => (isEn ? en : mr);

  const num = (val: string | number) => formatNum(val, isEn);

  return {
    lang,
    isMr,
    isEn,
    setLanguage,
    toggleLanguage,
    t,
    num,
    toEnDigits,
    toMrDigits,
    formatNum: num
  };
}
