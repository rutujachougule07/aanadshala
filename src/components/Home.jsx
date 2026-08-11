import React, { useState, useEffect } from "react";
import { FaGlobe, FaUniversity, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AnandshalaStory from "./AnandshalaStory";
import JourneySection from "./journey/JourneySection";

import "swiper/css";
import "swiper/css/navigation";

const Home = () => {
  const { ref: facilitiesRef, inView: facilitiesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: activitiesRef, inView: activitiesInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: storyRef, inView: storyInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const categories = [
    "Ã Â¤Â¸Ã Â¤Â°Ã Â¥ÂÃ Â¤Âµ",
    "Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢ Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¤Â¾",
    "Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦ Ã Â¤Â®Ã Â¥â€¡Ã Â¤Â³Ã Â¤Â¾Ã Â¤ÂµÃ Â¤Â¾",
    "Ã Â¤Â­Ã Â¥â€šÃ Â¤Â®Ã Â¤Â¿Ã Â¤ÂªÃ Â¥â€šÃ Â¤Å“Ã Â¤Â¨",
    "Ã Â¤Â¬Ã Â¤Â¾Ã Â¤â€šÃ Â¤Â§Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â®",
    "Ã Â¤Â¸Ã Â¤Â¾Ã Â¤Â®Ã Â¤Â¾Ã Â¤Å“Ã Â¤Â¿Ã Â¤â€¢ Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â°Ã Â¥ÂÃ Â¤Â¯",
    "Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â°Ã Â¥ÂÃ Â¤Â·Ã Â¤Â¿Ã Â¤â€¢ Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â¨Ã Â¥â€¡Ã Â¤Â¹Ã Â¤Â¸Ã Â¤â€šÃ Â¤Â®Ã Â¥â€¡Ã Â¤Â²Ã Â¤Â¨",
    "Ã Â¤Â®Ã Â¤Â¾Ã Â¤Â¨Ã Â¥ÂÃ Â¤Â¯Ã Â¤ÂµÃ Â¤Â° Ã Â¤Â­Ã Â¥â€¡Ã Â¤Å¸",
    "Ã Â¤ÂµÃ Â¤Â¿Ã Â¤Â¶Ã Â¥â€¡Ã Â¤Â· Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â°Ã Â¥ÂÃ Â¤Â¯Ã Â¤â€¢Ã Â¥ÂÃ Â¤Â°Ã Â¤Â®",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Ã Â¤Â¸Ã Â¤Â°Ã Â¥ÂÃ Â¤Âµ");

  return (
    <div className="min-h-screen bg-[#EEF3FF]">
      {/* ================= Navbar ================= */}

      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1700px] mx-auto px-8 h-24 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              onError={(e) => {
                e.currentTarget.src =
                  "https://d3k88l35vy59af.cloudfront.net/A42/9336/1760175180579.png";
              }}
              alt="logo"
              className="w-16 h-16 object-contain"
            />

            <div>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#17286E] leading-none">
                Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¥â‚¬Ã Â¤Â¤Ã Â¤Â® Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢ Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¤Â¾
              </h2>

              <p className="uppercase tracking-[6px] text-[#17286E] font-semibold mt-2 text-xs sm:text-sm">
                Sangli Ã¢â‚¬Â¢ Maharashtra
              </p>
            </div>
          </div>

          {/* Menu */}

          <ul className="hidden lg:flex items-center gap-14 font-semibold text-[20px]">

            <li className="text-pink-400 relative cursor-pointer">
              Ã Â¤Â®Ã Â¥ÂÃ Â¤â€“Ã Â¥ÂÃ Â¤Â¯Ã Â¤ÂªÃ Â¥Æ’Ã Â¤Â·Ã Â¥ÂÃ Â¤Â 

              <div className="absolute left-0 -bottom-3 w-full h-1 rounded-full bg-pink-400"></div>
            </li>

            <li className="hover:text-pink-400 duration-300 cursor-pointer">
              Ã Â¤â€ Ã Â¤Â®Ã Â¤Å¡Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾Ã Â¤ÂµÃ Â¤Â¿Ã Â¤Â·Ã Â¤Â¯Ã Â¥â‚¬
            </li>

            <li className="hover:text-pink-400 duration-300 cursor-pointer">
              Ã Â¤Â®Ã Â¤Â¾Ã Â¤Â¹Ã Â¤Â¿Ã Â¤Â¤Ã Â¥â‚¬ Ã Â¤ÂªÃ Â¤Â¤Ã Â¥ÂÃ Â¤Â°Ã Â¤â€¢
            </li>

            <li className="hover:text-pink-400 duration-300 cursor-pointer">
              Ã Â¤â€”Ã Â¥â€¦Ã Â¤Â²Ã Â¤Â°Ã Â¥â‚¬
            </li>

            <li className="hover:text-pink-400 duration-300 cursor-pointer">
              Ã Â¤Â¸Ã Â¤â€šÃ Â¤ÂªÃ Â¤Â°Ã Â¥ÂÃ Â¤â€¢
            </li>

          </ul>

          {/* Right Side */}

          <div className="flex items-center gap-6">

            {/* Language */}

            <button className="flex items-center gap-3 px-7 py-4 rounded-full border bg-white shadow hover:bg-gray-50 transition cursor-pointer">

              <FaGlobe className="text-pink-400 text-xl" />

              <span className="font-semibold text-gray-800">
                Ã Â¤Â®Ã Â¤Â°Ã Â¤Â¾Ã Â¤Â Ã Â¥â‚¬ | ENG
              </span>

            </button>

            {/* Admission */}

            <a
              href="tel:9370237633"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-pink-400 to-purple-700 hover:scale-105 duration-300 shadow-lg cursor-pointer text-decoration-none"
            >

              <FaUniversity className="text-xl" />

              Ã Â¤â€ Ã Â¤Å“Ã Â¤Å¡ Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¤ÂµÃ Â¥â€¡Ã Â¤Â¶ Ã Â¤ËœÃ Â¥ÂÃ Â¤Â¯Ã Â¤Â¾

            </a>

          </div>

        </div>
      </nav>

      {/* ================= Hero Section ================= */}

      <section className="max-w-[1700px] mx-auto mt-8 px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Card */}

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-[35px] p-10 shadow-lg border border-gray-100 flex flex-col justify-between"
          >

            {/* Badge */}

            <div className="inline-flex items-center gap-3 bg-[#FFF7F8] border border-pink-100 rounded-full px-6 py-3 shadow-sm w-fit">

              <span className="text-orange-500 text-xl">Ã¢Â­Â</span>

              <p className="text-pink-400 font-semibold text-sm sm:text-base">
                Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¥â‚¬Ã Â¤Â¤Ã Â¤Â® Ã¢â‚¬Â¢ Ã Â¤Â­Ã Â¤Â¾Ã Â¤Â°Ã Â¤Â¤Ã Â¤Â¾Ã Â¤Â¤Ã Â¥â‚¬Ã Â¤Â² Ã Â¤ÂªÃ Â¤Â¹Ã Â¤Â¿Ã Â¤Â²Ã Â¥â‚¬ Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢ Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¤Â¾ Ã¢â‚¬Â¢ Ã Â¤Â¸Ã Â¤Â¾Ã Â¤â€šÃ Â¤â€”Ã Â¤Â²Ã Â¥â‚¬
              </p>

            </div>

            {/* Heading */}

            <div className="mt-8">

              <h1 className="text-[44px] sm:text-[64px] leading-[54px] sm:leading-[74px] font-extrabold text-[#17286E]">
                Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¥â‚¬Ã Â¤Â¤Ã Â¤Â® Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢
              </h1>

              <h1 className="text-[44px] sm:text-[64px] leading-[54px] sm:leading-[74px] font-extrabold text-[#FF2D75]">
                Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¤Â¾
              </h1>

            </div>

            {/* Description */}

            <p className="mt-6 text-[20px] sm:text-[24px] leading-[36px] sm:leading-[42px] text-gray-600 max-w-xl">
              Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢Ã Â¤Â¾Ã Â¤â€šÃ Â¤Å¡Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾ Ã Â¤Â¨Ã Â¤Â¿Ã Â¤Â°Ã Â¥â€¹Ã Â¤â€”Ã Â¥â‚¬ Ã Â¤â€ Ã Â¤Â°Ã Â¥â€¹Ã Â¤â€”Ã Â¥ÂÃ Â¤Â¯ Ã Â¤Âµ Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¦Ã Â¤Â¾Ã Â¤Â¯Ã Â¥â‚¬
              Ã Â¤â€ Ã Â¤Â¯Ã Â¥ÂÃ Â¤Â·Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾Ã Â¤Â¸Ã Â¤Â¾Ã Â¤Â Ã Â¥â‚¬ Ã Â¤Â¦Ã Â¤Â¾Ã Â¤Â° Ã Â¤Â¯Ã Â¥â€¡Ã Â¤Â¥Ã Â¥â€¡Ã Â¤Å¡ Ã Â¤â€°Ã Â¤ËœÃ Â¤Â¡Ã Â¤Â¤Ã Â¥â€¡...
            </p>

            {/* Divider */}

            <div className="relative mt-8">

              <div className="h-[1px] bg-gray-200"></div>

              <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-400 text-xl shadow">
                Ã¢â„¢Â¡
              </div>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">

              {/* Card 1 */}

              <motion.div
                whileHover={{ y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-xl cursor-pointer"
              >

                <div className="text-4xl">Ã°Å¸â€˜Â¨Ã¢â‚¬ÂÃ°Å¸â€˜Â©Ã¢â‚¬ÂÃ°Å¸â€˜Â§</div>

                <h3 className="font-bold text-[#17286E] mt-4 text-2xl">
                  <CountUp end={500} duration={4} enableScrollSpy={true} scrollSpyOnce={true} />+
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¥â‚¬ Ã Â¤Â¸Ã Â¤Â¦Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â¯ Ã Â¤ÂªÃ Â¤Â°Ã Â¤Â¿Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â°
                </p>

              </motion.div>

              {/* Card 2 */}

              <motion.div
                whileHover={{ y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-xl cursor-pointer"
              >

                <div className="text-4xl">Ã°Å¸â€œâ€¦</div>

                <h3 className="font-bold text-[#17286E] mt-4 text-2xl">
                  <CountUp end={26} duration={3} enableScrollSpy={true} scrollSpyOnce={true} />, <CountUp end={27} duration={3} enableScrollSpy={true} scrollSpyOnce={true} />, <CountUp end={28} duration={3} enableScrollSpy={true} scrollSpyOnce={true} />
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Ã Â¤Å“Ã Â¤Â¾Ã Â¤Â¨Ã Â¥â€¡Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â°Ã Â¥â‚¬ 2026
                </p>

              </motion.div>

              {/* Card 3 */}

              <motion.div
                whileHover={{ y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-xl cursor-pointer"
              >

                <div className="text-4xl">Ã°Å¸â€¢â€™</div>

                <h3 className="font-bold text-[#17286E] mt-4 text-xl">
                  <CountUp end={11} duration={3} enableScrollSpy={true} scrollSpyOnce={true} /> Ã Â¤Â¤Ã Â¥â€¡ <CountUp end={5} duration={3} enableScrollSpy={true} scrollSpyOnce={true} />
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Ã Â¤Â­Ã Â¥â€¡Ã Â¤Å¸ Ã Â¤ÂµÃ Â¥â€¡Ã Â¤Â³
                </p>

              </motion.div>

              {/* Card 4 */}

              <motion.div
                whileHover={{ y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-xl cursor-pointer"
              >

                <div className="text-4xl">Ã°Å¸â€ºÂ¡Ã¯Â¸Â</div>

                <h3 className="font-bold text-[#17286E] mt-4 text-xl">
                  <CountUp end={100} duration={3} enableScrollSpy={true} scrollSpyOnce={true} />% Ã Â¤Â¸Ã Â¥ÂÃ Â¤Â°Ã Â¤â€¢Ã Â¥ÂÃ Â¤Â·Ã Â¤Â¿Ã Â¤Â¤
                </h3>

                <p className="text-gray-500 mt-2 text-sm">
                  Ã Â¤â€ Ã Â¤Â°Ã Â¥â€¹Ã Â¤â€”Ã Â¥ÂÃ Â¤Â¯ Ã Â¤Â¸Ã Â¥â€¡Ã Â¤ÂµÃ Â¤Â¾
                </p>

              </motion.div>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap items-center gap-6 mt-8">

              <a
                href="tel:9370237633"
                className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-400 to-purple-700 text-white font-bold text-lg shadow-lg hover:scale-105 duration-300 text-decoration-none"
              >
                Ã°Å¸â€œÅ¾ Ã Â¤â€ Ã Â¤Å“Ã Â¤Å¡ Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¤ÂµÃ Â¥â€¡Ã Â¤Â¶ Ã Â¤ËœÃ Â¥ÂÃ Â¤Â¯Ã Â¤Â¾
              </a>

              <a
                href="#sections"
                className="px-10 py-5 rounded-full border-2 border-[#17286E] text-[#17286E] font-bold text-lg hover:bg-[#17286E] hover:text-white duration-300 text-decoration-none"
              >
                Ã Â¤ÂµÃ Â¤Â¿Ã Â¤Â­Ã Â¤Â¾Ã Â¤â€” Ã Â¤Â¨Ã Â¤Â¿Ã Â¤ÂµÃ Â¤Â¡Ã Â¤Â¾ Ã¢â€ â€™
              </a>

            </div>

          </motion.div>

          {/* Right Side Swiper Container */}

          <div className="relative rounded-[35px] overflow-hidden shadow-2xl h-[780px]">

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{
                delay: 3000,
              }}
              loop={true}
              className="h-full"
            >

              {/* Slide 1 */}

              <SwiperSlide>

                <div className="relative h-full">

                  <img
                    src="/images/hero1.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/images/aandshala_img.png";
                    }}
                    alt="Hero 1"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                  {/* Slide Number */}

                  <div className="absolute top-8 right-8 bg-white text-[#0F2F8E] rounded-full px-5 py-2 font-bold shadow z-10">

                    1 / 6

                  </div>

                  {/* Bottom Text */}

                  <div className="absolute bottom-32 left-10 z-10">

                    <h2 className="text-white text-5xl font-bold">

                      Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¾Ã Â¤Â¨Ã Â¥â€¡ Ã Â¤Å“Ã Â¤â€”Ã Â¥â€šÃ Â¤Â¯Ã Â¤Â¾

                    </h2>

                    <p className="text-white mt-4 text-xl">

                      Learn Ã¢â‚¬Â¢ Laugh Ã¢â‚¬Â¢ Live

                    </p>

                  </div>

                </div>

              </SwiperSlide>

              {/* Slide 2 */}

              <SwiperSlide>

                <div className="relative h-full">

                  <img
                    src="/images/hero2.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/images/aandmelav 10.jpeg";
                    }}
                    alt="Hero 2"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                  <div className="absolute top-8 right-8 bg-white text-[#0F2F8E] rounded-full px-5 py-2 font-bold z-10">

                    2 / 6

                  </div>

                  <div className="absolute bottom-32 left-10 z-10">

                    <h2 className="text-white text-5xl font-bold">

                      Active Senior Life

                    </h2>

                    <p className="text-white mt-4 text-xl">

                      Health Ã¢â‚¬Â¢ Fun Ã¢â‚¬Â¢ Family

                    </p>

                  </div>

                </div>

              </SwiperSlide>

              {/* Slide 3 */}

              <SwiperSlide>

                <div className="relative h-full">

                  <img
                    src="/images/hero3.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/images/aandshala sahal 1.jpeg";
                    }}
                    alt="Hero 3"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                  <div className="absolute top-8 right-8 bg-white text-[#0F2F8E] rounded-full px-5 py-2 font-bold z-10">

                    3 / 6

                  </div>

                  <div className="absolute bottom-32 left-10 z-10">

                    <h2 className="text-white text-5xl font-bold">

                      Healthy Lifestyle

                    </h2>

                  </div>

                </div>

              </SwiperSlide>

            </Swiper>

            {/* Bottom Blue Card */}

            <div className="absolute bottom-0 left-0 w-full bg-[#0F2F8E] text-white py-7 px-8 flex justify-between items-center z-20">

              <div>

                <h3 className="font-bold text-2xl">

                  Facilities Available

                </h3>

                <p className="text-blue-100 mt-2">

                  Yoga Ã¢â‚¬Â¢ Meditation Ã¢â‚¬Â¢ Music Ã¢â‚¬Â¢ Games

                </p>

              </div>

              <button className="bg-white text-[#0F2F8E] px-7 py-3 rounded-full font-bold shadow hover:bg-gray-100 transition cursor-pointer">

                Explore Ã¢â€ â€™

              </button>

            </div>

          </div>

        </div>
      </section>

      {/* ================= Facilities Section ================= */}

      <motion.section
        ref={facilitiesRef}
        initial={{ opacity: 0, y: 100 }}
        animate={facilitiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-[1700px] mx-auto px-8 mt-16 mb-20"
      >

        {/* Heading */}

        <div className="flex justify-between items-center mb-10">

          <div>
            <p className="text-pink-400 font-semibold uppercase tracking-widest">
              OUR FACILITIES
            </p>

            <h2 className="text-5xl font-extrabold text-[#17286E] mt-3">
              Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¥â€¡Ã Â¤Â¤Ã Â¥â‚¬Ã Â¤Â² Ã Â¤Â¸Ã Â¥ÂÃ Â¤ÂµÃ Â¤Â¿Ã Â¤Â§Ã Â¤Â¾
            </h2>
          </div>

          <button className="px-8 py-4 rounded-full bg-[#17286E] text-white font-semibold hover:bg-pink-400 duration-300 cursor-pointer">
            Ã Â¤Â¸Ã Â¤Â°Ã Â¥ÂÃ Â¤Âµ Ã Â¤ÂªÃ Â¤Â¹Ã Â¤Â¾ Ã¢â€ â€™
          </button>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}

          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg group hover:-translate-y-3 duration-300">

            <img
              src="/images/yoga.jpg"
              onError={(e) => {
                e.currentTarget.src = "/images/Screenshot 2026-07-31 103659.png";
              }}
              alt="Ã Â¤Â¯Ã Â¥â€¹Ã Â¤â€”Ã Â¤Â¾ Ã Â¤â€¢Ã Â¥ÂÃ Â¤Â²Ã Â¤Â¾Ã Â¤Â¸"
              className="w-full h-64 object-cover group-hover:scale-110 duration-500"
            />

            <div className="p-7">

              <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-3xl">
                Ã°Å¸Â§Ëœ
              </div>

              <h3 className="text-2xl font-bold text-[#17286E] mt-5">
                Ã Â¤Â¯Ã Â¥â€¹Ã Â¤â€”Ã Â¤Â¾ Ã Â¤â€¢Ã Â¥ÂÃ Â¤Â²Ã Â¤Â¾Ã Â¤Â¸
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Ã Â¤Â¦Ã Â¤Â°Ã Â¤Â°Ã Â¥â€¹Ã Â¤Å“ Ã Â¤Â¸Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â³Ã Â¥â‚¬ Ã Â¤â€ Ã Â¤Â£Ã Â¤Â¿ Ã Â¤Â¸Ã Â¤â€šÃ Â¤Â§Ã Â¥ÂÃ Â¤Â¯Ã Â¤Â¾Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â³Ã Â¥â‚¬ Ã Â¤Â¯Ã Â¥â€¹Ã Â¤â€”Ã Â¤Â¾ Ã Â¤Âµ Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¤Â¾Ã Â¤Â£Ã Â¤Â¾Ã Â¤Â¯Ã Â¤Â¾Ã Â¤Â®.
              </p>

            </div>

          </div>

          {/* Card 2 */}

          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg group hover:-translate-y-3 duration-300">

            <img
              src="/images/music.jpg"
              onError={(e) => {
                e.currentTarget.src = "/images/aandmelav 10.jpeg";
              }}
              alt="Ã Â¤Â¸Ã Â¤â€šÃ Â¤â€”Ã Â¥â‚¬Ã Â¤Â¤ Ã Â¤ÂµÃ Â¤Â°Ã Â¥ÂÃ Â¤â€”"
              className="w-full h-64 object-cover group-hover:scale-110 duration-500"
            />

            <div className="p-7">

              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                Ã°Å¸Å½Âµ
              </div>

              <h3 className="text-2xl font-bold text-[#17286E] mt-5">
                Ã Â¤Â¸Ã Â¤â€šÃ Â¤â€”Ã Â¥â‚¬Ã Â¤Â¤ Ã Â¤ÂµÃ Â¤Â°Ã Â¥ÂÃ Â¤â€”
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Ã Â¤â€”Ã Â¤Â¾Ã Â¤Â£Ã Â¥â‚¬, Ã Â¤Â­Ã Â¤Å“Ã Â¤Â¨, Ã Â¤ÂµÃ Â¤Â¾Ã Â¤Â¦Ã Â¥ÂÃ Â¤Â¯ Ã Â¤â€ Ã Â¤Â£Ã Â¤Â¿ Ã Â¤Â¸Ã Â¤Â¾Ã Â¤â€šÃ Â¤Â¸Ã Â¥ÂÃ Â¤â€¢Ã Â¥Æ’Ã Â¤Â¤Ã Â¤Â¿Ã Â¤â€¢ Ã Â¤â€¢Ã Â¤Â¾Ã Â¤Â°Ã Â¥ÂÃ Â¤Â¯Ã Â¤â€¢Ã Â¥ÂÃ Â¤Â°Ã Â¤Â®.
              </p>

            </div>

          </div>

          {/* Card 3 */}

          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg group hover:-translate-y-3 duration-300">

            <img
              src="/images/library.jpg"
              onError={(e) => {
                e.currentTarget.src = "/images/aandshala_img.png";
              }}
              alt="Ã Â¤â€”Ã Â¥ÂÃ Â¤Â°Ã Â¤â€šÃ Â¤Â¥Ã Â¤Â¾Ã Â¤Â²Ã Â¤Â¯"
              className="w-full h-64 object-cover group-hover:scale-110 duration-500"
            />

            <div className="p-7">

              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-3xl">
                Ã°Å¸â€œÅ¡
              </div>

              <h3 className="text-2xl font-bold text-[#17286E] mt-5">
                Ã Â¤â€”Ã Â¥ÂÃ Â¤Â°Ã Â¤â€šÃ Â¤Â¥Ã Â¤Â¾Ã Â¤Â²Ã Â¤Â¯
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Ã Â¤ÂµÃ Â¤Â¿Ã Â¤ÂµÃ Â¤Â¿Ã Â¤Â§ Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â¸Ã Â¥ÂÃ Â¤Â¤Ã Â¤â€¢Ã Â¥â€¡, Ã Â¤ÂµÃ Â¤Â°Ã Â¥ÂÃ Â¤Â¤Ã Â¤Â®Ã Â¤Â¾Ã Â¤Â¨Ã Â¤ÂªÃ Â¤Â¤Ã Â¥ÂÃ Â¤Â°Ã Â¥â€¡ Ã Â¤â€ Ã Â¤Â£Ã Â¤Â¿ Ã Â¤Â®Ã Â¤Â¾Ã Â¤Â¸Ã Â¤Â¿Ã Â¤â€¢Ã Â¥â€¡ Ã Â¤â€°Ã Â¤ÂªÃ Â¤Â²Ã Â¤Â¬Ã Â¥ÂÃ Â¤Â§.
              </p>

            </div>

          </div>

          {/* Card 4 */}

          <div className="bg-white rounded-[30px] overflow-hidden shadow-lg group hover:-translate-y-3 duration-300">

            <img
              src="/images/games.jpg"
              onError={(e) => {
                e.currentTarget.src = "/images/Screenshot 2026-07-31 103517.png";
              }}
              alt="Ã Â¤â€¡Ã Â¤Â¨Ã Â¤Â¡Ã Â¥â€¹Ã Â¤â€¦Ã Â¤Â° Ã Â¤â€”Ã Â¥â€¡Ã Â¤Â®Ã Â¥ÂÃ Â¤Â¸"
              className="w-full h-64 object-cover group-hover:scale-110 duration-500"
            />

            <div className="p-7">

              <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">
                Ã¢â„¢Å¸Ã¯Â¸Â
              </div>

              <h3 className="text-2xl font-bold text-[#17286E] mt-5">
                Ã Â¤â€¡Ã Â¤Â¨Ã Â¤Â¡Ã Â¥â€¹Ã Â¤â€¦Ã Â¤Â° Ã Â¤â€”Ã Â¥â€¡Ã Â¤Â®Ã Â¥ÂÃ Â¤Â¸
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Ã Â¤â€¢Ã Â¥â€¦Ã Â¤Â°Ã Â¤Â®, Ã Â¤Â¬Ã Â¥ÂÃ Â¤Â¦Ã Â¥ÂÃ Â¤Â§Ã Â¤Â¿Ã Â¤Â¬Ã Â¤Â³, Ã Â¤ÂªÃ Â¤Â¤Ã Â¥ÂÃ Â¤Â¤Ã Â¥â€¡ Ã Â¤â€ Ã Â¤Â£Ã Â¤Â¿ Ã Â¤Â®Ã Â¤Â¨Ã Â¥â€¹Ã Â¤Â°Ã Â¤â€šÃ Â¤Å“Ã Â¤Â¨Ã Â¤Â¾Ã Â¤Å¡Ã Â¥â€¡ Ã Â¤ÂµÃ Â¤Â¿Ã Â¤ÂµÃ Â¤Â¿Ã Â¤Â§ Ã Â¤â€“Ã Â¥â€¡Ã Â¤Â³.
              </p>

            </div>

          </div>

        </div>

      </motion.section>

      {/* ================= Activities Section ================= */}

      <motion.section
        ref={activitiesRef}
        initial={{ opacity: 0, y: 100 }}
        animate={activitiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-[1700px] mx-auto px-8 py-20"
      >

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="bg-pink-100 text-pink-400 px-6 py-2 rounded-full font-semibold">
            OUR ACTIVITIES
          </span>

          <h2 className="text-5xl font-extrabold text-[#17286E] mt-6">
            Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¥â€¡Ã Â¤Â¤Ã Â¥â‚¬Ã Â¤Â² Ã Â¤â€°Ã Â¤ÂªÃ Â¤â€¢Ã Â¥ÂÃ Â¤Â°Ã Â¤Â®
          </h2>

          <p className="text-gray-500 text-xl mt-5 max-w-3xl mx-auto">
            Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢Ã Â¤Â¾Ã Â¤â€šÃ Â¤Â¸Ã Â¤Â¾Ã Â¤Â Ã Â¥â‚¬ Ã Â¤â€ Ã Â¤Â°Ã Â¥â€¹Ã Â¤â€”Ã Â¥ÂÃ Â¤Â¯, Ã Â¤Â®Ã Â¤Â¨Ã Â¥â€¹Ã Â¤Â°Ã Â¤â€šÃ Â¤Å“Ã Â¤Â¨ Ã Â¤â€ Ã Â¤Â£Ã Â¤Â¿ Ã Â¤Â¸Ã Â¤Â¾Ã Â¤Â®Ã Â¤Â¾Ã Â¤Å“Ã Â¤Â¿Ã Â¤â€¢
            Ã Â¤â€°Ã Â¤ÂªÃ Â¤â€¢Ã Â¥ÂÃ Â¤Â°Ã Â¤Â®Ã Â¤Â¾Ã Â¤â€šÃ Â¤Å¡Ã Â¥â€¡ Ã Â¤â€ Ã Â¤Â¯Ã Â¥â€¹Ã Â¤Å“Ã Â¤Â¨.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left Image */}

          <div className="relative rounded-[35px] overflow-hidden group shadow-xl">

            <img
              src="/images/event-main.jpg"
              onError={(e) => {
                e.currentTarget.src = "/images/aandmelav 10.jpeg";
              }}
              alt="Senior Cultural Festival"
              className="w-full h-[650px] object-cover group-hover:scale-110 duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute bottom-10 left-10 text-white z-10">

              <span className="bg-pink-400 px-5 py-2 rounded-full font-semibold">
                Featured Event
              </span>

              <h2 className="text-5xl font-bold mt-5">
                Senior Cultural Festival
              </h2>

              <p className="mt-4 text-xl text-gray-200">
                Celebrate happiness together.
              </p>

            </div>

          </div>

          {/* Right Cards */}

          <div className="space-y-7">

            {/* Card 1 */}

            <div className="bg-white rounded-[30px] shadow-lg p-7 flex gap-6 hover:-translate-y-2 duration-300">

              <img
                src="/images/yoga.jpg"
                onError={(e) => {
                  e.currentTarget.src = "/images/Screenshot 2026-07-31 103659.png";
                }}
                alt="Morning Yoga Session"
                className="w-44 h-40 rounded-3xl object-cover"
              />

              <div>

                <div className="flex items-center gap-3">

                  <div className="bg-[#17286E] text-white rounded-2xl px-5 py-3 text-center">

                    <h3 className="text-2xl font-bold">26</h3>

                    <p className="text-xs font-semibold">JAN</p>

                  </div>

                  <span className="text-pink-400 font-semibold">
                    Health Program
                  </span>

                </div>

                <h2 className="text-2xl font-bold text-[#17286E] mt-4">
                  Morning Yoga Session
                </h2>

                <p className="text-gray-500 mt-3">
                  Daily yoga session for better health and relaxation.
                </p>

              </div>

            </div>

            {/* Card 2 */}

            <div className="bg-white rounded-[30px] shadow-lg p-7 flex gap-6 hover:-translate-y-2 duration-300">

              <img
                src="/images/music.jpg"
                onError={(e) => {
                  e.currentTarget.src = "/images/aandmelav 10.jpeg";
                }}
                alt="Music & Singing"
                className="w-44 h-40 rounded-3xl object-cover"
              />

              <div>

                <div className="flex items-center gap-3">

                  <div className="bg-pink-400 text-white rounded-2xl px-5 py-3 text-center">

                    <h3 className="text-2xl font-bold">27</h3>

                    <p className="text-xs font-semibold">JAN</p>

                  </div>

                  <span className="text-pink-400 font-semibold">
                    Entertainment
                  </span>

                </div>

                <h2 className="text-2xl font-bold text-[#17286E] mt-4">
                  Music & Singing
                </h2>

                <p className="text-gray-500 mt-3">
                  Enjoy music, bhajans and cultural performances.
                </p>

              </div>

            </div>

            {/* Card 3 */}

            <div className="bg-white rounded-[30px] shadow-lg p-7 flex gap-6 hover:-translate-y-2 duration-300">

              <img
                src="/images/games.jpg"
                onError={(e) => {
                  e.currentTarget.src = "/images/Screenshot 2026-07-31 103517.png";
                }}
                alt="Indoor Games Competition"
                className="w-44 h-40 rounded-3xl object-cover"
              />

              <div>

                <div className="flex items-center gap-3">

                  <div className="bg-green-600 text-white rounded-2xl px-5 py-3 text-center">

                    <h3 className="text-2xl font-bold">28</h3>

                    <p className="text-xs font-semibold">JAN</p>

                  </div>

                  <span className="text-pink-400 font-semibold">
                    Fun Activity
                  </span>

                </div>

                <h2 className="text-2xl font-bold text-[#17286E] mt-4">
                  Indoor Games Competition
                </h2>

                <p className="text-gray-500 mt-3">
                  Chess, Carrom and many enjoyable activities.
                </p>

              </div>

            </div>

          </div>

        </div>

      </motion.section>

      {/* ================= ANANDSHALA STORY ================= */}
      <AnandshalaStory />

      {/* ================= JOURNEY SECTION ================= */}
      <JourneySection />

      <footer className="bg-[#17286E] text-white mt-20 rounded-t-[60px]">

        <div className="max-w-[1700px] mx-auto px-8 py-20">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Logo */}

            <div>

              <img
                src="/logo.png"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://d3k88l35vy59af.cloudfront.net/A42/9336/1760175180579.png";
                }}
                className="w-24 mb-6 object-contain"
                alt="logo"
              />

              <h2 className="text-3xl font-bold">
                Ã Â¤ÂªÃ Â¥ÂÃ Â¤Â°Ã Â¥â‚¬Ã Â¤Â¤Ã Â¤Â® Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢
              </h2>

              <h2 className="text-3xl font-bold text-pink-400">
                Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¤Â¾
              </h2>

              <p className="text-gray-300 mt-6 leading-8">
                Ã Â¤Â®Ã Â¤Â¹Ã Â¤Â¾Ã Â¤Â°Ã Â¤Â¾Ã Â¤Â·Ã Â¥ÂÃ Â¤Å¸Ã Â¥ÂÃ Â¤Â°Ã Â¤Â¾Ã Â¤Â¤Ã Â¥â‚¬Ã Â¤Â² Ã Â¤ÂªÃ Â¤Â¹Ã Â¤Â¿Ã Â¤Â²Ã Â¥â‚¬ Ã Â¤Å“Ã Â¥ÂÃ Â¤Â¯Ã Â¥â€¡Ã Â¤Â·Ã Â¥ÂÃ Â¤Â  Ã Â¤Â¨Ã Â¤Â¾Ã Â¤â€”Ã Â¤Â°Ã Â¤Â¿Ã Â¤â€¢
                Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦Ã Â¤Â¶Ã Â¤Â¾Ã Â¤Â³Ã Â¤Â¾.
                Ã Â¤â€ Ã Â¤Â°Ã Â¥â€¹Ã Â¤â€”Ã Â¥ÂÃ Â¤Â¯, Ã Â¤â€ Ã Â¤Â¨Ã Â¤â€šÃ Â¤Â¦ Ã Â¤â€ Ã Â¤Â£Ã Â¤Â¿ Ã Â¤Â¸Ã Â¤Â¾Ã Â¤Â®Ã Â¤Â¾Ã Â¤Å“Ã Â¤Â¿Ã Â¤â€¢
                Ã Â¤â€°Ã Â¤ÂªÃ Â¤â€¢Ã Â¥ÂÃ Â¤Â°Ã Â¤Â®Ã Â¤Â¾Ã Â¤â€šÃ Â¤Â¸Ã Â¤Â¾Ã Â¤Â Ã Â¥â‚¬ Ã Â¤Â¸Ã Â¤Â®Ã Â¤Â°Ã Â¥ÂÃ Â¤ÂªÃ Â¤Â¿Ã Â¤Â¤.
              </p>

            </div>

            {/* Quick Links */}

            <div>

              <h2 className="text-2xl font-bold mb-8">
                Quick Links
              </h2>

              <ul className="space-y-4 text-gray-300">

                <li className="hover:text-pink-400 cursor-pointer duration-300">
                  Home
                </li>

                <li className="hover:text-pink-400 cursor-pointer duration-300">
                  About
                </li>

                <li className="hover:text-pink-400 cursor-pointer duration-300">
                  Gallery
                </li>

                <li className="hover:text-pink-400 cursor-pointer duration-300">
                  Events
                </li>

                <li className="hover:text-pink-400 cursor-pointer duration-300">
                  Contact
                </li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h2 className="text-2xl font-bold mb-8">
                Contact
              </h2>

              <div className="space-y-6">

                <div>

                  <p className="text-pink-400 font-semibold">
                    Address
                  </p>

                  <p className="text-gray-300">
                    Sangli, Maharashtra
                  </p>

                </div>

                <div>

                  <p className="text-pink-400 font-semibold">
                    Phone
                  </p>

                  <p className="text-gray-300">
                    +91 9370237633
                  </p>

                </div>

                <div>

                  <p className="text-pink-400 font-semibold">
                    Email
                  </p>

                  <p className="text-gray-300">
                    info@aanandshala.in
                  </p>

                </div>

              </div>

            </div>

            {/* Gallery */}

            <div>

              <h2 className="text-2xl font-bold mb-8">
                Gallery
              </h2>

              <div className="grid grid-cols-3 gap-3">

                <img
                  src="/images/gallery1.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/aandshala_img.png";
                  }}
                  alt="Gallery 1"
                  className="rounded-xl h-24 w-full object-cover hover:scale-110 duration-300"
                />
                <img
                  src="/images/gallery2.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/aandmelav 10.jpeg";
                  }}
                  alt="Gallery 2"
                  className="rounded-xl h-24 w-full object-cover hover:scale-110 duration-300"
                />
                <img
                  src="/images/gallery3.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Screenshot 2026-07-31 103517.png";
                  }}
                  alt="Gallery 3"
                  className="rounded-xl h-24 w-full object-cover hover:scale-110 duration-300"
                />
                <img
                  src="/images/gallery4.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/aandshala sahal 1.jpeg";
                  }}
                  alt="Gallery 4"
                  className="rounded-xl h-24 w-full object-cover hover:scale-110 duration-300"
                />
                <img
                  src="/images/gallery5.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Screenshot 2026-07-31 103659.png";
                  }}
                  alt="Gallery 5"
                  className="rounded-xl h-24 w-full object-cover hover:scale-110 duration-300"
                />
                <img
                  src="/images/gallery6.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/Screenshot 2026-07-31 103842.png";
                  }}
                  alt="Gallery 6"
                  className="rounded-xl h-24 w-full object-cover hover:scale-110 duration-300"
                />

              </div>

            </div>

          </div>

          {/* Divider */}

          <div className="border-t border-blue-700 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">

            <p className="text-gray-300">
              Ã‚Â© 2026 Preetam Aanandshala. All Rights Reserved.
            </p>

            {/* Social Icons */}

            <div className="flex gap-4 mt-6 lg:mt-0">

              <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center hover:scale-110 duration-300 cursor-pointer text-white font-bold">
                F
              </div>

              <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center hover:scale-110 duration-300 cursor-pointer text-white font-bold">
                I
              </div>

              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 duration-300 cursor-pointer text-white font-bold">
                Y
              </div>

              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 duration-300 cursor-pointer text-white font-bold">
                W
              </div>

            </div>

          </div>

        </div>

      </footer>
    </div>
  );
};

export default Home;
