"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import HomeImage from "../../public/home/Home Image.avif";
import PhoneHomeImage from "../../public/home/Phone Home Image.avif";
import { motion } from "framer-motion";
import { IoPersonCircleSharp } from "react-icons/io5";
import RainbowTrail from "../../public/home/Rainbow Trail.png";
import Link from "next/link";

// Calendar component for the right part of the third section
const Calendar = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const days = ["Wed 5", "Thu 6", "Fri 7", "Sat 8", "Sun 9"];
  const timeSlots = [
    "All day",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
  ];

  const events = [
    {
      id: 1,
      day: "Wed 5",
      time: "All day",
      title: "Alex' Birthday",
      color: "bg-red-500",
    },
    {
      id: 2,
      day: "Thu 6",
      time: "All day",
      title: "Pick up package",
      color: "bg-gray-200",
    },
    {
      id: 3,
      day: "Fri 7",
      time: "All day",
      title: "Book venue",
      color: "bg-gray-200",
    },
    {
      id: 4,
      day: "Sat 8",
      time: "All day",
      title: "TD Meeting",
      color: "bg-amber-200",
    },
    {
      id: 5,
      day: "Sat 8",
      time: "All day",
      title: "Weekly review",
      color: "bg-gray-200",
    },
    {
      id: 6,
      day: "Wed 5",
      time: "9 AM",
      title: "Plan for the week",
      color: "bg-gray-200",
    },
    {
      id: 7,
      day: "Fri 7",
      time: "11 AM",
      title: "Customer interviews",
      color: "bg-red-200",
      duration: 4,
    },
    {
      id: 8,
      day: "Thu 6",
      time: "10 AM",
      title: "Record intro video",
      color: "bg-amber-100",
      duration: 4,
    },
    {
      id: 9,
      day: "Fri 7",
      time: "9 AM",
      title: "Publish video to TD YouTube",
      color: "bg-gray-200",
      duration: 2,
    },
    {
      id: 10,
      day: "Sat 8",
      time: "9 AM",
      title: "Breakfast meeting",
      color: "bg-gray-200",
    },
    {
      id: 11,
      day: "Sat 8",
      time: "10 AM",
      title: "Design TD Monthly Newsletter",
      color: "bg-blue-100",
      duration: 2,
    },
    {
      id: 12,
      day: "Sun 9",
      time: "11 AM",
      title: "Inbox Zero",
      color: "bg-red-100",
    },
    {
      id: 13,
      day: "Wed 5",
      time: "12 PM",
      title: "Deep work",
      color: "bg-gray-200",
      duration: 2,
    },
  ];

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Header animation
  const headerVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  // Day column animation
  const dayColumnVariants = {
    hidden: { y: 10, opacity: 0, scale: 0.95 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.15,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    }),
  };

  // Event animation
  const eventVariants = {
    hidden: {
      scale: 0.95,
      opacity: 0,
      y: 5,
    },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + custom.dayIndex * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.02,
      y: -2,
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Today marker animation
  const todayMarkerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 1.2,
      },
    },
  };

  const getEventHeight = (duration) => {
    return duration ? `${duration * 50}px` : "50px";
  };

  const getTodayClass = (day) => {
    return day === "Fri 7" ? "bg-red-50 relative" : "";
  };

  return (
    <motion.div
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ zIndex: 0 }}
    >
      <motion.div className="px-6 py-4 border-b" variants={headerVariants}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Upcoming</h1>
            <div className="text-gray-500 mt-1">March 2025</div>
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded">
              <span className="text-gray-500">Today</span>
            </button>

            <button className="px-3 py-1 border rounded">
              <span className="text-gray-500">Plan</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-6 border-b">
        <div className="p-2 border-r"></div>
        {days.map((day, index) => (
          <motion.div
            key={day}
            custom={index}
            className={`p-2 text-center font-medium border-r ${getTodayClass(
              day
            )}`}
            variants={dayColumnVariants}
          >
            {day === "Fri 7" && (
              <motion.div
                className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center -mt-2 -mr-2"
                variants={todayMarkerVariants}
              >
                7
              </motion.div>
            )}
            {day}
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-6">
          <div className="border-r">
            {timeSlots.map((time) => (
              <div key={time} className="h-12 p-2 border-b">
                <span className="text-xs text-gray-500">{time}</span>
              </div>
            ))}
          </div>

          {days.map((day) => (
            <div key={day} className={`border-r ${getTodayClass(day)}`}>
              {timeSlots.map((time) => (
                <div key={`${day}-${time}`} className="h-12 border-b"></div>
              ))}
            </div>
          ))}

          {events.map((event) => {
            const dayIndex = days.indexOf(event.day);
            const timeIndex = timeSlots.indexOf(event.time);
            if (dayIndex === -1 || timeIndex === -1) return null;

            return (
              <motion.div
                key={event.id}
                custom={{ dayIndex }}
                className={`absolute rounded-md p-2 ${event.color} border`}
                style={{
                  left: `calc(${((dayIndex + 1) / 6) * 100}% - ${100 / 6}%)`,
                  top: `${timeIndex * 48}px`,
                  width: "90%",
                  height: getEventHeight(event.duration),
                  zIndex: hoveredEvent === event.id ? 10 : 1,
                }}
                variants={eventVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredEvent(event.id)}
                onHoverEnd={() => setHoveredEvent(null)}
              >
                <div className="flex items-center text-sm">
                  {event.color === "bg-red-500" && (
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  )}
                  {event.color === "bg-amber-200" && (
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                  )}
                  <span className="truncate">{event.title}</span>
                </div>
                {event.title === "Customer interviews" && (
                  <div className="mt-1 text-xs text-gray-700">
                    11:00 AM-03:00 PM
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ↻
                    </motion.span>
                  </div>
                )}
                {event.title === "TD Meeting" && (
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ↻
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [homeImages, setHomeImages] = useState(null);
  const [widthWindow, setWidthWindow] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (widthWindow < 768) {
      setHomeImages(PhoneHomeImage);
    } else {
      setHomeImages(HomeImage);
    }
  }, [widthWindow]);

  return (
    <div className="homeContainer min-h-screen">
      <section className="header flex flex-col lg:flex-row justify-center items-center lg:text-start text-center lg:items-start mt-25 mx-10 gap-15">
        <div className="leftContainer flex flex-col order-1 lg:order-1 lg:mr-8 gap-y-8 md:items-center sm:items-center">
          <h1 className="font-bold text-2xl lg:text-5xl lg:font-semibold md:text-3xl sm:text-3xl text-pretty">
            Organize your <br />
            work and life, finally.
          </h1>

          <p className="text-sm text-wrap text-gray-600 sm:text-sm md:text-xl lg:text-lg">
            Simplify life for both you and your team with the world's #1 task
            manager and to-do list app.
          </p>

          <Link href="/dashboard">
          <motion.button
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-xl lg:w-sm md:w-sm sm:w-sm cursor-pointer hover:bg-red-600"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 0.96 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            Start for free
          </motion.button>
          </Link>
        </div>

        <div className="rightContainer w-full lg:w-240 md:w-140 order-2 lg:order-2">
          {homeImages && (
            <Image
              src={homeImages}
              alt="Dashboard"
              layout="responsive"
              className="bg-amber-50 rounded-2xl outline outline-gray-300/30"
            />
          )}
        </div>
      </section>

      <section
        className={`quoteSection flex items-center justify-center gap-20 mt-30 relative overflow-hidden ${
          widthWindow >= 1024
            ? "bg-no-repeat bg-cover bg-center min-h-[200px] w-full"
            : ""
        }`}
        style={
          widthWindow >= 1000
            ? {
                backgroundImage: `url(${RainbowTrail.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {widthWindow < 768 ? (
          <motion.div
            className="flex space-x-40 justify-center items-center"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <div className="font-mono bg-amber-100/50 rounded-lg py-7 border-gray-500/40 p-5">
              <div className="personContainer flex w-full items-center mb-4 px-10">
                <IoPersonCircleSharp size={30} className="me-1" />{" "}
                <h3>SAMPAH</h3>
              </div>
              <p>"Simple, straightforward, and super powerful" </p>
            </div>

            <div className="font-mono bg-amber-100/50 rounded-lg py-7 border-gray-500/40 p-5">
              <div className="personContainer flex w-full items-center mb-4 px-10">
                <IoPersonCircleSharp size={30} className="me-1" />{" "}
                <h3>Salam</h3>
              </div>
              <p>"The best to-do list app on the market"</p>
            </div>

            <div className="font-mono bg-amber-100/50 rounded-lg py-7 border-gray-500/40 p-5">
              <div className="personContainer flex w-full items-center mb-4 px-10">
                <IoPersonCircleSharp size={30} className="me-1" />
                <h3>Indra</h3>
              </div>
              <p>"Nothing short of stellar"</p>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="font-mono bg-amber-100/50 rounded-lg py-7 border-gray-500/40 p-5">
              <div className="personContainer flex w-full items-center mb-4">
                <IoPersonCircleSharp size={30} className="me-1" />
                <h3>Kevin</h3>
              </div>
              <p>
                "Simple, straightforward, <br />
                and super powerful"
              </p>
            </div>

            <div className="font-mono bg-amber-100/50 rounded-lg py-7 border-gray-500/40 p-5">
              <div className="personContainer flex w-full items-center mb-4">
                <IoPersonCircleSharp size={30} className="me-1" />{" "}
                <h3>Salam</h3>
              </div>
              <p>
                "The best to-do list app on <br /> the market"
              </p>
            </div>

            <div className="font-mono bg-amber-100/50 rounded-lg py-7 border-gray-500/40 p-5">
              <div className="personContainer flex w-full items-center mb-4">
                <IoPersonCircleSharp size={30} className="me-1" />{" "}
                <h3>Indra</h3>
              </div>
              <p>"Nothing short of stellar"</p>
            </div>
          </>
        )}
      </section>

      <section className="flex flex-col lg:flex-row mt-10 mx-10 gap-10 pb-15">
        <div className="leftPart flex flex-col w-full lg:w-1/2 gap-20 ">
          <motion.div
            className="captureText flex flex-col lg:ms-15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-yellow-400 text-sm mb-2">Clear your mind</p>

            <h1 className="text-4xl font-semibold mb-4">
              Capture tasks at the <br />
              speed of thought
            </h1>

            <p className="text-gray-600 text-lg">
              We've spent over a decade refining Todoist to be an extension of
              your mind. Capture and organize tasks instantly using
              easy-flowing, natural language.
            </p>
          </motion.div>

          <motion.div
            className="captureText flex flex-col lg:ms-15"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-orange-600 text-sm mb-2">Plan with confidence</p>

            <h1 className="text-4xl font-semibold mb-4">
              Simplify your planning
            </h1>

            <p className="text-gray-600 text-lg">
              Make the most of your time. Schedule due dates, visualize your
              week in calendar view, and set recurring tasks with ease.
            </p>
          </motion.div>
        </div>

        <div className="rightPart w-full lg:w-1/2 flex justify-center items-center ">
          <motion.div
            className="calendar-container w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <Calendar />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
