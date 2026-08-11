export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
  color: string;
  side: "left" | "right";
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "प्रतिष्ठा व्यवस्था",
    date: "26 जानेवारी 2000",
    description:
      "श्री. अभिनव जगन्नाथ कामाणी यांच्या संकल्पनेतून आनंदशाळेची पायाभरणी झाली.",
    icon: "❤️",
    color: "#ff2d7a",
    side: "left",
  },
  {
    id: 2,
    title: "आनंद मेळावा",
    date: "15 ऑगस्ट 2023",
    description:
      "ज्येष्ठ नागरिकांसाठी आनंद, आरोग्य आणि सामाजिक सहभाग वाढवणारा उपक्रम.",
    icon: "👥",
    color: "#3B82F6",
    side: "right",
  },
  {
    id: 3,
    title: "नवीन सुविधा",
    date: "09 जानेवारी 2025",
    description:
      "अधिक सुविधा, उत्तम निवास आणि आधुनिक सेवा उपलब्ध.",
    icon: "🏢",
    color: "#F59E0B",
    side: "left",
  },
  {
    id: 4,
    title: "नवीन पर्व",
    date: "2025+",
    description:
      "मुंबई आणि कोल्हापूरमध्ये विस्तारासह नव्या प्रवासाची सुरुवात.",
    icon: "🚀",
    color: "#22C55E",
    side: "right",
  },
];
