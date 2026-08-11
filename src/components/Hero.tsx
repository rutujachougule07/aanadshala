import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  Users,
  ArrowRight,
  Phone,
  Award,
} from "lucide-react";

// Use the existing building image from assets
import building from "../assets/preetam-building.jpg";

const stats = [
  { value: "2000+", label: "ज्येष्ठ नागरिक" },
  { value: "20+", label: "वर्षांचा अनुभव" },
  { value: "1.5+", label: "एकर परिसर" },
  { value: "24x7", label: "सेवा" },
];

const features = [
  {
    icon: Heart,
    title: "प्रेम",
    color: "from-pink-400 to-rose-400",
  },
  {
    icon: ShieldCheck,
    title: "सुरक्षितता",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Users,
    title: "कुटुंब",
    color: "from-violet-500 to-indigo-500",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-blue-50 pt-36 pb-24">

      {/* Background blobs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-pink-300 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[150px] opacity-25" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-400 font-semibold mb-8">
            ❤️ प्रेम • सेवा • सन्मान
          </span>

          <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
            ज्येष्ठांचा
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
              सन्मान,
            </span>
            <br />
            आनंददायी जीवन!
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-600 max-w-xl">
            प्रीतम ज्येष्ठ नागरिक आनंदशाळा ही ज्येष्ठांसाठी प्रेम, सुरक्षितता,
            आरोग्य, सहवास आणि आनंदाने भरलेले आयुष्य देणारे दुसरे घर आहे.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 mt-10">
            <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 to-blue-500 text-white font-semibold shadow-xl hover:scale-105 transition">
              <span className="flex items-center gap-2">
                अधिक जाणून घ्या
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </span>
            </button>

            <a
              href="tel:+919370237633"
              className="px-8 py-4 rounded-full border-2 border-pink-400 text-pink-400 font-semibold hover:bg-pink-50 transition"
            >
              <span className="flex items-center gap-2">
                <Phone size={18} />
                संपर्क साधा
              </span>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-5 mt-14">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="rounded-3xl bg-white shadow-xl p-6 text-center cursor-pointer"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4`}
                >
                  <item.icon size={30} />
                </div>
                <h3 className="font-bold text-gray-700">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Image */}
          <div className="rounded-[45px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.18)]">
            <img
              src={building}
              alt="प्रीतम ज्येष्ठ नागरिक आनंदशाळा - Preetam Senior Citizen Campus"
              className="w-full h-[650px] object-cover"
            />
          </div>

          {/* Floating Stats Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-10 top-12 bg-white rounded-3xl shadow-2xl p-7 w-72"
          >
            <h3 className="font-bold text-xl mb-5">आनंदशाळेचा प्रवास</h3>
            <div className="space-y-5">
              {stats.map((item, i) => (
                <div key={i} className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-bold text-pink-400">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Award Card */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -bottom-10 right-0 bg-gradient-to-r from-pink-400 to-blue-500 text-white rounded-3xl shadow-xl p-6 flex gap-4 items-center"
          >
            <Award size={40} />
            <div>
              <h4 className="font-bold text-lg">विश्वासाची परंपरा</h4>
              <p className="text-sm opacity-90">20+ वर्षांचा अनुभव</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
