import React from "react";

const Community = () => {
  return (
    <div className="bg-white container px-12 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Core Community Section */}
        <div className="flex flex-col gap-4 items-center justify-center mb-20">
          <div className="flex flex-col text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Meet our Community</h2>
            <p className="text-2xl text-[#000000A3] font-medium">
              See what people are saying about TabOS
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((comm, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-3 max-w-[370px]"
              >
                <img
                  src={`/assets/community/comm-${comm}.jpeg`}
                  alt={`Community ${comm}`}
                  width="370px"
                  height="235px"
                  className="object-cover rounded-lg"
                />
                <h3 className="font-bold text-2xl">
                  {comm === 1
                    ? "Meet Timothy"
                    : comm === 2
                    ? "Meet Oreva"
                    : "Meet Efe"}
                </h3>
                <p className="text-[#000000A3] text-base font-medium">
                  {comm === 1
                    ? "“Convenient workspace with everything i need to work”"
                    : comm === 2
                    ? "“Well equipped and affordable space, I really enjoyed my stay”"
                    : "“See what people are saying about Tab Os”"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
