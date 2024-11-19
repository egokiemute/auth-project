import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    },
    images: [{
        type: String // URLs of images uploaded to cloud storage, e.g., AWS S3 or Cloudinary
    }],
    profilePicture: {
        type: String, // URL of the profile picture
    },
    socialMedia: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedIn: String,
        website: String,
    },
    tabs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tab',
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

const Space = mongoose.model('Space', spaceSchema);

export default Space;
