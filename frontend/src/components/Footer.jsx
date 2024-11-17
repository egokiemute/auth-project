import { Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";

const Footer = () => {
  return (
    <div className="container font-acronym flex flex-col items-center justify-between py-20 bg-[#000000E5]">
      <div className="flex items-start justify-between w-full gap-20 pb-16">
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
            <h4 className="text-white text-xl">Host</h4>
            <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
              <Link to="/list-space">List your space</Link>
            </div>
            <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
              <Link to="https://wa.me/">Community</Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h4 className="text-white text-xl">Explore</h4>
            <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
              <Link to="/spaces">Find a space</Link>
            </div>
            <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
              <Link to="/activities">Activites</Link>
            </div>
            <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
              <Link to="/locations">Locations</Link>
            </div>
            <div className="flex items-center gap-1 text-[#FFFFFFC2] text-sm">
              <Link to="/join-us">Ambassador</Link>
            </div>
          </div>
        </div>
        <div className="bg-white max-w-md rounded-xl p-6">
          <div className="flex flex-col items-start gap-2">
            <div>
              <h1 className="text-2xl text-black font-bold">
                Join 2,000+ Subscribers
              </h1>
              <p className="text-[#000000A3] text-base">
                Stay in the loop with everything you need to know
              </p>
            </div>
            <form className="w-full mt-1">
              <Input
                // icon={Mail}
                label="Email"
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <button className="bg-black py-2 px-5 rounded-lg -mt-4 text-sm font-semibold text-white flex items-center justify-center">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-[#FFFFFF1F] w-full py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#FFFFFFF5]">
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
          <div className="flex items-center gap-2">
            <Twitter className="text-[#FFFFFFF5] size-4" />
            <Instagram className="text-[#FFFFFFF5] size-4" />
            <Linkedin className="text-[#FFFFFFF5] size-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
