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

  const t = (mr: string, en: string) => (lang === "en" ? en : mr);

  return {
    lang,
    isMr: lang === "mr",
    isEn: lang === "en",
    setLanguage,
    toggleLanguage,
    t,
  };
}
