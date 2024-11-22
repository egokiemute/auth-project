import { ChevronRight, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import PopupCard from "./PopupCard";
import { Link, useNavigate } from "react-router-dom";
import { useReserveStore } from "../store/reservationStore";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const Reservation = ({ reservation }) => {
  const navigate = useNavigate();
  const { status } = useReserveStore();
  const { user } = useAuthStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenTwo, setIsPopupOpenTwo] = useState(false);
  const [tabDetails, setTabDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Fallback for invalid or missing dates

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date strings

    const day = date.getDate();
    const daySuffix =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return `${format(date, "MMM.")} ${day}${daySuffix}`;
  };

  if (!reservation) {
    return <p>No reservation found. Please initiate a reservation first.</p>;
  }

  useEffect(() => {
    const fetchTabDetails = async () => {
      if (reservation && reservation.tab) {
        try {
          const response = await axios.get(
            `https://usetabos-beta.onrender.com/api/auth/tab/${reservation.tab}`
          );

          setTabDetails(response.data.tab);
        } catch (error) {
          console.error("Error fetching tab details:", error);
        }
      }
    };

    fetchTabDetails();
  }, [reservation, reservation.tab]);

  if (!reservation) {
    return <p>No reservation found. Please initiate a reservation first.</p>;
  }

  const getStatusDetails = (status) => {
    switch (status) {
      case "awaiting payment":
        return {
          label: "Pending",
          bgColor: "bg-[#A3761A0A]",
          borderColor: "border-[#A3761A33]",
          textColor: "text-[#A3761A]",
        };
      case "confirmed":
        return {
          label: "Active",
          bgColor: "bg-[#28A7450A]",
          borderColor: "border-[#28A74533]",
          textColor: "text-[#28A745]",
        };
      case "canceled":
        return {
          label: "Canceled",
          bgColor: "bg-[#DC35450A]",
          borderColor: "border-[#DC354533]",
          textColor: "text-[#DC3545]",
        };
      default:
        return {
          label: "Unknown",
          bgColor: "bg-gray-100",
          borderColor: "border-gray-300",
          textColor: "text-gray-500",
        };
    }
  };

  const isPastCommencementDate = (commencementDate) => {
    const currentDate = new Date(); // Get the current date and time
    const commencement = new Date(commencementDate); // Convert commencementDate to a Date object

    // Compare dates
    return currentDate > commencement;
  };

  // Cancel Reservation
  const cancelReservation = async (reservationId) => {
    setIsLoading(true);
    try {
      // Call the updateReservation API
      await status({
        reservationId,
        status: "canceled",
      });
      toast.success("Reservation canceled successfully.");
      setIsLoading(false);
      navigate("/reservations");
    } catch (error) {
      console.error("Error updating reservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReservation = async (reservationId) => {
    setIsLoading(true);
    try {
      // Call the updateReservation API
      await status({
        reservationId,
        "status": "confirmed",
      });
      toast.success("Reservation canceled successfully.");
      setIsLoading(false);
      navigate("/reservations");
    } catch (error) {
      console.error("Error updating reservation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(reservation);
  // console.log(data)
  // console.log(tabDetails);
  // console.log(tabDetails?.name);
  // console.log(user)
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
                {tabDetails?.name}
              </h1>
              <p className="text-[#000000A3] font-medium text-sm">
                {tabDetails?.street}, {tabDetails?.city},{""}
                {tabDetails?.state}.
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p className="text-[#000000A3] font-medium text-sm flex items-center gap-2">
                <span>
                  {reservation?.duration === 1
                    ? "1 day"
                    : reservation?.duration === 7
                    ? "1 week"
                    : reservation?.duration === 28
                    ? "1 month"
                    : `${reservation?.duration} day${
                        reservation?.duration == 1 ? "" : "s"
                      }`}
                </span>
                <span>-</span>
                <span>
                  {formatDate(reservation?.commencementDate)} -{" "}
                  {formatDate(reservation?.endDate)},{" "}
                  {new Date(reservation?.endDate).getFullYear()}
                </span>
              </p>
              <span
                className={`px-2 py-1 text-xs font-bold rounded-xl border-[1px] ${
                  getStatusDetails(reservation?.status).bgColor
                } ${getStatusDetails(reservation?.status).borderColor} ${
                  getStatusDetails(reservation?.status).textColor
                }`}
              >
                {getStatusDetails(reservation?.status).label}
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
        <PopupCard
          heading="Your reservation details"
          className="max-w-3xl h-[620px] relative"
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        >
          <div className="overflow-y-scroll h-[470px] overflow-hidden no-scrollbar pb-6">
            <div className="flex flex-col gap-2 w-full p-5">
              <span
                className={`px-2 py-1 text-xs font-bold rounded-xl border-[1px] w-fit ${
                  getStatusDetails(reservation?.status).bgColor
                } ${getStatusDetails(reservation?.status).borderColor} ${
                  getStatusDetails(reservation?.status).textColor
                }`}
              >
                {getStatusDetails(reservation?.status).label}
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
                    {tabDetails?.name}
                  </p>
                  <p className="text-white text-sm">
                    {formatDate(reservation?.commencementDate)} -{" "}
                    {formatDate(reservation?.endDate)},{" "}
                    {new Date(reservation?.endDate).getFullYear()}
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-bold">{tabDetails?.name}</h2>
              <p className="text-[#000000A3] font-medium text-sm">
                {tabDetails?.street}, {tabDetails?.city},{""}
                {tabDetails?.state}.
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
                    <h3 className="text-sm font-bold">Commencemet date</h3>
                    <p className="text-[#000000A3]">
                      {formatDate(reservation?.commencementDate)},{" "}
                      {new Date(reservation?.commencementDate).getFullYear()}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 py-4">
                    <h3 className="text-sm font-bold">Duration</h3>
                    <p className="text-[#000000A3] flex items-center gap-1">
                      <span>
                        {reservation?.duration === 1
                          ? "1 day"
                          : reservation?.duration === 7
                          ? "1 week"
                          : reservation?.duration === 28
                          ? "1 month"
                          : `${reservation?.duration}`}
                      </span>
                      <span>-</span>
                      <span>
                        {" "}
                        {formatDate(reservation?.commencementDate)} -{" "}
                        {formatDate(reservation?.endDate)},{" "}
                        {new Date(reservation?.endDate).getFullYear()}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 py-4">
                    <h3 className="text-sm font-bold">Number of persons</h3>
                    <p className="text-[#000000A3]">
                      {reservation?.guests} Tab User(s)
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 py-4">
                    <h3 className="text-sm font-bold">Payment details</h3>
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-light text-black text-base">
                        Total amount: ₦{reservation?.amount}{" "}
                      </p>
                      {/* <p className="text-[#000000A3]">
                      24 (days) x 1 (user) x ₦5,999 (price per day)
                    </p> */}
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
                    <p className="text-[#000000A3]">
                      {user?.firstname} {user?.lastname}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 py-4">
                    <h3 className="text-sm font-bold">Phone number</h3>
                    <p className="text-[#000000A3]">
                      (+234) {user?.phone || "***** *** ***"}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2 py-4">
                    <h3 className="text-sm font-bold">Email</h3>
                    <p className="text-[#000000A3]">{user?.email}</p>
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
                      <Link to="tel:+2349133020570">(+234) 913 302 0570</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white absolute bottom-0 w-full rounded-b-2xl">
            <div className="w-full h-[0.5px] border-[1px] border-[#0000001A]" />
            <div className="flex items-center justify-between gap-4 p-5">
              <button
                disabled={isPastCommencementDate(reservation?.commencementDate)}
                onClick={() => setIsPopupOpen(false)}
                className="text-base text-black underline font-semibold"
              >
                Go back
              </button>
              <button
                className="py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
                onClick={() => updateReservation(reservation?._id)}
              >
                Update reservation
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader className="w-6 h-6 animate-spin  mx-auto" />
              </div>
            ) : (
              <p className="mt-2 text-gray-600">
                Cancelling this reservation, no going back and it will
                permanently delete from your account and host.
              </p>
            )}
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
                onClick={() => cancelReservation(reservation?._id)}
              >
                Yes, cancel reservation
              </button>
            </div>
          </div>
        </PopupCard>
      </div>
    </>
  );
};

export default Reservation;
