import Reservation from "../models/reservation.model.js";
import Tab from "../models/tab.model.js";
import { User } from "../models/user.model.js";

export const createReservation = async (req, res) => {
    try {
        const { userId, tabId, commencementDate, endDate, duration, guests, amount } = req.body;

        // Validate required fields
        if (!userId || !tabId || !commencementDate || !endDate || !duration || !guests || !amount) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Fetch the tab
        const tab = await Tab.findById(tabId);
        if (!tab) {
            return res.status(404).json({
                success: false,
                message: "Tab not found.",
            });
        }

        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }


        // Validate duration
        const durationDetails =
            duration === 1
                ? tab.duration.oneDay.days
                : duration === 7
                    ? tab.duration.oneWeek.days
                    : tab.duration.oneMonth.days;


        if (!durationDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid duration selected.",
            });
        }

        // Create reservation
        const newReservation = new Reservation({
            user: userId,
            tab: tabId,
            commencementDate: new Date(commencementDate),
            endDate: new Date(endDate),
            duration,
            guests,
            amount,
        });

        // Save reservation
        const savedReservation = await newReservation.save();

        // Add reservation to the user's reservations array
        user.reservations.push(savedReservation._id);
        await user.save();


        return res.status(201).json({
            success: true,
            message: "Reservation created successfully.",
            reservation: savedReservation,
        });
    } catch (error) {
        console.error("Error in createReservation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const fetchSingle = async (req, res) => {
    try {
        const { id } = req.params; // Get ID from URL parameters
        const reservation = await Reservation.findById(id); // Find reservation by ID

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        return res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const fetchAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find(); // Fetch all reservations

        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found" });
        }

        return res.status(200).json({
            success: true,
            data: reservations
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const fetchUserReservations = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find reservations where the userId matches
        const reservations = await Reservation.find({ user: userId });

        if (!reservations.length) {
            return res.status(404).json({ message: "No reservations found for this user" });
        }

        return res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params; // Get reservation ID from URL
        const updateData = req.body; // Get data to update from the request body

        // Find reservation by ID and update it with the new data
        const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
            runValidators: true // Ensure validation is applied to updated fields
        });

        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        return res.status(200).json({
            success: true,
            data: updatedReservation
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};