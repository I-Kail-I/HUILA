"use client";
import React from "react";
import Link from "next/link";
import { DiHaskell } from "react-icons/di";
import { usePathname } from "next/navigation";

export default function HideFooter() {
  const path = usePathname();
  if (path === "/signIn" || path === "/signUp") {
    return null;
  } else {
    return <Footer />;
  }
}

export function Footer() {
  return (
    <footer className="relative bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-500/40 py-8 bg-gray-500/10">
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0">
          <div className="w-full lg:w-1/3">
            <ul className="space-y-4">
              <li>
                <Link href="/" passHref className="flex items-center space-x-2">
                  <DiHaskell size={50} />
                  <h1 className="text-xl font-bold">HUILA</h1>
                </Link>
              </li>
              <li>
                <p className="text-gray-600">
                  Join millions of people who organize work and life with HUILA.
                </p>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col sm:flex-row justify-between space-y-8 sm:space-y-0 sm:space-x-8">
            <div className="flex-1 ms-0 lg:ms-20">
              <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4">Resources</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://twitter.com"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://facebook.com"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://instagram.com"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
