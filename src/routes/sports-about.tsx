import React, { useEffect } from "react";
import SportsAboutSection from "@/components/SportsAboutSection";
import AboutSangli from "@/components/AboutSangli";
import SmoothScroll from "@/components/SmoothScroll";

function SportsAboutPage() {
  useEffect(() => {
    localStorage.setItem("preetam_active_section", "sports");
    window.dispatchEvent(new CustomEvent("section-changed", { detail: "sports" }));
  }, []);

  return (
    <div className="bg-[#faf8f5] min-h-screen pt-6 sm:pt-8">
      <SmoothScroll />
      <SportsAboutSection />
      <AboutSangli />
    </div>
  );
}

export default SportsAboutPage;



