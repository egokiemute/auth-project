import { Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

const Footer = () => {
  return (
    <div className="font-acronym bg-[#000000E5]">
      <div className="container flex flex-col items-center justify-between py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-between w-full pb-16 pt-12">
          <img src="/logo-white.svg" alt="TabOS" />
          <div className="flex items-start gap-10">
            <div className="flex flex-col items-start gap-3">
              <h4 className="text-white text-xl">Support</h4>
              <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
                <Mail className="size-5" />
                <Link to="mailto:ctrl@usetabos.com">ctrl@usetabos.com</Link>
              </div>
              <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
                <Phone className="size-5" />
                <Link to="tel:+2347040340319">+234 704 034 0319</Link>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <h4 className="text-white text-xl">Explore</h4>
              <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm whitespace-nowrap">
                <Link to="/spaces">Find a space</Link>
              </div>
              <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm whitespace-nowrap">
                <Link to="/activities">Activites</Link>
              </div>
            </div>
          </div>
          <div className="bg-white max-w-md rounded-xl p-6 hidden md:block w-full">
            <div className="flex flex-col items-start gap-2">
              <div>
                <h1 className="text-2xl text-black font-bold">
                  Join 2,000+ Subscribers
                </h1>
                <p className="text-[#000000A3] text-base">
                  Stay in the Loop on everything you need to know
                </p>
              </div>
              <form className="w-full mt-1 space-y-4">
                <Input
                  // icon={Mail}
                  label="Email"
                  type="email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                />
                <button className="bg-black py-2 px-5 rounded-lg -mt-4 text-sm font-semibold text-white flex items-center justify-center">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-[#FFFFFF1F] w-full py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#FFFFFFC2]">
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
            <div className="flex items-center gap-6">
              <img
                src="/socials/instagram.svg"
                className="text-[#FFFFFFC2] size-5"
              />
              <img src="/socials/x.svg" className="text-[#FFFFFFC2] size-5" />
              <img
                src="/socials/linkedin.svg"
                className="text-[#FFFFFFC2] size-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
