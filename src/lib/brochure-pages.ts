import p01 from "@/assets/brochure/page-01.jpg.asset.json";
import p02 from "@/assets/brochure/page-02.jpg.asset.json";
import p03 from "@/assets/brochure/page-03.jpg.asset.json";
import p04 from "@/assets/brochure/page-04.jpg.asset.json";
import p05 from "@/assets/brochure/page-05.jpg.asset.json";
import p06 from "@/assets/brochure/page-06.jpg.asset.json";
import p07 from "@/assets/brochure/page-07.jpg.asset.json";
import p08 from "@/assets/brochure/page-08.jpg.asset.json";
import p09 from "@/assets/brochure/page-09.jpg.asset.json";
import p10 from "@/assets/brochure/page-10.jpg.asset.json";
import p11 from "@/assets/brochure/page-11.jpg.asset.json";
import p12 from "@/assets/brochure/page-12.jpg.asset.json";
import p13 from "@/assets/brochure/page-13.jpg.asset.json";
import p14 from "@/assets/brochure/page-14.jpg.asset.json";
import p15 from "@/assets/brochure/page-15.jpg.asset.json";
import p16 from "@/assets/brochure/page-16.jpg.asset.json";
import p17 from "@/assets/brochure/page-17.jpg.asset.json";
import p18Asset from "@/assets/brochure/page-18.jpg.asset.json";
import p19 from "@/assets/brochure/page-19.jpg.asset.json";
import p20 from "@/assets/brochure/page-20.jpg.asset.json";
import p21 from "@/assets/brochure/page-21.jpg.asset.json";
import p22 from "@/assets/brochure/page-22.jpg.asset.json";
import pdf from "@/assets/brochure/brochure.pdf.asset.json";

export const brochurePdfUrl = pdf.url;

export type BrochurePage = { url: string; caption: string };

const validLocalImages = [
  "/images/background img.png",
  "/images/aandshala_img.png",
  "/images/sports_img.png",
  "/images/Screenshot 2026-07-31 103107.png",
  "/images/Screenshot 2026-07-31 103131.png",
  "/images/Screenshot 2026-07-31 103152.png",
  "/images/Screenshot 2026-07-31 103213.png",
  "/images/Screenshot 2026-07-31 103238.png",
  "/images/Screenshot 2026-07-31 103517.png",
  "/images/Screenshot 2026-07-31 103545.png",
  "/images/Screenshot 2026-07-31 103659.png",
  "/images/Screenshot 2026-07-31 103712.png",
  "/images/Screenshot 2026-07-31 103842.png",
  "/images/aandshala sahal 1.jpeg",
  "/images/aandshala sahal 2.jpg",
  "/images/aandshala sahal 3.jpg",
  "/images/aandshala sahal 4.jpg",
  "/images/aandshala sahal 5.jpeg",
  "/images/aandshala sahal 6.jpeg",
  "/images/aandshala sahal 7.jpeg",
  "/images/aandshala sahal 8.jpeg",
  "/images/aandshala sahal 9.jpeg",
];

function sanitizeUrl(assetUrl: string | undefined, index: number): string {
  if (assetUrl && !assetUrl.startsWith("/__l5e/")) {
    return assetUrl;
  }
  return validLocalImages[index % validLocalImages.length];
}

export const brochurePages: BrochurePage[] = [
  { url: sanitizeUrl(p01.url, 0), caption: "मुखपृष्ठ — आनंदशाळेचे विहंगम दृश्य" },
  { url: sanitizeUrl(p02.url, 1), caption: "आनंदशाळेत प्रवेश का घ्यायचा?" },
  { url: sanitizeUrl(p03.url, 2), caption: "होय, मी प्रीतम ज्येष्ठ नागरिक आनंदशाळा बोलतेय...!" },
  { url: sanitizeUrl(p04.url, 3), caption: "एक दिवस सहल भेट पास — रु. ६००/-" },
  { url: sanitizeUrl(p05.url, 4), caption: "माहिती पत्रक वितरण" },
  { url: sanitizeUrl(p06.url, 5), caption: "ITSF समाजभूषण पुरस्कार सोहळा २०२५" },
  { url: sanitizeUrl(p07.url, 2), caption: "आनंदशाळा व फिटनेस-स्पोर्ट्स कॉम्प्लेक्स" },
  { url: sanitizeUrl(p08.url, 7), caption: "ITSF अवॉर्ड २०२५ — सोहळा" },
  { url: sanitizeUrl(p09.url, 8), caption: "मुंबई व कोल्हापूर येथे सन्मान" },
  { url: sanitizeUrl(p10.url, 9), caption: "प्रचार व प्रसार कार्यक्रम" },
  { url: sanitizeUrl(p11.url, 10), caption: "ज्येष्ठ नागरिक समाजसेवा पुरस्कार, कोल्हापूर" },
  { url: sanitizeUrl(p12.url, 11), caption: "प्रीतम व्यवसाय समूह" },
  { url: sanitizeUrl(p13.url, 12), caption: "प्रीतम सेल्स कार्पोरेशन — ब्रँड्स" },
  { url: sanitizeUrl(p14.url, 13), caption: "यशस्वी व्यवसायाची गुरुकिल्ली" },
  { url: sanitizeUrl(p15.url, 14), caption: "सांगलीच्या कुशीत, निसर्गाच्या सानिध्यात" },
  { url: sanitizeUrl(p16.url, 15), caption: "मी आलोय... तुम्ही कधी येताय?" },
  { url: sanitizeUrl(p17.url, 16), caption: "फूड कोर्ट व प्युअर व्हेज हॉटेल" },
  { url: sanitizeUrl((p18Asset as { url: string }).url, 17), caption: "संपूर्ण प्रकल्पाचे दृश्य" },
  { url: sanitizeUrl(p19.url, 18), caption: "५५ फुटांची राधाकृष्ण मूर्ती" },
  { url: sanitizeUrl(p20.url, 19), caption: "प्रकल्पाचा पत्ता व माहिती" },
  { url: sanitizeUrl(p21.url, 20), caption: "संपर्क माहिती" },
  { url: sanitizeUrl(p22.url, 21), caption: "आनंदशाळा ई-रिक्षा सेवा" },
];