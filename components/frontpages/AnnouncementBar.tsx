"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const AnnouncementBar = () => {
  return (
    <div className="bg-[#1C3A2F]/60 text-[#B8D4C8] text-[11px] sm:text-xs tracking-wide">
      
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-auto sm:h-10 py-2 sm:py-0 gap-2">

        {/* Center (main message) */}
        <div className="flex items-center gap-2 flex-1 justify-center text-center sm:text-left overflow-hidden">
          
          <span className="bg-[#C4622A] text-white text-[9px] sm:text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-sm uppercase whitespace-nowrap">
            Limited Seats
          </span>

          <span className="text-[#C8A96A] font-medium truncate">
            Rishikesh 200-Hour YTT
          </span>

          <span className="text-[#B8D4C8]/70 hidden sm:inline truncate">
            — June batch open · Only 4 spots left
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">

          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-3 text-[#B8D4C8]/70">
            <Link href="#" className="hover:text-white transition">
              <FaInstagram size={14} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaTwitter size={14} />
            </Link>
            <Link href="#" className="hover:text-white transition">
              <FaFacebook size={14} />
            </Link>
          </div>

          {/* Help Button */}
          <Link href="/help">
            <Button
              size="sm"
              className="bg-[#C4622A] hover:bg-[#a95122] text-white text-[10px] px-3 py-1 h-7"
            >
              Help
            </Button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;