"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DiHaskell } from "react-icons/di";
import AboutImage from "../../../public/about/About Us Image.jpg";
import Link from "next/link";

export default function AboutUs() {
  const [hideImage, setHideImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHideImage(window.innerWidth < 765);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="intro h-full w-full flex justify-center items-center bg-[#5eb5ab]/40 px-7 py-10 border-b border-black/10">
        <div className="w-full flex flex-col justify-center text-center ">
          <h1 className="text-5xl font-bold font-serif text-cyan-950">
            About Hiula
          </h1>
          <p className="text-gray-700 mt-3 text-lg mb-8">
            A website where you can put your list and works thing you can do
            later in the other way.
          </p>

          <Link href="/dashboard" passHref>
            <button className="p-2 outline outline-black text-black hover:bg-black duration-200 hover:text-white cursor-pointer rounded-full">
              Put your first list!
            </button>
          </Link>
        </div>

        {!hideImage && (
          <div className="w-full flex items-center justify-center">
            <Image
              src={AboutImage}
              alt="Demo"
              layout="cover"
              className="size-89 rounded-2xl drop-shadow-md"
            />
          </div>
        )}
      </section>

      <section className="introduction w-full h-180 flex flex-col justify-start items-start bg-white">
        <div className="join flex flex-col w-full md:flex-row lg:flex-row mt-30">
          <div className="w-full flex flex-nowrap items-center justify-center">
            <DiHaskell
              size={200}
              className="rounded-full outline outline-gray-500/20 shadow-2xl"
            />
          </div>

          <div className="w-full flex flex-nowrap items-center justify-center">
            <h1>Join now</h1>
          </div>
        </div>
      </section>

      <section></section>

      <section></section>
    </div>
  );
}
