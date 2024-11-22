import { Armchair, Headset, MapPin, Zap } from "lucide-react";
import React from "react";

const Benefits = () => {
  return (
    <div className="bg-white py-32">
      <div className="container max-w-7xl mx-auto">
        {/* Core Benefits Section */}
        <div className="flex flex-col gap-4 items-center justify-center mb-20">
          <h2 className="text-5xl font-bold mb-8">Core benefits</h2>
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 max-w-[370px]"
              >
                <img
                  src={`/assets/benefits/benefit-${benefit}.webp`}
                  alt={`Benefit ${benefit}`}
                  width="370px"
                  height="235px"
                  className="object-cover rounded-lg"
                />
                <h3 className="font-bold text-2xl">
                  {benefit === 1
                    ? "Flex your way"
                    : benefit === 2
                    ? "Meet, make, create"
                    : "Be more productive"}
                </h3>
                <p className="text-[#000000A3] text-base font-medium">
                  {benefit === 1
                    ? "Work your way, your time. Our flexible memberships adapt to your unique needs."
                    : benefit === 2
                    ? "Join a vibrant community of like-minded professionals."
                    : "Elevate your work with our thoughtfully designed spaces and state-of-the-art amenities."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Differentiators Section */}
        <div className="flex flex-col gap-10 items-center justify-center">
          <h2 className="text-5xl font-bold">Key differentiators</h2>
          <div className="grid grid-cols-4 gap-8">
            {[Zap, Armchair, MapPin, Headset].map((Icon, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center gap-2 max-w-[280px]"
              >
                <div
                  className={`border p-4 rounded-full ${
                    index === 0
                      ? "border-[#CC3B3129]"
                      : index === 1
                      ? "border-[#803EC233]"
                      : index === 2
                      ? "border-[#A3761A33]"
                      : "border-[#027A4833]"
                  }`}
                >
                  <Icon
                    className={`${
                      index === 0
                        ? "text-[#CC3B31B8]"
                        : index === 1
                        ? "text-[#803EC2B8]"
                        : index === 2
                        ? "text-[#A3761AB8]"
                        : "text-[#027A48B8]"
                    } size-8`}
                  />
                </div>
                <h3 className="font-bold text-xl">
                  {index === 0
                    ? "Fuel your network"
                    : index === 1
                    ? "Tech-ready spaces"
                    : index === 2
                    ? "Prime location"
                    : "Personalized Support"}
                </h3>
                <p className="text-[#000000A3] text-base font-medium">
                  {index === 0
                    ? "Network, learn and grow through our regular spaces."
                    : index === 1
                    ? "High quality amenities at your fingertips."
                    : index === 2
                    ? "Strategically located in the heart of the city."
                    : "Your success is our priority."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
