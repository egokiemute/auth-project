import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import PopupCard from "./PopupCard";
import { Link } from "react-router-dom";

const Reservation = ({}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenTwo, setIsPopupOpenTwo] = useState(false);
  return (
    <>
      <div className="bg-white flex flex-col gap-0 rounded-2xl border-[1px] border-[#0000001A] w-full">
        <div className="flex items-center gap-6 p-5">
          <div className="max-w-72 w-full h-40">
            <img
              src="/assets/space-three.png"
              alt="Space three"
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col gap-1 items-start">
              <h1 className="font-bold text-2xl tracking-wide">
                South Circle Office
              </h1>
              <p className="text-[#000000A3] font-medium text-sm">
                44 Okumagba Avenue, Opposite FCMB Bank, Estate, Warri, Delta
                State.
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[#000000A3] font-medium text-sm flex items-center gap-2">
                <span>1 week</span>
                <span>-</span>
                <span>Aug. 16th - 22nd, 2024</span>
              </p>
              <span className="bg-[#A3761A0A] border-[1px] border-[#A3761A33] px-2 py-1 text-xs font-bold rounded-xl text-[#A3761A]">
                Pending
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] border-[1px] border-[#0000001A]" />
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center justify-between p-5"
        >
          <p className="bg-transparent font-bold text-lg underline">
            View details
          </p>
          <ChevronRight className="size-6 text-[#00000066]" />
        </button>
      </div>
      <PopupCard
        heading="Your reservation details"
        className="max-w-3xl h-[620px] relative"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <div className="overflow-y-scroll h-[470px] overflow-hidden no-scrollbar pb-6">
          <div className="flex flex-col gap-2 w-full p-5">
            <span className="bg-[#A3761A0A] border-[1px] border-[#A3761A33] w-fit px-2 py-1 text-xs font-bold rounded-xl text-[#A3761A]">
              Pending
            </span>
            <div className="w-full h-48 relative">
              <img
                src="/assets/space-three.png"
                alt="Space three"
                className="object-cover rounded-xl w-full h-full"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center rounded-xl">
                <p className="text-white font-bold text-lg">
                  SouthCircle Coworking Space
                </p>
                <p className="text-white text-sm">
                  Nov. 16th - Dec. 14th, 2024
                </p>
              </div>
            </div>
            <h2 className="text-xl font-bold">SouthCircle Coworking Space</h2>
            <p className="text-[#000000A3] font-medium text-sm">
              Jeddo, Warri, Delta State
            </p>
          </div>
          <div className="border-t-8 border-[#00000030]">
            <div className="p-5">
              <h1 className="font-bold text-xl">Reservation details</h1>
              <div className="divide-y divide-[#00000030]">
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Reservation code</h3>
                  <p className="text-[#000000A3] uppercase">TAB12345OS6789</p>
                </div>
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Arrival date</h3>
                  <p className="text-[#000000A3]">November 16th, 2024</p>
                </div>
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Duration</h3>
                  <p className="text-[#000000A3] flex items-center gap-1">
                    <span>1 month</span>
                    <span>&dot;</span>
                    <span>Nov. 16th - Dec. 14th, 2024</span>
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Number of persons</h3>
                  <p className="text-[#000000A3]">1 Tab user</p>
                </div>
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Payment details</h3>
                  <div className="flex flex-col items-start gap-1">
                    <p className="font-light text-black text-base">
                      Total amount: ₦143,976.00{" "}
                    </p>
                    <p className="text-[#000000A3]">
                      24 (days) x 1 (user) x ₦5,999 (price per day)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-8 border-[#00000030]">
            <div className="p-5">
              <h1 className="font-bold text-xl">Your details submitted</h1>
              <div className="divide-y divide-[#00000030]">
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Full name</h3>
                  <p className="text-[#000000A3]">Gold Nelson</p>
                </div>
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Phone number</h3>
                  <p className="text-[#000000A3]">(+234) 913 302 0570</p>
                </div>
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">Email</h3>
                  <p className="text-[#000000A3]">gold.nelsin@hotmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-8 border-[#00000030]">
            <div className="p-5">
              <h1 className="font-bold text-xl">
                Contact support for assistance
              </h1>
              <div className="divide-y divide-[#00000030]">
                <div className="flex flex-col items-start gap-2 py-4">
                  <h3 className="text-sm font-bold">TabOS Hotline</h3>
                  <p className="text-[#000000A3]">
                    Contact TabOS support on WhatsApp:{" "}
                    <Link to="tel:(+234) 913 302 0570">
                      (+234) 913 302 0570
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white absolute bottom-0 w-full rounded-b-2xl">
          <div className="w-full h-[0.5px] border-[1px] border-[#0000001A]" />
          <div className="flex items-center justify-between gap-4 p-5">
            <button onClick={() => setIsPopupOpen(false)} className="text-base text-black underline font-semibold">
              Go back
            </button>
            <button
              className="py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
              onClick={() => setIsPopupOpenTwo(true)}
            >
              Cancel reservation
            </button>
          </div>
        </div>
      </PopupCard>
      <PopupCard
        className="max-w-md h-[268px] relative"
        heading="Cancel this reservation?"
        isOpen={isPopupOpenTwo}
        onClose={() => setIsPopupOpenTwo(false)}
      >
        <div className="p-5">
          <p className="mt-2 text-gray-600">
            Cancelling this reservation, no going back and it will permanently
            delete from your account and host.
          </p>
        </div>
        <div className="bg-white absolute bottom-0 w-full rounded-b-2xl">
          <div className="w-full h-[0.5px] border-[1px] border-[#0000001A]" />
          <div className="flex items-center justify-end gap-4 p-5">
            <button
              className="py-3 px-4 bg-transparent text-[#000000A3] border-[1px] border-[#00000066] font-bold rounded-lg focus:outline-none transition duration-200"
              onClick={() => setIsPopupOpenTwo(false)}
            >
              No, close
            </button>
            <button
              className="py-3 px-4 bg-red-600 text-white font-bold rounded-lg focus:outline-none transition duration-200"
              //   onClick={() => setIsPopupOpenTwo(true)}
            >
              Yes, cancel reservation
            </button>
          </div>
        </div>
      </PopupCard>
    </>
  );
};

export default Reservation;
