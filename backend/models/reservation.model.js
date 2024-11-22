import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tab",
        required: true,
    },
    commencementDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        enum: [1, 7, 28],
        required: true,
    },
    guests: {
        type: Number,
        required: true,
        default: 1,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["awaiting payment", "confirmed", "canceled"],
        default: "awaiting payment",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
