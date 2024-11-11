import Space from "../models/space.model.js";

// Create a new Space
export const createSpace = async (req, res) => {
    try {
        const space = new Space(req.body);
        const savedSpace = await space.save();
        res.status(201).json({ success: true, space: savedSpace });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};