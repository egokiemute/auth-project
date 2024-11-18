import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const WhyUs = () => {
  return (
    <div className="bg-[#803EC20A] px-12 py-32">
      <div className="container flex flex-col items-center justify-center gap-10">
        <h2 className="text-4xl font-bold">Why choose TabOS?</h2>
        <div className="bg-white rounded-3xl p-8 flex items-center gap-12 justify-between">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-3xl">
              Are you tired of the isolation from remote work?
            </h3>
            <p className="text-base text-[#000000A3]">
              Struggling to find a productive and inspiring workspace? Our
              co-working platform is the solution. We bridge the gap between the
              solitude of remote work and the distractions of traditional
              offices, bringing you closer to one.
            </p>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Link
                to="/spaces"
                className="text-[#000000A3] text-base font-medium underline"
              >
                Explore our spaces
              </Link>
              <ArrowRight className="size-4 text-[#00000066]" />
            </div>
          </div>
          <div className="w-full">
            <img
              src="/assets/benefits/why.jpeg"
              alt="Why choose TabOS"
              height="260px"
              width="540px"
              className="object-cover h-[280px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
