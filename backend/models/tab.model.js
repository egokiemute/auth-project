import mongoose from 'mongoose';

const tabSchema = new mongoose.Schema({
    space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: false },
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
        oneDay: { price: Number, description: String, days: Number },
        oneWeek: { price: Number, description: String, days: Number },
        oneMonth: { price: Number, description: String, days: Number },
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
