"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="text-gray-700 hover:text-blue-900 focus:outline-none"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={closeMenu}
                className="text-gray-700 hover:text-blue-900 focus:outline-none"
                aria-label="Menüyü kapat"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/hizmetler"
                    className="block text-lg text-gray-700 hover:text-blue-900"
                    onClick={closeMenu}
                  >
                    Hizmetler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/realitymodel"
                    className="block text-lg text-gray-700 hover:text-blue-900"
                    onClick={closeMenu}
                  >
                    Reality Model
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hakkimizda"
                    className="block text-lg text-gray-700 hover:text-blue-900"
                    onClick={closeMenu}
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/iletisim"
                    className="block text-lg text-gray-700 hover:text-blue-900"
                    onClick={closeMenu}
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
} 