export interface TimelineItem {
  id: number;
  side: "left" | "right";
  color: string;
  icon: string;
  year: string;
  title: string;
  description: string;
  date?: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    side: "left",
    color: "#EC4899",
    icon: "❤️",
    year: "26 जानेवारी 2000",
    date: "26 जानेवारी 2000",
    title: "आनंदशाळेची स्थापना",
    description:
      "प्रेम, विश्वास आणि सेवाभाव या तत्त्वांवर प्रीतम ज्येष्ठ नागरिक आनंदशाळेची स्थापना करण्यात आली. ज्येष्ठ नागरिकांना आनंदी, सुरक्षित आणि सन्मानपूर्वक जीवन देण्याचा हा पहिला टप्पा होता.",
  },
  {
    id: 2,
    side: "right",
    color: "#3B82F6",
    icon: "👥",
    year: "2010",
    date: "2010",
    title: "आनंद मेळावा",
    description:
      "ज्येष्ठ नागरिकांसाठी सांस्कृतिक कार्यक्रम, आरोग्य शिबिरे आणि सामाजिक उपक्रम नियमितपणे आयोजित करण्यास सुरुवात झाली.",
  },
  {
    id: 3,
    side: "left",
    color: "#F59E0B",
    icon: "🏢",
    year: "2018",
    date: "2018",
    title: "नवीन इमारत",
    description:
      "अधिक सुविधा, प्रशस्त निवास, वैद्यकीय सेवा आणि आधुनिक पायाभूत सुविधांसह नवीन इमारतीचे उद्घाटन करण्यात आले.",
  },
  {
    id: 4,
    side: "right",
    color: "#22C55E",
    icon: "🌱",
    year: "2022",
    date: "2022",
    title: "सेवेचा विस्तार",
    description:
      "अधिक ज्येष्ठ नागरिकांपर्यंत सेवा पोहोचवण्यासाठी विविध सामाजिक संस्थांबरोबर सहकार्य सुरू केले.",
  },
  {
    id: 5,
    side: "left",
    color: "#8B5CF6",
    icon: "🚀",
    year: "2025",
    date: "2025",
    title: "नवीन पर्व",
    description:
      "डिजिटल सुविधा, आधुनिक आरोग्य सेवा आणि नवीन प्रकल्पांसह आनंदशाळेच्या नव्या पर्वाची सुरुवात.",
  },
];

export const journeyData = timelineData;
