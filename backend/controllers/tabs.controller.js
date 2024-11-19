import Tab from '../models/tab.model.js';
import Space from '../models/space.model.js';

export const createTab = async (req, res) => {
    try {
        // Extract data from the request body
        const { space, name, description, capacity, amenities, city, state, street, price, images } = req.body;

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
            city,
            state,
            street,
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
        res.status(500).json({ success: false, message: "Server errror" });
    }
};

export const fetchAllTabs = async (req, res) => {
    try {
        console.log("Fetching all tabs...");

        const tabs = await Tab.find().populate('space', 'name location');
        console.log("Tabs fetched:", tabs);

        if (!tabs || tabs.length === 0) {
            console.log("No tabs found.");
            return res.status(404).json({ success: false, message: "No tabs found" });
        }

        res.status(200).json({ success: true, tabs });
    } catch (error) {
        console.error("Error in fetchAllTabs:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getTab = async (req, res) => {
    try {
      const tab = await Tab.findById(req.params.id);
      if (!tab) {
        return res.status(404).json({ success: false, message: "Tab found" });
      }
      res.status(200).json({ success: true, tab });
    } catch (error) {
      next(error);
    }
  };

