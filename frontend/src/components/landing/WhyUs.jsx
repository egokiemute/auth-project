import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const WhyUs = () => {
  return (
    <div className="bg-[#803EC20A] px-12 py-32">
      <div className="container flex flex-col items-center justify-center gap-10">
        <div className="bg-white rounded-3xl p-8 grid grid-cols-2 gap-20 w-fit">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-3xl font-semibold">
              Your Flexible Workspace network, Everywhere.
            </h3>
            <p className="text-base text-[#000000A3]">
              Your workspace should be as flexible as your lifestyle, and with
              us, it is. Whether you're in a bustling city, a quiet town, or
              even traveling, we provide you with a network of workspaces that
              adapt to your needs. From quiet corners for deep work to vibrant
              spaces for collaboration, you’ll always have the perfect place to
              stay productive, whenever and wherever you need it.
            </p>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Link
                to="/spaces"
                className="text-[#000000A3] text-base font-bold underline"
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
              width="360px"
              className="object-cover h-[280px] w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
