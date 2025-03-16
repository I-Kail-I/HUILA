"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { DiHaskell } from "react-icons/di";
import { IoIosMenu as Menu } from "react-icons/io";
import { IoMdClose as X } from "react-icons/io";

export default function HideNavbar() {
  const path = usePathname();
  return path === "/signIn" || path === "signUp" ? null : <Navbar />;
}

export function Navbar() {
  const [navbarExpand, setNavbarExpand] = useState(false);
  const path = usePathname();

  return (
    <nav className="bg-white fixed top-0 z-10 w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" passHref>
            <motion.p
              className="text-black p-1 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 50,
                duration: 0.3,
              }}
            >
              <DiHaskell size={40} />
              HIULA
            </motion.p>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-x-8">
            {["Dashboard", "Services", "About"].map((item) => (
              <Link key={item} href={item.toLowerCase()} passHref>
                <motion.p
                  className={`text-black p-2 rounded-sm hover:bg-black/20 duration-200 ${
                    path === `/${item.toLowerCase()}` ? "bg-blue-300 hover:bg-blue-300" : ""
                  }`}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    duration: 0.1,
                  }}
                >
                  {item}
                </motion.p>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setNavbarExpand(!navbarExpand)}
          >
            {navbarExpand ? (
              <X
                size={30}
                className="cursor-pointer hover:text-gray-700 text-black duration-200"
              />
            ) : (
              <Menu
                size={30}
                className="cursor-pointer hover:text-gray-700 text-black duration-200"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Open and Close Animation */}
      <AnimatePresence>
        {navbarExpand && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {["Dashboard", "Services", "About"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                exit={{ x: -200 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.1,
                }}
              >
                <Link href={item.toLowerCase()} passHref>
                  <motion.p
                    className="p-4 text-black hover:bg-black/10"
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
