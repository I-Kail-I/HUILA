"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { DiHaskell } from "react-icons/di";

export default function hideNavbar() {
  const path = usePathname();

  if (path === "/signIn") {
    return null;
  } else {
    return <Navbar />;
  }
}

export function Navbar() {
  return (
    <>
      <nav className="bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 flex-nowrap">
            <div className="flex items-center">
              <div className="flex flex-shrink-0">
                <Link href="/" passHref>
                  <motion.p
                    className="text-black p-1"
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 50,
                      duration: 0.3,
                    }}
                  >
                    <DiHaskell size={40} />
                  </motion.p>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-8">

            <div className="flex flex-shrink-0">
                <Link href="#" passHref>
                  <motion.p
                    className="text-black p-1 rounded-sm hover:bg-black/20 duration-200"
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      duration: 0.1,
                    }}
                  >
                    Support
                  </motion.p>
                </Link>
              </div>

              <div className="flex flex-shrink-0">
                <Link href="#" passHref>
                  <motion.p
                    className="text-black p-1 rounded-sm hover:bg-black/20 duration-200"
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      duration: 0.1,
                    }}
                  >
                    Services
                  </motion.p>
                </Link>
              </div>

              <div className="flex flex-shrink-0">
                <Link href="#" passHref>
                  <motion.p
                    className="text-black p-1 rounded-sm hover:bg-black/20 duration-200"
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      duration: 0.1,
                    }}
                  >
                    About
                  </motion.p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
