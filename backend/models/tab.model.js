import mongoose from 'mongoose';

const tabSchema = new mongoose.Schema({
    space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    street: {
        type: String,
    },
    capacity: {
        type: Number, // Number of people the tab can accommodate
    },
    amenities: [{
        type: String,
        enum: ["wifi", "ac", "projector", "printer", "cafe", "parking", "whiteboard", "power backup", "smart tv", "locker storage"],
    }],
    price: {
        type: Number, // Price per hour/day, depending on your needs
    },
    duration: {
        oneDay: {
            price: { type: Number, required: true }, // Default price for 1 day
            description: { type: String, default: "All day access" },
            days: { type: Number, required: true }
        },
        oneWeek: {
            price: { type: Number, required: true }, // Price for 1 week
            description: { type: String, default: "A week access" },
            days: { type: Number, required: true }
        },
        oneMonth: {
            price: { type: Number, required: true }, // Price for 1 month
            description: { type: String, default: "A month access" },
            days: { type: Number, required: true }
        },
    },
    images: [{
        type: String // URLs of images specific to this tab
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Tab = mongoose.model('Tab', tabSchema);

export default Tab;
