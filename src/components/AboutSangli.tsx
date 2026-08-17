import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/use-language";
import {
  MapPin,
  Sparkles,
  Plane,
  Train,
  Bus,
  Sun,
  Compass,
  Building2,
  Trees,
  Mountain,
  Landmark,
  X,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Navigation,
  Heart,
  Smile,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

import "./AboutSangli.css";

interface PlaceItem {
  id: string;
  category: "close" | "medium" | "daytrips";
  isSeniorFriendly: boolean;
  catLabelMr: string;
  catLabelEn: string;
  titleMr: string;
  titleEn: string;
  distanceMr: string;
  distanceEn: string;
  image: string;
  shortDescMr: string;
  shortDescEn: string;
  fullDescMr: string;
  fullDescEn: string;
  highlightsMr: string[];
  highlightsEn: string[];
}

function formatWithPinkAnandshala(text: string) {
  if (!text) return text;
  const parts = text.split(/(आनंदशाळेपासून|आनंदशाळेच्या|आनंदशाळेत|आनंदशाळा|Anandshala)/g);
  return parts.map((part, index) => {
    if (["आनंदशाळेपासून", "आनंदशाळेच्या", "आनंदशाळेत", "आनंदशाळा", "Anandshala"].includes(part)) {
      return (
        <span key={index} className="text-[#db2777] font-black bg-pink-100/90 px-1.5 py-0.5 rounded-md border border-pink-300/80 inline-block shadow-2xs">
          {part}
        </span>
      );
    }
    return part;
  });
}

import { useAdminStore } from "@/lib/admin-store";

export function AboutSangli() {
  const { isEn } = useLanguage();
  const store = useAdminStore();
  const overrides = store.aboutData?.sangliPlacesOverrides || {};
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);

  useEffect(() => {
    if (selectedPlace) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.touchAction = "";
      };
    }
  }, [selectedPlace]);

  const rawPlaces: PlaceItem[] = [
    // ── WITHIN / VERY CLOSE TO SANGLI (Within 10 km) ──
    {
      id: "sangli-ganpati",
      category: "close",
      isSeniorFriendly: true,
      catLabelMr: "📍 शहर परिसर (३ किमी)",
      catLabelEn: "📍 City Hub (3 km)",
      titleMr: "१. सांगली गणपती मंदिर (राजवाडा)",
      titleEn: "1. Sangli Royal Ganapati Temple",
      distanceMr: "३ किमी (१० मिनिटे)",
      distanceEn: "3 km (10 mins)",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "१८४३ मध्ये बांधलेले काळ्या पाषाणातील ऐतिहासिक राजवाडा मंदिर; शहराचे प्रमुख अध्यात्मिक प्रतीक.",
      shortDescEn: "Historic black-stone temple built in 1843; Sangli city's most iconic spiritual landmark.",
      fullDescMr: "पटवर्धन घराण्याने १८४३ मध्ये उभारलेले हे मंदिर वास्तुकलेचा अद्भूत नमुना आहे. कृष्णा नदीच्या घाटावर वसलेले हे मंदिर सांगलीचे मुख्य श्रद्धास्थान आहे. येथे पायऱ्यांची अडचण नसल्याने ज्येष्ठ नागरिकांसाठी अतिशय सोयीस्कर दर्शन आहे.",
      fullDescEn: "Constructed in 1843 by Patwardhan rulers, this black-stone shrine on Krishna river is Sangli's main landmark. Features smooth level access ideal for senior citizens.",
      highlightsMr: [
        "👴 ज्येष्ठांसाठी सुलभ व सोपे दर्शन (Wheelchair Friendly)",
        "१८४३ मधील वैभवशाली ऐतिहासिक काळी दगडी वास्तू",
        "कृष्णा नदी घाटाचा विलोभनीय परिसर",
        "आनंदशाळेपासून अवघ्या १० मिनिटांच्या अंतरावर"
      ],
      highlightsEn: [
        "👴 Senior Friendly easy level walking access",
        "1843 historic black stone heritage architectural feat",
        "Scenic waterfront on Krishna River banks",
        "Just 10 minutes drive from Anandshala"
      ]
    },
    {
      id: "sangli-fort-rajwada",
      category: "close",
      isSeniorFriendly: true,
      catLabelMr: "📍 शहर परिसर (३.५ किमी)",
      catLabelEn: "📍 City Hub (3.5 km)",
      titleMr: "२. सांगली किल्ला व राजवाडा परिसर",
      titleEn: "2. Sangli Fort & Rajwada Area",
      distanceMr: "३.५ किमी (१२ मिनिटे)",
      distanceEn: "3.5 km (12 mins)",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "पटवर्धन संस्थानाचा ऐतिहासिक राजवाडा, कारंजे, पुरातत्व वास्तू व ऐतिहासिक वारसा केंद्र.",
      shortDescEn: "Historical Patwardhan-era heritage palace, fountains and royal architecture in city heart.",
      fullDescMr: "सांगली शहराच्या मध्यभागी असलेला हा ऐतिहासिक राजवाडा पटवर्धन घराण्याच्या वैभवशाली परंपरेची साक्ष देतो. राजवाड्याचा परिसर, कारंजे आणि ऐतिहासिक वास्तू फिरण्यासाठी अतिशय आनंददायी आहे.",
      fullDescEn: "Located in the heart of Sangli city, this historic Patwardhan era palace compound offers peaceful heritage walking and royal architectural grandeur.",
      highlightsMr: [
        "👴 निवांत फिरण्यासाठी सपाट व सुरक्षित परिसर",
        "पटवर्धन संस्थानाचा वैभवशाली ऐतिहासिक राजवाडा",
        "सुंदर कारंजे व ऐतिहासिक चित्रे",
        "आनंदशाळेपासून अतिशय जवळ"
      ],
      highlightsEn: [
        "👴 Level walking grounds suitable for elders",
        "Grand Patwardhan era royal heritage palace",
        "Fountains and historic architectural compound",
        "Very close to Anandshala"
      ]
    },
    {
      id: "sangmeshwar-haripur",
      category: "close",
      isSeniorFriendly: true,
      catLabelMr: "📍 शहर परिसर (५ किमी)",
      catLabelEn: "📍 City Hub (5 km)",
      titleMr: "३. संगमेश्वर मंदिर (हरिपूर संगम)",
      titleEn: "3. Sangmeshwar Temple (Haripur)",
      distanceMr: "५ किमी (१५ मिनिटे)",
      distanceEn: "5 km (15 mins)",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "कृष्णा आणि वारणा नद्यांच्या पवित्र संगमावर वसलेले अत्यंत शांत व निसर्गरम्य शिवमंदिर.",
      shortDescEn: "Peaceful spiritual Shiv temple at the serene confluence of Krishna and Warna rivers.",
      fullDescMr: "हरिपूर येथे कृष्णा आणि वारणा या दोन पवित्र नद्यांचा सुरेख संगम होतो. संगमावर असलेले संगमेश्वर (सिद्धेश्वर) मंदिर अत्यंत शांत अध्यात्मिक ऊर्जा देते. सकाळ-संध्याकाळ निवांत बसण्यासाठी हे उत्तम स्थान आहे.",
      fullDescEn: "Situated at the scenic confluence of Krishna and Warna rivers in Haripur, this Shiva temple offers tranquil waterfront views and deeply peaceful spiritual vibes.",
      highlightsMr: [
        "👴 शांत बसण्यासाठी व विरंगुळ्यासाठी आदर्श स्थान",
        "कृष्णा व वारणा नद्यांचा पवित्र संगम",
        "झाडी व नदीकाठचा निसर्गरम्य परिसर",
        "सायंकाळच्या वेळी विलोभनीय वातावरण"
      ],
      highlightsEn: [
        "👴 Ideal quiet spot for seniors to sit & relax",
        "Sacred confluence of Krishna and Warna rivers",
        "Shaded green riverbank surroundings",
        "Serene evening sunset views"
      ]
    },
    {
      id: "krishna-irwin-bridge",
      category: "close",
      isSeniorFriendly: true,
      catLabelMr: "📍 शहर परिसर (४ किमी)",
      catLabelEn: "📍 City Hub (4 km)",
      titleMr: "४. कृष्णा नदीकाठ व आयर्विन पूल",
      titleEn: "4. Krishna River & Irwin Bridge",
      distanceMr: "४ किमी (१० मिनिटे)",
      distanceEn: "4 km (10 mins)",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "१९२९ मधील ब्रिटिशकालीन ऐतिहासिक लाल दगडाचा पूल व कृष्णा नदीचा सुंदर घाट परिसर.",
      shortDescEn: "Historic 1929 British-era red-stone arch bridge; pleasant for morning/evening drives.",
      fullDescMr: "१९२९ मध्ये बांधलेला आयर्विन पूल हा सांगलीचा ऐतिहासिक मानबिंदू आहे. कृष्णा नदीच्या पात्रातील हा पूल व लगतचा नदीकाठ सकाळी किंवा संध्याकाळी गाडीतून फिरण्यासाठी अतिशय आनंददायी आहे.",
      fullDescEn: "Built in 1929, the historic red-stone Irwin Bridge spans the Krishna River. Offers scenic driving and riverside viewing for quick morning or evening outings.",
      highlightsMr: [
        "👴 कार/व्हॅन गाडीतून फिरण्यासाठी अतिशय सुलभ",
        "१९२९ मधील ऐतिहासिक ब्रिटिशकालीन कमान पूल",
        "कृष्णा नदीचे विहंगम दृश्य",
        "आनंदशाळेच्या अगदी जवळ"
      ],
      highlightsEn: [
        "👴 Very comfortable scenic car/van drive for elders",
        "Historic 1929 red-stone arch bridge engineering",
        "Panoramic Krishna River views",
        "Extremely close to Anandshala"
      ]
    },
    {
      id: "miraj-dargah",
      category: "close",
      isSeniorFriendly: true,
      catLabelMr: "📍 शहर परिसर (१० किमी)",
      catLabelEn: "📍 City Hub (10 km)",
      titleMr: "५. मिरज - ख्वाजा मीरासाहेब दर्गाह व संगीत नगरी",
      titleEn: "5. Miraj Khwaja Meerasaheb Dargah",
      distanceMr: "१० किमी (२० मिनिटे)",
      distanceEn: "10 km (20 mins)",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "हिंदू-मुस्लिम सलोख्याचे ऐतिहासिक दर्गाह व जागतिक प्रसिद्ध मिरज सतार-तंबोरा संगीत केंद्र.",
      shortDescEn: "Important shared Hindu-Muslim pilgrimage site & world famous Sitar manufacturing hub.",
      fullDescMr: "मिरज येथील हजरत ख्वाजा शामना मीरा दर्गाह हे जातीय सलोखा व सर्वधर्मसमभावाचे मुख्य प्रतीक आहे. तसेच मिरज ही सतार आणि तंबोरा वाद्य निर्मितीची जागतिक राजधानी मानली जाते.",
      fullDescEn: "The Khwaja Meerasaheb Dargah in Miraj is a famous holy shrine visited by devotees of all faiths. Miraj is also India's GI-tagged hub for handcrafted Sitars & Tanpuras.",
      highlightsMr: [
        "👴 सपाट रस्ते व सुलभ दर्शन व्यवस्था",
        "हिंदू-मुस्लिम जातीय सलोख्याचे पवित्र स्थान",
        "विश्वप्रसिद्ध सतार व तंबोरा वाद्य कार्यशाळा",
        "आनंदशाळेवरून अवघ्या २० मिनिटांवर"
      ],
      highlightsEn: [
        "👴 Smooth level ground access for senior citizens",
        "Revered interfaith holy shrine of communal harmony",
        "World famous Sitar & Tanpura handicraft workshops",
        "Just 20 minutes from Anandshala"
      ]
    },
    {
      id: "audumbar-temple",
      category: "close",
      isSeniorFriendly: true,
      catLabelMr: "📍 जवळ परिसर (२५ किमी)",
      catLabelEn: "📍 Nearby (25 km)",
      titleMr: "६. औदुंबर - श्री दत्त क्षेत्र (दत्त मंदिर)",
      titleEn: "6. Audumbar Shri Dattatreya Temple",
      distanceMr: "२५ किमी (४० मिनिटे)",
      distanceEn: "25 km (40 mins)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "कृष्णा नदीच्या काठावर औदुंबराच्या दाट सावलीत वसलेले परमपवित्र व शांत दत्त तीर्थक्षेत्र.",
      shortDescEn: "Sacred Shri Dattatreya temple on Krishna riverbank; excellent for a quiet spiritual outing.",
      fullDescMr: "श्री नरसिंह सरस्वती स्वामींच्या वास्तव्याने पुनीत झालेले औदुंबर हे महाराष्ट्रातील मुख्य दत्त क्षेत्रांपैकी एक आहे. कृष्णा नदीच्या शांत पात्रात स्नान व दत्त पादुका दर्शन मनःशांती देते.",
      fullDescEn: "Blessed by Shri Narasimha Saraswati, Audumbar is a premier Datta pilgrimage site. Nestled amidst lush Audumbar trees on Krishna riverbank, offering profound tranquility.",
      highlightsMr: [
        "👴 शांत वातावरण व बसण्यासाठी वृक्षांची शीतल सावली",
        "महाराष्ट्रातील अग्रगण्य पवित्र श्री दत्त क्षेत्र",
        "कृष्णा नदीच्या विलोभनीय पात्रावर स्थान",
        "अत्यंत प्रसन्न व अध्यात्मिक वातावरण"
      ],
      highlightsEn: [
        "👴 Highly peaceful, shaded seating for senior citizens",
        "Top sacred Dattatreya pilgrimage in Maharashtra",
        "Scenic location on calm Krishna riverbank",
        "Profoundly serene spiritual atmosphere"
      ]
    },

    // ── WITHIN ROUGHLY 25-50 KM (२५ ते ५० किमी परिसर) ──
    {
      id: "dandoba-hills",
      category: "medium",
      isSeniorFriendly: true,
      catLabelMr: "🚗 २५-५० किमी परिसर",
      catLabelEn: "🚗 25-50 km Radius",
      titleMr: "७. दंडोबा टेकडी व गुहा शिवमंदिर (भोसे)",
      titleEn: "7. Dandoba Hills & Forest Shrine",
      distanceMr: "२५ किमी (३० मिनिटे)",
      distanceEn: "25 km (30 mins)",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "राखीव वनक्षेत्र, टेकडी, प्राचीन गुहेतील शिवमंदिर व निसर्गरम्य दरीचे विहंगम दृश्य.",
      shortDescEn: "Hills, forest reserve, ancient cave temple and scenic views; ideal short morning outing.",
      fullDescMr: "सांगलीपासून २५ मिनिटांच्या अंतरावर दंडोबा टेकडी आहे. हे राखीव वनक्षेत्र असून येथे प्राचीन गुहेमध्ये भगवान शिवाचे स्थान आहे. गाडीने वरपर्यंत जाता येत असल्याने सकाळी फिरण्यासाठी उत्तम आहे.",
      fullDescEn: "Described as a 25-minute drive from Sangli, Dandoba Hills is a protected forest reserve with an ancient cave Shiva temple. Road reaches right up to temple area.",
      highlightsMr: [
        "👴 गाडी थेट वरपर्यंत जात असल्याने सोयीस्कर",
        "प्राचीन गुहेतील स्वयंभू शिवमंदिर",
        "शुद्ध हवा व हिरवेगार राखीव वनक्षेत्र",
        "सकाळच्या छोट्या सहलीसाठी सर्वोत्तम"
      ],
      highlightsEn: [
        "👴 Vehicle access right near temple area",
        "Ancient rock cave Shiva shrine",
        "Fresh mountain breeze & forest cover",
        "Perfect short morning outing"
      ]
    },
    {
      id: "sagareshwar-sanctuary",
      category: "medium",
      isSeniorFriendly: true,
      catLabelMr: "🚗 २५-५० किमी परिसर",
      catLabelEn: "🚗 25-50 km Radius",
      titleMr: "८. सागरेश्वर वन्यजीव अभयारण्य व शिवमंदिर",
      titleEn: "8. Sagareshwar Wildlife Sanctuary",
      distanceMr: "३० किमी (४५ मिनिटे)",
      distanceEn: "30 km (45 mins)",
      image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "१,०००+ हरणे, काळवीट, मोर व प्राचीन दगडी शिवमंदिर समूह असलेले अद्वितीय मानवनिर्मित अभयारण्य.",
      shortDescEn: "Unique man-made sanctuary with deer, blackbuck, peacocks, temples & Krishna river views.",
      fullDescMr: "सागरेश्वर हे भारतातील पहिले मानवनिर्मित अभयारण्य आहे. १०.८ चौ. किमी परिसरात १,००० पेक्षा जास्त हरणे, काळवीट व मोर मुक्तपणे फिरतात. येथे गाडीतून फिरत प्राणी पाहता येतात.",
      fullDescEn: "India's pioneer man-made wildlife reserve spanning 10.8 sq km. Home to 1,000+ deer, blackbucks, peacocks with driving tracks and ancient Shiva cave shrines.",
      highlightsMr: [
        "👴 सफारी गाडीतून प्राणी पाहण्याची सोय",
        "भारतातील १ ले मानवनिर्मित अभयारण्य",
        "१००० हून अधिक हरणे, काळवीट व मोर",
        "प्राचीन दगडी शिवमंदिर समूह"
      ],
      highlightsEn: [
        "👴 Comfortable vehicle drive safari for elders",
        "India's 1st man-made wildlife sanctuary",
        "1,000+ free roaming deer, peacocks & blackbucks",
        "Ancient stone Shiva cave temple cluster"
      ]
    },
    {
      id: "bahubali-kumbhojgiri",
      category: "medium",
      isSeniorFriendly: false,
      catLabelMr: "🚗 २५-५० किमी परिसर",
      catLabelEn: "🚗 25-50 km Radius",
      titleMr: "९. बाहुबली कुंभोजगिरी (जैन तीर्थक्षेत्र)",
      titleEn: "9. Bahubali Hill, Kumbhojgiri",
      distanceMr: "३५ किमी (५० मिनिटे)",
      distanceEn: "35 km (50 mins)",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "२८ फुटांची भव्य बाहुबली मूर्ती असलेले टेकडीवरील अतिशय प्रसिद्ध जैन तीर्थक्षेत्र.",
      shortDescEn: "Renowned Jain pilgrimage center with 28ft Bahubali statue & panoramic valley views.",
      fullDescMr: "कुंभोज येथील बाहुबली हे प्रसिद्ध जैन तीर्थक्षेत्र आहे. टेकडीवर २८ फुटांची भगवान बाहुबलींची भव्य मूर्ती आहे. टीप: टेकडीवर जाण्यासाठी सुमारे ४०० पायऱ्या असल्याने चालणे टाळणाऱ्या ज्येष्ठ नागरिकांसाठी हे थोडे आव्हानात्मक असू शकते.",
      fullDescEn: "Major Jain pilgrimage hub featuring a 28ft tall Lord Bahubali statue atop a hill. Note: Involves ~400 steps climb, so recommended for active seniors.",
      highlightsMr: [
        "२८ फुटांची भव्य भगवान बाहुबली मूर्ती",
        "शांत व पवित्र जैन तीर्थक्षेत्र",
        "टेकडीवरून आजूबाजूच्या परिसराचे विहंगम दृश्य",
        "⚠️ ४०० पायऱ्या असल्याने पायऱ्या चढणाऱ्यांसाठी सोयीस्कर"
      ],
      highlightsEn: [
        "28ft majestic Lord Bahubali statue",
        "Revered peaceful Jain pilgrimage hub",
        "Panoramic hilltop views of countryside",
        "⚠️ Note: Involves 400 steps climb"
      ]
    },
    {
      id: "ramling-island-bahe",
      category: "medium",
      isSeniorFriendly: true,
      catLabelMr: "🚗 २५-५० किमी परिसर",
      catLabelEn: "🚗 25-50 km Radius",
      titleMr: "१०. रामलिंग बेट व राममंदिर (बहे)",
      titleEn: "10. Ramling Island, Bahe",
      distanceMr: "३८ किमी (५० मिनिटे)",
      distanceEn: "38 km (50 mins)",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "कृष्णा नदीच्या पात्रातील निसर्गरम्य बेट, रामायणकालीन ऐतिहासिक राममंदिर व निसर्ग पर्यटन.",
      shortDescEn: "Attractive Krishna river island location with ancient Ram temple; ideal for nature outing.",
      fullDescMr: "वाळवा तालुक्यातील बहे येथे कृष्णा नदीच्या पात्रात निसर्गरम्य रामलिंग बेट आहे. प्रभू रामचंद्रांच्या वास्तव्याने पुनीत झालेले येथील प्राचीन राममंदिर व सभोवतालचे पाण्याचे पात्र निवांत फिरण्यासाठी अतिशय आनंददायी आहे.",
      fullDescEn: "Located in Bahe on Krishna river, Ramling Island is a natural river island housing an ancient Ram temple associated with the Ramayana. Excellent for a scenic nature outing.",
      highlightsMr: [
        "👴 निवांत निसर्ग सहलीसाठी अत्यंत प्रसन्न ठिकाण",
        "कृष्णा नदीच्या पात्रातील निसर्गरम्य बेट",
        "रामायणकालीन ऐतिहासिक श्री राममंदिर",
        "झाडी व नदीच्या पाण्याचा आल्हाददायक अनुभव"
      ],
      highlightsEn: [
        "👴 Relaxing, refreshing nature outing for seniors",
        "Unique natural river island on Krishna river",
        "Historic Ram temple linked with Ramayana",
        "Cool river breeze & lush green island trees"
      ]
    },

    // ── LONGER DAY TRIPS (५० ते ८० किमी सहली) ──
    {
      id: "chandoli-national-park",
      category: "daytrips",
      isSeniorFriendly: true,
      catLabelMr: "🚌 १ दिवसाची सहल (६५ किमी)",
      catLabelEn: "🚌 Day Trip (65 km)",
      titleMr: "११. चांदोली राष्ट्रीय उद्यान व धरण",
      titleEn: "11. Chandoli National Park & Dam",
      distanceMr: "६५ किमी (१.५ तास)",
      distanceEn: "65 km (1.5 hrs)",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "यूनेस्को जागतिक वारसा सह्याद्री व्याघ्र प्रकल्प, विशाल धरण व निसर्गरम्य जंगल परिसर.",
      shortDescEn: "UNESCO World Heritage tiger reserve, vast dam reservoir & lush green forest nature.",
      fullDescMr: "सह्याद्रीच्या कुशीत वसलेले चांदोली हे महाराष्ट्रातील प्रमुख राष्ट्रीय उद्यान आहे. चांदोली धरण, विशाल जलाशय व दाट जंगल गाडीतून पाहण्याचा अनुभव अविस्मरणीय असतो.",
      fullDescEn: "Part of the Sahyadri Tiger Reserve and UNESCO World Heritage site. Features the grand Chandoli Dam, massive water reservoir, and dense forest drives.",
      highlightsMr: [
        "👴 गाडीतून जलाशय व जंगलाचे सुंदर दृश्य",
        "यूनेस्को जागतिक निसर्ग वारसा स्थळ",
        "चांदोली धरण व बॅकवॉटर परिसर",
        "निसर्गप्रेमींसाठी एक दिवसाची उत्तम सहल"
      ],
      highlightsEn: [
        "👴 Scenic vehicle drive along dam backwaters",
        "UNESCO World Heritage Sahyadri Tiger Reserve",
        "Vast Chandoli Dam & reservoir views",
        "Wonderful 1-day nature outing"
      ]
    },
    {
      id: "gokak-waterfall",
      category: "daytrips",
      isSeniorFriendly: true,
      catLabelMr: "🚌 १ दिवसाची सहल (७५ किमी)",
      catLabelEn: "🚌 Day Trip (75 km)",
      titleMr: "१२. गोकाक भव्य धबधबा",
      titleEn: "12. Gokak Spectacular Waterfall",
      distanceMr: "७५ किमी (१.५ तास)",
      distanceEn: "75 km (1.5 hrs)",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "१७७ फूट (५२ मीटर) उंचीवरून कोसळणारा भव्य धबधबा व ऐतिहासिक लटकता पूल (Hanging Bridge).",
      shortDescEn: "Spectacular 177 ft (52m) waterfall plunge with a historic British hanging suspension bridge.",
      fullDescMr: "घटप्रभा नदीवर १७७ फूट उंचीवरून कोसळणारा गोकाक धबधबा हा 'भारतातील नायगारा' म्हणून प्रसिद्ध आहे. धबधब्यावर असलेला १८८७ मधील लटकता पूल व दृश्य गाडीतून/व्ह्यू पॉइंटवरून सहजरीत्या पाहता येते.",
      fullDescEn: "Dropping 177 feet (52 meters) over a horseshoe cliff on Ghataprabha river, Gokak Falls resembles Niagara Falls. Features a historic 1887 hanging suspension bridge with easy viewing platforms.",
      highlightsMr: [
        "👴 व्ह्यू पॉइंटवरून सहजरीत्या पाहण्याची सोय",
        "१७७ फूट उंच भव्य पांढराशुभ्र धबधबा",
        "१८८७ मधील ऐतिहासिक लटकता पूल",
        "पावसाळ्यात व नंतर अत्यंत विलोभनीय दृश्य"
      ],
      highlightsEn: [
        "👴 Easy viewing deck access without steep walks",
        "Spectacular 177 ft horseshoe cliff waterfall",
        "Historic 1887 British suspension hanging bridge",
        "Breathtaking monsoon & post-monsoon views"
      ]
    },
    {
      id: "machhindragad-fort",
      category: "daytrips",
      isSeniorFriendly: true,
      catLabelMr: "🚌 १ दिवसाची सहल (४५ किमी)",
      catLabelEn: "🚌 Day Trip (45 km)",
      titleMr: "१३. मच्छिंद्रगड किल्ला व मंदिर",
      titleEn: "13. Machhindragad Fort & Temple",
      distanceMr: "४५ किमी (१ तास)",
      distanceEn: "45 km (1 hr)",
      image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "छत्रपती शिवाजी महाराजांनी १६७६ मध्ये बांधलेला किल्ला व मच्छिंद्रनाथ मंदिर.",
      shortDescEn: "Historic fort built by Chhatrapati Shivaji Maharaj in 1676 with Machhindranath temple.",
      fullDescMr: "छत्रपती शिवाजी महाराजांनी १६७६ मध्ये बांधलेला हा ऐतिहासिक किल्ला सांगली जिल्ह्यातील प्रमुख ऐतिहासिक ठिकाण आहे. किल्ल्यावर मच्छिंद्रनाथांची समाधी व सुंदर परिसर आहे.",
      fullDescEn: "Built by Chhatrapati Shivaji Maharaj in 1676, Machhindragad is a heritage fort featuring the revered Machhindranath shrine surrounded by pleasant hill views.",
      highlightsMr: [
        "👴 गाडीने पायथ्यापर्यंत/जवळ जाण्याची सोय",
        "छत्रपती शिवाजी महाराजांनी १६७६ मध्ये बांधलेला किल्ला",
        "मच्छिंद्रनाथ मंदिर व शांत परिसर",
        "ऐतिहासिक व सांस्कृतिक महत्त्व"
      ],
      highlightsEn: [
        "👴 Road access close to main shrine area",
        "Historic fort built by Shivaji Maharaj in 1676",
        "Machhindranath shrine in serene surroundings",
        "Rich Maratha heritage site"
      ]
    },
    {
      id: "kolhapur-excursion",
      category: "daytrips",
      isSeniorFriendly: true,
      catLabelMr: "🚌 १ दिवसाची सहल (५० किमी)",
      catLabelEn: "🚌 Day Trip (50 km)",
      titleMr: "१४. कोल्हापूर - श्री महालक्ष्मी मंदिर, न्यू पॅलेस व रंकाळा",
      titleEn: "14. Kolhapur Day Tour (Mahalaxmi)",
      distanceMr: "५० किमी (१ तास)",
      distanceEn: "50 km (1 hr)",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
      shortDescMr: "श्री अंबाबाई महालक्ष्मी मंदिर, छत्रपती शाहू न्यू पॅलेस राजवाडा व रंकाळा तलाव एक दिवसीय सहल.",
      shortDescEn: "Easy 50km full-day trip for Shri Mahalaxmi Temple, New Palace Museum & Rankala Lake.",
      fullDescMr: "सांगलीपासून अवघ्या ५० किमी अंतरावर असलेले कोल्हापूर हे १ दिवसाच्या सहलीसाठी सर्वोत्तम स्थान आहे. करवीर निवासिनी श्री अंबाबाई मंदिर दर्शन, छत्रपती शाहू महाराजांचा न्यू पॅलेस राजवाडा व रंकाळा तलाव येथे व्हिलचेअर व सुलभ सोयी उपलब्ध आहेत.",
      fullDescEn: "Just 50 km from Sangli, Kolhapur makes a perfect full-day outing for Anandshala seniors. Visit the divine Shri Mahalaxmi Temple, Chhatrapati Shahu New Palace Museum, and scenic Rankala Lake.",
      highlightsMr: [
        "👴 आनंदशाळा सदस्यांसाठी १ दिवसाची सर्वोत्तम सहल",
        "साडेतीन पीठांपैकी १ - श्री महालक्ष्मी मंदिर दर्शन",
        "छत्रपती शाहू महाराजांचा भव्य न्यू पॅलेस राजवाडा",
        "रंकाळा तलाव व ऐतिहासिक कोल्हापूर शहर"
      ],
      highlightsEn: [
        "👴 Top recommended 1-day excursion for Anandshala",
        "Holy Shri Mahalaxmi Temple darshan",
        "Grand Chhatrapati Shahu New Palace museum",
        "Scenic Rankala Lake walk & seating"
      ]
    }
  ];

  const places = rawPlaces.map((p) => {
    const ov = overrides[p.id];
    if (!ov) return p;
    return {
      ...p,
      image: ov.image || p.image,
      titleMr: ov.titleMr || p.titleMr,
      titleEn: ov.titleEn || p.titleEn,
      distanceMr: ov.distanceMr || p.distanceMr,
      shortDescMr: ov.shortDescMr || p.shortDescMr,
    };
  });

  const filteredPlaces = places.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "senior-friendly") return p.isSeniorFriendly;
    return p.category === activeTab;
  });

  return (
    <section className="as-sangli-wrapper" id="about-sangli">
      <div className="as-sangli-bg-glow-1" />
      <div className="as-sangli-bg-glow-2" />

      <div className="as-sangli-container">

        {/* ── HEADER ── */}
        <div className="as-sangli-header">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="as-sangli-badge"
          >
            <Compass size={16} className="animate-spin-slow" />
            <span>{isEn ? "Explore Sangli & Nearby Attractions" : "सांगली व परिसरातील १४ प्रमुख पर्यटन व तीर्थक्षेत्रे"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="as-sangli-title"
          >
            {isEn ? (
              <>Famous Excursions Around <span className="text-[#db2777]">Anandshala</span></>
            ) : (
              <>
                <span className="text-[#db2777]">आनंदशाळेच्या</span> <span className="text-[#1A05A2]">परिसरातील प्रसिद्ध मंदिरे व सहली</span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="as-sangli-subtitle"
          >
            {isEn
              ? "A curated guide to 14 historic temples, heritage palaces, wildlife sanctuaries, and day-trip excursions within 5 km to 80 km of Preetam Anandshala."
              : "प्रीतम आनंदशाळेतील सदस्य व पालकांसाठी ५ किमी ते ८० किमी परिसरातील १४ प्रसिद्ध मंदिरे, ऐतिहासिक राजवाडे, अभयारण्य व निसर्गरम्य १ दिवसाच्या सहलींचे संपूर्ण मार्गदर्शक."}
          </motion.p>
        </div>

        {/* ── SENIOR LIVING SPECIAL RECOMMENDED BANNER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-10 bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <Heart size={280} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-extrabold text-xs tracking-wider uppercase border border-white/30">
                <Smile size={14} className="text-amber-300" />
                {isEn ? (
                  <>Tailored for <span className="text-[#db2777] font-black bg-white px-2 py-0.5 rounded-full shadow-sm">Anandshala</span> Seniors</>
                ) : (
                  <><span className="text-[#db2777] font-black bg-white px-2 py-0.5 rounded-full shadow-sm">आनंदशाळा</span> ज्येष्ठांसाठी विशेष शिफारस</>
                )}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                {isEn ? "Comfortable & Easy Excursions (Zero Steep Climbs)" : "ज्येष्ठांसाठी अत्यंत सोयीस्कर व विनासायास दर्शन सहली"}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-pink-100 max-w-3xl leading-relaxed">
                {isEn
                  ? "We especially recommend easy, comfortable outings near Sangli with direct vehicle access, wheelchair assistance, and shaded seating area."
                  : "सांगली व परिसरातील अतिशय सोयीस्कर ठिकाणे जिथे पायऱ्यांची अडचण नाही, गाड्या थेट जवळ जातात व निवांत बसण्यासाठी झाडांची उत्तम सावली आहे."}
              </p>
            </div>

            <button
              onClick={() => setActiveTab("senior-friendly")}
              className={`shrink-0 px-6 py-3.5 rounded-full font-black text-sm transition-all duration-300 shadow-xl cursor-pointer ${activeTab === "senior-friendly"
                  ? "bg-amber-400 text-slate-950 scale-105"
                  : "bg-white text-purple-900 hover:bg-pink-100 hover:scale-105"
                }`}
            >
              👴 {isEn ? "View Senior-Friendly Places" : "ज्येष्ठांसाठी सुलभ ठिकाणे पहा"}
            </button>
          </div>
        </motion.div>

        {/* ── WEATHER & CITY QUICK STATS BANNER ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 bg-gradient-to-r from-white via-pink-50/80 to-blue-50/80 rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

            <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-200/80 pb-4 md:pb-0 pr-4">
              <div className="size-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                <Sun size={28} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider">{isEn ? "Weather & Climate" : "हवामान व वातावरण"}</h4>
                <p className="text-base font-black text-slate-800 mt-0.5">{isEn ? "Pleasant & Healthy (18°C - 30°C)" : "प्रसन्न व निरोगी हवामान (१८°C - ३०°C)"}</p>
                <span className="text-xs font-bold text-slate-500">{isEn ? "Fresh breeze from Krishna river valley" : "कृष्णा नदी खोऱ्यातील शुद्ध व ताजी हवा"}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-200/80 pb-4 md:pb-0 pr-4">
              <div className="size-14 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0 shadow-sm">
                <Landmark size={28} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider">{isEn ? "City Specialty" : "सांगलीची ओळख"}</h4>
                <p className="text-base font-black text-slate-800 mt-0.5">{isEn ? "Turmeric City & Natya Bhumi" : "हळद नगरी व नाट्य पंढरी"}</p>
                <span className="text-xs font-bold text-slate-500">{isEn ? "Famous for Grapes, Sugar & Music" : "द्राक्षे, गूळ-हळद बाजार व संगीत परंपरा"}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                <Navigation size={28} />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-wider">{isEn ? "Distance Radius" : "परिसर अंतर"}</h4>
                <p className="text-base font-black text-slate-800 mt-0.5">{isEn ? "Within 3 to 75 km Radius" : "आनंदशाळेपासून ३ ते ७५ किमी"}</p>
                <span className="text-xs font-bold text-slate-500">{isEn ? "Easy 10 mins to 1.5 hrs smooth drive" : "१० मिनिटे ते १.५ तासांत सुलभ प्रवास"}</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ── FILTER TABS ── */}
        <div className="as-sangli-tabs">
          <button
            onClick={() => setActiveTab("all")}
            className={`as-sangli-tab-btn ${activeTab === "all" ? "active" : ""}`}
          >
            <span>{isEn ? "🌟 All 14 Places" : "🌟 सर्व १४ ठिकाणे"}</span>
          </button>
          <button
            onClick={() => setActiveTab("daytrips")}
            className={`as-sangli-tab-btn ${activeTab === "daytrips" ? "active" : ""}`}
          >
            <span>{isEn ? "🚌 Day Trips (50-80 km)" : "🚌 १ दिवसाच्या सहली (५०-८० किमी)"}</span>
          </button>
        </div>

        {/* ── PLACES GRID ── */}
        <div className="as-sangli-grid">
          {filteredPlaces.map((place, idx) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="as-sangli-card"
              onClick={() => setSelectedPlace(place)}
            >
              <div className="as-sangli-card-img-wrapper">
                <img
                  src={place.image}
                  alt=""
                  className="as-sangli-card-img"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="as-sangli-card-body">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-amber-700 font-black text-xs px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs">
                    <MapPin size={12} className="text-amber-600" />
                    <span>{isEn ? place.distanceEn : place.distanceMr}</span>
                  </span>

                  {place.isSeniorFriendly ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-black text-xs px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80">
                      👴 {isEn ? "Senior Friendly" : "ज्येष्ठांसाठी सुलभ"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-800 font-black text-xs px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80">
                      🧗 {isEn ? "Involves Steps" : "पायऱ्यांचा मार्ग"}
                    </span>
                  )}
                </div>
                <h3 className="as-sangli-card-title">
                  {isEn ? place.titleEn : place.titleMr}
                </h3>
                <p className="as-sangli-card-desc mb-0">
                  {isEn ? place.shortDescEn : place.shortDescMr}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── GETTING THERE / TRANSPORT SECTION ── */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-extrabold text-xs uppercase tracking-wider mb-3">
              <Navigation size={14} /> {isEn ? "GETTING THERE" : "कसे पोहोचावे"}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A05A2]">
              {isEn ? (
                <>How to Reach Sangli &amp; <span className="text-[#db2777]">Anandshala</span></>
              ) : (
                <>सांगली व <span className="text-[#db2777]">आनंदशाळेत</span> <span className="text-[#1A05A2]">कसे पोहोचावे ?</span></>
              )}
            </h3>
            <p className="text-slate-600 font-bold text-base mt-2 max-w-2xl mx-auto">
              {isEn
                ? "Excellent connectivity via Air, Rail, and Road from Mumbai, Pune, Bengaluru, and major cities."
                : "मुंबई, पुणे, बंगळुरू व महाराष्ट्रातील सर्व शहरांमधून विमान, रेल्वे व रस्ते मार्गाने उत्तम जोडणी."}
            </p>
          </div>

          <div className="as-sangli-transport-grid">
            {/* Air Transport */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="as-sangli-transport-card"
            >
              <div className="as-sangli-transport-icon-box bg-gradient-to-r from-sky-500 to-blue-600">
                <Plane size={30} />
              </div>
              <h4 className="as-sangli-transport-title">{isEn ? "By Air" : "विमान प्रवास"}</h4>
              <p className="as-sangli-transport-desc">
                {isEn
                  ? "Nearest commercial airports connecting Sangli with major Indian metros."
                  : "सांगलीजवळ उपलब्ध असलेली विमानतळे जिथून आनंदशाळेत येणे सोपे आहे."}
              </p>
              <ul className="as-sangli-transport-list">
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>Kolhapur Airport (KLH):</strong> 45 km (45 mins by car)</> : <><strong>कोल्हापूर विमानतळ (Kolhapur):</strong> ४५ किमी (४५ मि. कारने)</>}</span>
                </li>
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>Belagavi Airport (IXG):</strong> 95 km (1.5 hrs)</> : <><strong>बेळगाव विमानतळ (Belagavi):</strong> ९५ किमी (१.५ तास)</>}</span>
                </li>
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>Pune International Airport:</strong> 230 km (3.5 hrs)</> : <><strong>पुणे आंतरराष्ट्रीय विमानतळ:</strong> २३० किमी (३.५ तास)</>}</span>
                </li>
              </ul>
            </motion.div>

            {/* Railway Transport */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="as-sangli-transport-card"
            >
              <div className="as-sangli-transport-icon-box bg-gradient-to-r from-purple-500 to-indigo-600">
                <Train size={30} />
              </div>
              <h4 className="as-sangli-transport-title">{isEn ? "By Railway" : "रेल्वे प्रवास"}</h4>
              <p className="as-sangli-transport-desc">
                {isEn
                  ? "Direct trains from Mumbai, Pune, Bengaluru, Goa, Delhi & Solapur."
                  : "मुंबई, पुणे, बंगळुरू, गोवा व दिल्लीवरून थेट सुपरफास्ट रेल्वे गाड्या."}
              </p>
              <ul className="as-sangli-transport-list">
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>Miraj Junction (MRJ):</strong> 10 km (Main Junction)</> : <><strong>मिरज जंक्शन (MRJ):</strong> १० किमी (मुख्य जंक्शन)</>}</span>
                </li>
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>Sangli Station (SLI):</strong> 4 km (Near Anandshala)</> : <><strong>सांगली स्टेशन (SLI):</strong> ४ किमी (आनंदशाळेजवळ)</>}</span>
                </li>
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? "Vande Bharat, Mahalaxmi, Koyna & Goa Express available" : "वंदे भारत, महालक्ष्मी, कोयना व गोवा एक्सप्रेस सोय"}</span>
                </li>
              </ul>
            </motion.div>

            {/* Road Transport */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="as-sangli-transport-card"
            >
              <div className="as-sangli-transport-icon-box bg-gradient-to-r from-pink-500 to-rose-600">
                <Bus size={30} />
              </div>
              <h4 className="as-sangli-transport-title">{isEn ? "By Road" : "रस्ते प्रवास"}</h4>
              <p className="as-sangli-transport-desc">
                {isEn
                  ? "Directly connected via National Highway NH-48 (Mumbai-Bengaluru)."
                  : "मुंबई-बंगळुरू राष्ट्रीय महामार्ग NH-48 वरून अत्यंत सुलभ रस्ता."}
              </p>
              <ul className="as-sangli-transport-list">
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>From Pune:</strong> 230 km (4 hrs via Highway)</> : <><strong>पुण्यावरून:</strong> २३० किमी (४ तास हायवेने)</>}</span>
                </li>
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? <><strong>From Mumbai:</strong> 380 km (6.5 hrs via Highway)</> : <><strong>मुंबईवरून:</strong> ३८० किमी (६.५ तास हायवेने)</>}</span>
                </li>
                <li className="as-sangli-transport-item">
                  <span className="as-sangli-transport-check">✓</span>
                  <span>{isEn ? "Daily MSRTC Shivneri, Volvo & private AC buses available" : "दररोज MSRTC शिवनेरी, वॉल्व्हो व प्रायव्हेट बस सोय"}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

      </div>

      {/* ── MODAL POPUP FOR SELECTED PLACE ── */}
      {selectedPlace && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="bg-white rounded-[2rem] sm:rounded-[2.5rem] max-w-lg w-full h-[84vh] sm:h-[88vh] max-h-[640px] sm:max-h-[700px] flex flex-col relative shadow-2xl border-4 border-pink-300 text-slate-800 overflow-hidden shadow-pink-500/30 my-auto shrink-0"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal Fixed Header (Pills + Close Button) */}
            <div className="flex items-center justify-between gap-2 p-3.5 sm:p-4 border-b border-pink-100 bg-pink-50/50 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-amber-800 font-black text-xs px-3 py-1 rounded-full bg-amber-100 border border-amber-300 flex items-center gap-1 shadow-xs">
                  <MapPin size={13} className="text-amber-600" />
                  <span>{isEn ? selectedPlace.distanceEn : selectedPlace.distanceMr}</span>
                </span>
                {selectedPlace.isSeniorFriendly ? (
                  <span className="text-emerald-800 font-black text-xs px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 shadow-xs">
                    👴 {isEn ? "Senior Friendly" : "ज्येष्ठांसाठी सुलभ"}
                  </span>
                ) : (
                  <span className="text-amber-900 font-black text-xs px-3 py-1 rounded-full bg-amber-100 border border-amber-300 shadow-xs">
                    🧗 {isEn ? "Steps" : "पायऱ्यांचा मार्ग"}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedPlace(null)}
                className="size-8 sm:size-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-rose-100 hover:text-rose-700 transition font-black cursor-pointer shadow-md shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="as-sangli-modal-body flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Image with Title */}
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-pink-100 shadow-md shrink-0">
                <img
                  src={selectedPlace.image}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 text-xl sm:text-2xl font-black text-white drop-shadow-md leading-tight">
                  {isEn ? selectedPlace.titleEn : selectedPlace.titleMr}
                </h3>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm font-extrabold text-slate-700 leading-relaxed">
                {formatWithPinkAnandshala(isEn ? selectedPlace.fullDescEn : selectedPlace.fullDescMr)}
              </p>

              {/* Highlights Box */}
              <div className="space-y-2 bg-pink-50/90 p-4 rounded-2xl border border-pink-200/80 shadow-xs">
                <div className="text-xs uppercase font-black tracking-wider text-pink-700 mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-pink-600" />
                  <span>{isEn ? "Key Highlights:" : "प्रमुख वैशिष्ट्ये:"}</span>
                </div>
                {(isEn ? selectedPlace.highlightsEn : selectedPlace.highlightsMr).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{formatWithPinkAnandshala(h)}</span>
                  </div>
                ))}
              </div>

              {/* Call Button */}
              <div className="pt-2 pb-2">
                <a
                  href="tel:9370237633"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-[1.01]"
                >
                  <PhoneCall size={16} />
                  <span>{isEn ? "Inquire Transportation" : "माहितीसाठी कॉल करा (९३७०२३७६३३)"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}

export default AboutSangli;
