import axios from "axios";

// Cloudinary Upload Hook
export const useCloudinaryUpload = () => {
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jse2zfd4"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "kodenigga"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `${CLOUDINARY_URL}@kodenigga/image/upload`, // Replace with your Cloudinary endpoint
        formData
      );
      console.log(response.data.secure_url)
      return response.data.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw error;
    }
  };

  return { uploadToCloudinary };
};

function calculateEndDateExcludingSundays(startDate, daysToAdd) {
  let date = new Date(startDate); // Start with the given date
  let daysAdded = 0; // Counter for days added, excluding Sundays

  while (daysAdded < daysToAdd) {
      date.setDate(date.getDate() + 1); // Move to the next day
      // Check if it's not Sunday
      if (date.getDay() !== 0) {
          daysAdded++; // Increment the counter only for non-Sundays
      }
  }

  // Format date as yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default calculateEndDateExcludingSundays;


