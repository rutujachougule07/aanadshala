import { motion } from "framer-motion";
import {
  HeartPulse,
  Utensils,
  BedDouble,
  ShieldCheck,
  Flower2,
  Activity,
} from "lucide-react";

const facilities = [
  {
    icon: HeartPulse,
    title: "आरोग्य सेवा",
    desc: "२४x७ आरोग्य तपासणी, डॉक्टर भेट, औषध व्यवस्थापन आणि नियमित आरोग्य देखभाल.",
    color: "from-pink-400 to-rose-400",
  },
  {
    icon: BedDouble,
    title: "आरामदायी निवास",
    desc: "प्रशस्त, स्वच्छ व सुरक्षित खोल्या ज्येष्ठ नागरिकांच्या आरामासाठी.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Utensils,
    title: "पौष्टिक आहार",
    desc: "तज्ञांच्या मार्गदर्शनाखाली तयार केलेला पौष्टिक व संतुलित आहार.",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: Flower2,
    title: "योग व ध्यान",
    desc: "मनःशांती व निरोगी आयुष्यासाठी योग, ध्यान व अध्यात्मिक उपक्रम.",
    color: "from-orange-400 to-pink-400",
  },
  {
    icon: Activity,
    title: "मनोरंजन",
    desc: "सांस्कृतिक कार्यक्रम, खेळ, वाचनालय, संगीत आणि सहली.",
    color: "from-green-400 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "२४x७ सुरक्षा",
    desc: "सीसीटीव्ही, सुरक्षा कर्मचारी आणि सुरक्षित परिसर.",
    color: "from-sky-500 to-indigo-500",
  },
];

export default function Facilities() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-pink-50 via-white to-blue-50 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute -left-20 top-0 w-80 h-80 bg-pink-300 rounded-full blur-[120px] opacity-20" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-300 rounded-full blur-[150px] opacity-20" />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-pink-100 text-pink-400 font-semibold">
            आमच्या सुविधा
          </span>

          <h2 className="text-5xl font-black mt-6 leading-tight">
            ज्येष्ठांसाठी
            <span className="bg-gradient-to-r from-pink-400 to-blue-600 bg-clip-text text-transparent">
              {" "}संपूर्ण काळजी
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            सुरक्षितता, आरोग्य, प्रेम आणि आनंद या सर्व गोष्टींचा
            समतोल साधणाऱ्या आधुनिक सुविधा.
          </p>
        </motion.div>

        {/* ── ALL 6 FACILITY CARDS ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {facilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-white rounded-[32px] shadow-xl p-8 border border-pink-100 transition-all"
              >
                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <Icon size={36} />
                </div>

                <h3 className="text-2xl font-bold mt-7">{item.title}</h3>

                <p className="text-gray-600 leading-8 mt-4">{item.desc}</p>

                <button className="mt-8 text-pink-400 font-semibold hover:translate-x-2 transition inline-flex items-center gap-1">
                  अधिक माहिती →
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
        >
          {[
            { number: "20+", label: "वर्षांचा अनुभव" },
            { number: "2000+", label: "ज्येष्ठ नागरिक" },
            { number: "24x7", label: "आरोग्य सेवा" },
            { number: "365", label: "आनंदाचे दिवस" },
          ].map((item, index) => (
            <motion.div
              whileHover={{ y: -8 }}
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 text-center border border-pink-100"
            >
              <h2 className="text-4xl font-black bg-gradient-to-r from-pink-400 to-blue-600 bg-clip-text text-transparent">
                {item.number}
              </h2>
              <p className="mt-3 text-gray-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] mt-24"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-blue-600" />
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full text-white font-semibold">
                ❤️ प्रेम • सेवा • सन्मान
              </span>

              <h2 className="text-4xl lg:text-5xl font-black text-white mt-6 leading-tight">
                प्रत्येक ज्येष्ठासाठी
                <br />
                आनंदी आणि सुरक्षित जीवन
              </h2>

              <p className="mt-6 text-white/90 text-lg leading-8 max-w-2xl">
                प्रीतम ज्येष्ठ नागरिक आनंदशाळा ही केवळ निवासस्थान नाही,
                तर प्रेम, सन्मान, सुरक्षितता, आरोग्य आणि आनंद देणारे दुसरे घर आहे.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <a
                href="tel:+919370237633"
                className="bg-white text-pink-400 font-bold rounded-full px-10 py-5 shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                संपर्क साधा →
              </a>

              <button className="border-2 border-white rounded-full px-10 py-5 text-white font-semibold hover:bg-white hover:text-pink-400 transition">
                अधिक जाणून घ्या
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
