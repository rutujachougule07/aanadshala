import { motion } from "framer-motion";
import {
  HeartHandshake,
  Building2,
  Users,
} from "lucide-react";

// Using existing public images (served via /images/ URL path)
const about1 = "/images/aandshala sahal 1.jpeg";
const about2 = "/images/aandmelava1.jpg";
const about3 = "/images/aandmelava 6.jpg";

export default function About() {
  return (
    <section className="relative py-28 overflow-hidden bg-white">

      {/* Background Blur */}
      <div className="absolute -left-32 top-20 w-80 h-80 rounded-full bg-pink-200 blur-[120px] opacity-30" />
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-200 blur-[140px] opacity-30" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── LEFT IMAGES ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">

              {/* Image 1 — tall */}
              <img
                src={about1}
                alt="आनंदशाळा परिसर"
                className="rounded-[35px] shadow-2xl h-[420px] w-full object-cover"
              />

              {/* Images 2 & 3 — stacked */}
              <div className="space-y-6">
                <img
                  src={about2}
                  alt="ज्येष्ठ नागरिक मेळावा"
                  className="rounded-[30px] shadow-xl h-[200px] w-full object-cover"
                />
                <img
                  src={about3}
                  alt="आनंदशाळा उपक्रम"
                  className="rounded-[30px] shadow-xl h-[200px] w-full object-cover"
                />
              </div>

            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-10 left-10 bg-white rounded-3xl shadow-2xl p-6 flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <HeartHandshake size={30} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">प्रेमाने सेवा</h3>
                <p className="text-gray-500">प्रत्येक दिवस आनंदाचा</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-pink-100 text-pink-400 font-semibold">
              आमच्याबद्दल
            </span>

            <h2 className="text-5xl font-black text-gray-900 mt-6 leading-tight">
              प्रेम,{" "}
              <span className="bg-gradient-to-r from-pink-400 to-blue-600 bg-clip-text text-transparent">
                सन्मान
              </span>
              <br />
              आणि आनंदाने भरलेले
              <br />
              दुसरे घर.
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-9">
              प्रीतम ज्येष्ठ नागरिक आनंदशाळा ही केवळ निवासस्थान नसून,
              प्रेम, सुरक्षितता, आरोग्य, सन्मान आणि आनंद देणारे कुटुंब आहे.
              येथे प्रत्येक ज्येष्ठ व्यक्ती आपल्या घरासारखा अनुभव घेतो.
            </p>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-5 mt-12">

              <div className="bg-pink-50 rounded-3xl p-6">
                <Building2 className="text-pink-400" size={36} />
                <h3 className="text-3xl font-bold mt-4">20+</h3>
                <p className="text-gray-500">वर्षांचा अनुभव</p>
              </div>

              <div className="bg-blue-50 rounded-3xl p-6">
                <Users className="text-blue-600" size={36} />
                <h3 className="text-3xl font-bold mt-4">2000+</h3>
                <p className="text-gray-500">लाभार्थी</p>
              </div>

              <div className="bg-violet-50 rounded-3xl p-6">
                <HeartHandshake className="text-violet-600" size={36} />
                <h3 className="text-3xl font-bold mt-4">24x7</h3>
                <p className="text-gray-500">सेवा</p>
              </div>

            </div>

            {/* Why Choose Us */}
            <div className="grid md:grid-cols-2 gap-6 mt-14">

              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center text-white">
                  <HeartHandshake size={30} />
                </div>
                <h3 className="text-2xl font-bold mt-5">प्रेमळ वातावरण</h3>
                <p className="text-gray-600 mt-3 leading-8">
                  प्रत्येक ज्येष्ठ नागरिकाला आपल्या घरासारखा अनुभव मिळावा
                  यासाठी प्रेमाने आणि आदराने सेवा दिली जाते.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white">
                  <Building2 size={30} />
                </div>
                <h3 className="text-2xl font-bold mt-5">आधुनिक सुविधा</h3>
                <p className="text-gray-600 mt-3 leading-8">
                  प्रशस्त खोल्या, आरोग्य सेवा, पौष्टिक आहार, स्वच्छ परिसर,
                  मनोरंजन व सुरक्षित वातावरण.
                </p>
              </motion.div>

            </div>

            {/* Large CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-14 rounded-[40px] overflow-hidden bg-gradient-to-r from-pink-400 via-fuchsia-500 to-blue-500 p-10 text-white shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div>
                  <h2 className="text-4xl font-black">
                    एक नवीन कुटुंब...<br />
                    एक आनंदी आयुष्य...
                  </h2>
                  <p className="mt-5 text-lg opacity-90 max-w-2xl">
                    प्रेम, सुरक्षितता, सन्मान आणि आनंदाने भरलेले जीवन
                    अनुभवण्यासाठी आजच आमच्याशी संपर्क साधा.
                  </p>
                </div>
                <a
                  href="tel:+919370237633"
                  className="bg-white text-pink-400 font-bold px-10 py-5 rounded-full hover:scale-105 transition shadow-xl whitespace-nowrap"
                >
                  संपर्क साधा →
                </a>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
