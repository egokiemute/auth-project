import Tab from '../models/tab.model.js';
import Space from '../models/space.model.js';

export const createTab = async (req, res) => {
    try {
        // Extract data from the request body
        const { space, name, description, capacity, amenities, price, images } = req.body;

        // Check if spaceId is provided
        if (!space) {
            return res.status(400).json({ success: false, message: "spaceId is required" });
        }

        // Create a new Tab with the spaceId assigned to the `space` field
        const newTab = new Tab({
            space, // Ensure spaceId is assigned here
            name,
            description,
            capacity,
            amenities,
            price,
            images
        });

        // Save the Tab
        const savedTab = await newTab.save();

        // Update the associated Space by adding the new Tab's ID to the tabs array
        await Space.findByIdAndUpdate(
            space,
            { $push: { tabs: savedTab._id } },
            { new: true }
        );

        res.status(201).json({ success: true, tab: savedTab });
    } catch (error) {
        console.error("Error in createTab:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
