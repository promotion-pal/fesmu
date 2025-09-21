import { app } from "@/config/app";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#BFC6E3] mt-auto py-3">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold  mb-2">{app.name}</p>
            <p className="text-sm">2025 &copy; Все права защищены</p>
          </div>

          <div className="flex space-x-6">
            {/* <a
              href="https://t.me/yourlink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-500 transition-colors duration-300"
            >
              <FaTelegram size={32} />
            </a>
            <a
              href="https://instagram.com/yourlink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-pink-600 transition-colors duration-300"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href="https://twitter.com/yourlink"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors duration-300"
            >
              <FaWhatsapp size={32} />
            </a> */}
          </div>

          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-black"
          >
            Сайт разработан с ❤️ командой <span>PromPal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
