import mongoose from 'mongoose';

const tabSchema = new mongoose.Schema({
    space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Space',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    capacity: {
        type: Number, // Number of people the tab can accommodate
    },
    amenities: [{
        type: String,
        enum: ["wifi", "ac", "projector", "printer", "cafe", "parking", "whiteboard", "power backup", "locker storage"],
    }],
    price: {
        type: Number, // Price per hour/day, depending on your needs
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
