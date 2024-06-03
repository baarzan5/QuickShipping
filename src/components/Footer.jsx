import React from "react";
import { LuFacebook, LuInstagram } from "react-icons/lu";
import { PiTiktokLogoThin, PiSnapchatLogoLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location.pathname.includes("/admin")) {
    return null;
  }

  return (
    <div className="pt-10 w-full">
      <footer className="flex flex-col justify-center items-center gap-5 w-full bg-[#F5E5D7]">
        <div className="w-full flex flex-col justify-center items-center gap-5 sm:flex-row-reverse sm:justify-around sm:items-start p-4">
          <div className="flex flex-col justify-center items-center gap-7">
            <h2 className="text-2xl font-bold">LOGO</h2>

            <div className="sm:flex hidden flex-wrap justify-center items-center gap-3">
              <a href="" target="_blank" className="hover:text-[#FF6F00]">
                <LuFacebook size={25} />
              </a>
              <a href="" target="_blank" className="hover:text-[#FF6F00]">
                <LuInstagram size={25} />
              </a>
              <a href="" target="_blank" className="hover:text-[#FF6F00]">
                <PiTiktokLogoThin size={25} />
              </a>
              <a href="" target="_blank" className="hover:text-[#FF6F00]">
                <PiSnapchatLogoLight size={25} />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-7 sm:gap-3">
            <h3 className="text-xl font-semibold">دەربارە</h3>

            <div className="flex flex-col justify-center items-center gap-4 sm:gap-2">
              <Link to="/add-balance" className="hover:text-[#FF6F00]">
                پارەدان
              </Link>
            </div>
          </div>

          <div className="flex sm:hidden flex-wrap justify-center items-center gap-3">
            <a href="" target="_blank" className="hover:text-[#FF6F00]">
              <LuFacebook size={25} />
            </a>
            <a href="" target="_blank" className="hover:text-[#FF6F00]">
              <LuInstagram size={25} />
            </a>
            <a href="" target="_blank" className="hover:text-[#FF6F00]">
              <PiTiktokLogoThin size={25} />
            </a>
            <a href="" target="_blank" className="hover:text-[#FF6F00]">
              <PiSnapchatLogoLight size={25} />
            </a>
          </div>
        </div>

        <div className="w-full border-t border-t-[#969393]/50 py-2 flex justify-center items-center">
          <span className="text-gray-500">
            <strong>@BarzanDR</strong> 2024 All Rights Reserved
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
