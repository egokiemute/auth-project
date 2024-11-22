import React, { useEffect, useState } from "react";
import PopupCard from "../components/PopupCard";
import { useAuthStore } from "../store/authStore";
import { useReserveStore } from "../store/reservationStore";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the popup
  const [tabDetails, setTabDetails] = useState(null);
  const { user } = useAuthStore();
  const { reservation, status } = useReserveStore(); // Access the update function
  const PUBLIC_KEY = "pk_test_9d3f2fbb301e80e26d19359296310902b94b2e98";

  useEffect(() => {
    const fetchTabDetails = async () => {
      if (reservation && reservation.tab) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/auth/tab/${reservation.tab}`
          );
          setTabDetails(response.data);
        } catch (error) {
          console.error("Error fetching tab details:", error);
        }
      }
    };

    fetchTabDetails();
  }, [reservation]);

  if (!reservation) {
    return <p>No reservation found. Please initiate a reservation first.</p>;
  }

  console.log(reservation?._id);
  // console.log(tabDetails);

  // const price = reservation?.amount;
  const email = user?.email;
  const phone = user?.phone;
  const firstname = user?.firstname;
  const amount = reservation?.amount;
  const publicKey = PUBLIC_KEY;
  const reservationId = String(reservation?._id);
  console.log(reservationId)


  const componentProps = {
    email,
    amount: amount * 100,
    text: isLoading ? (
      <Loader className="w-6 h-6 animate-spin  mx-auto" />
    ) : (
      "Confirm and pay"
    ),
    metadata: { firstname, phone },
    publicKey,
    reference: new Date().getTime().toString(),
    onSuccess: async (reference) => {
      console.log("Payment success reference:", reference);
      setIsPopupOpen(true);
      setIsLoading(true);

      try {
        // Call the updateReservation API
        await status({
          reservationId,
          status: "confirmed",
        });
        // console.log("Reservation updated successfully.");
        // navigate("/reservations");
      } catch (error) {
        console.error("Error updating reservation:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onClose: () => {
      console.log("Payment dialog closed.");
    },
  };

  return (
    <div className="container">
      <div className="py-16 px-4">
        <h1 className="text-5xl font-bold text-[#000000E5]">
          Request for a space
        </h1>
        <div className="flex items-start justify-between gap-4 py-14">
          <div className="flex flex-col items-start gap-16">
            <div className="bg-white border border-[#0000001A] rounded-2xl w-full py-5 px-10 flex gap-10 items-center justify-between">
              <div className="flex flex-col gap-4 items-start">
                <h1 className="font-bold text-base">Top choice</h1>
                <p className="text-sm">
                  South circle has been a top choice recently.
                </p>
              </div>
              <img
                src="/star2.png"
                alt="top choice co-work space"
                className="size-8"
              />
            </div>
            <div className="flex flex-col items-start gap-5 w-full">
              <h1 className="font-bold text-xl">Your Reservation</h1>
              <div className="flex gap-20 items-center justify-between pb-5">
                <div className="flex flex-col gap-3 items-start">
                  <h1 className="font-bold text-base">Commencemet Date</h1>
                  <p className="text-sm">
                    {new Date(
                      reservation.commencementDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-start">
                  <h1 className="font-bold text-base">Guests</h1>
                  <p className="text-sm">{reservation.guests} guests</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-5 w-full pt-5 border-t border-[#0000001A]">
                <h1 className="font-bold text-xl">Payment option</h1>
                <div className="flex gap-20 items-center justify-between pb-5">
                  <div className="flex gap-3 items-center justify-between px-10 py-3 rounded-xl bg-white">
                    <p className="text-base">Paystack</p>
                    <img
                      src="/Paystack.svg"
                      alt="paystack"
                      className="size-5"
                    />
                  </div>
                </div>
              </div>
              <PaystackButton
                className="w-full py-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none transition duration-200"
                {...componentProps}
              />
            </div>
          </div>
          <div>
            <div className="bg-white border border-[#0000001A] rounded-2xl w-full p-5 flex flex-col gap-6 items-start divide-[#0000001A] divide-y-2">
              {tabDetails ? (
                <>
                  <div className="flex items-center gap-4">
                    <img
                      src="/assets/space-two.png"
                      alt="ggg"
                      className="w-[200px] h-[134px] rounded-lg"
                    />
                    <div className="flex flex-col gap-2 items-start">
                      <h1 className="font-bold text-2xl">{tabDetails.name}</h1>
                      <p className="text-base">
                        Location: {tabDetails.location}
                      </p>
                      <p className="text-base">
                        Duration:{" "}
                        {new Date(
                          reservation.commencementDate
                        ).toLocaleDateString()}{" "}
                        - {new Date(reservation.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="w-full pt-2">
                    <h1 className="font-bold text-2xl">Price details</h1>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-sm">
                        N{reservation.amount / reservation.duration} x{" "}
                        {reservation.duration} days
                      </p>
                      <p className="text-sm">N{reservation.amount}</p>
                    </div>
                  </div>
                  <div className="w-full pt-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Total:</p>
                      <p className="font-semibold">N{reservation.amount}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading tab details...</p>
              )}
              <div className="w-full pt-2">
                <h1 className="font-bold text-2xl">Price details</h1>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm">
                    N{reservation.amount / reservation.duration} x{" "}
                    {reservation.duration} days
                  </p>
                  <p className="text-sm">N{reservation.amount}</p>
                </div>
              </div>
              <div className="w-full pt-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Total:</p>
                  <p className="font-semibold">N{reservation.amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PopupCard Component */}
      <PopupCard
        heading="Processing Your Payment"
        className="max-w-xl relative"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      >
        <div className="flex items-center justify-center py-12">
          {isLoading ? (
            <p className="text-lg font-bold">
              Please wait while we process your reservation...
            </p>
          ) : (
            <p className="text-lg font-bold text-green-600">
              Your payment was successful!
            </p>
          )}
        </div>
      </PopupCard>
    </div>
  );
};

export default Booking;
